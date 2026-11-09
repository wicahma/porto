"use client";

/**
 * Synthesised Lego clicks — no audio assets, a single Web Audio graph.
 *
 * Each voice layers the three parts a mechanical click needs: a 10–20 ms
 * band-passed noise contact around 2–4 kHz (definition/crispness), a short
 * plastic "body" at 150–300 Hz that drops in pitch as it decays (the thock),
 * and a 5–6 kHz tick for bite.
 *
 * One brick voice, moved a little in pitch between four takes (no immediate
 * repeat) plus per-hit band/level jitter, so a sweep sounds like a hand running
 * over a bin of bricks instead of one sample retriggered. Only the pitch moves:
 * the bright contact with a short triangle body is the character that reads as
 * Lego, and darker/deeper takes were dropped on purpose.
 *
 * Browsers keep an AudioContext suspended until a user gesture, and iOS only
 * starts one created inside the gesture. So the context is created *only* by
 * `unlock()`, which runs from real event handlers, and a context that is not
 * running is replaced there rather than resumed: a context born in the handler
 * starts running on every engine. `nudge()` (throttled) is the non-gesture
 * fallback for a context that got suspended later, and `play()` never creates
 * or schedules into a suspended context.
 */

export type LegoClickKind = "lift" | "tap";

export interface LegoClickOptions {
  /** Stereo position, -1 (left) … 1 (right). */
  pan?: number;
  /** Pitch multiplier around the profile; omit for a humanised default. */
  pitch?: number;
  /** Per-voice level multiplier, 0…1. */
  gain?: number;
}

export interface LegoClickAudio {
  /** Create (or replace) the context from a real user gesture. */
  unlock(): void;
  /** Best-effort resume from a non-gesture event; never creates a context. */
  nudge(): void;
  /** Play one click; a no-op while the context is locked or muted. */
  play(kind: LegoClickKind, options?: LegoClickOptions): void;
  /** Snapshot for the dev HUD: context state and voices started. */
  describe(): { state: string; plays: number };
  dispose(): void;
}

interface ClickProfile {
  /** Contact noise: band-pass centre (Hz), Q, level and decay (s). */
  noiseHz: number;
  noiseQ: number;
  noiseGain: number;
  noiseDecay: number;
  /** Plastic body: start/end pitch (Hz), level and decay (s). */
  bodyHz: number;
  bodyEndHz: number;
  bodyGain: number;
  bodyDecay: number;
  /** Crispness tick level (0 disables). */
  tickGain: number;
  /** Overall voice level before the master trim. */
  level: number;
}

/** The brick click: bright contact, quick triangle body. */
const STEP_PROFILE: ClickProfile = {
  noiseHz: 3200,
  noiseQ: 1.1,
  noiseGain: 0.55,
  noiseDecay: 0.016,
  bodyHz: 300,
  bodyEndHz: 205,
  bodyGain: 0.5,
  bodyDecay: 0.06,
  tickGain: 0.22,
  level: 0.5,
};

/**
 * Pitch multipliers for the four step takes. Small moves only: each take keeps
 * the same contact and body shape, so they read as four bricks, not four sounds.
 */
const STEP_PITCHES: readonly number[] = [1, 1.08, 0.92, 1.16];

/** Pointer clicks on the field: louder, lower, longest body. */
const TAP_PROFILE: ClickProfile = {
  noiseHz: 2800,
  noiseQ: 0.9,
  noiseGain: 0.7,
  noiseDecay: 0.022,
  bodyHz: 240,
  bodyEndHz: 120,
  bodyGain: 0.75,
  bodyDecay: 0.13,
  tickGain: 0.3,
  level: 0.6,
};

/** Keep the mix out of the way: this is decoration, not content. */
const MASTER_GAIN = 0.4;
/** Voices per window; beyond this a sweep turns to mush. */
const MAX_VOICES = 8;
/** Sliding window for the voice cap, seconds. */
const VOICE_WINDOW = 0.12;
/** Minimum gap between resume attempts, milliseconds. */
const RESUME_RETRY_MS = 500;
const NOISE_SECONDS = 0.5;

type AudioContextCtor = new (options?: AudioContextOptions) => AudioContext;

function createNoiseBuffer(context: AudioContext): AudioBuffer {
  const length = Math.floor(context.sampleRate * NOISE_SECONDS);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function createLegoClickAudio(): LegoClickAudio {
  let context: AudioContext | null = null;
  let master: GainNode | null = null;
  let noise: AudioBuffer | null = null;
  let windowStart = 0;
  let windowVoices = 0;
  let lastResumeAt = Number.NEGATIVE_INFINITY;
  let notedLock = false;
  let lastPitch = -1;
  let plays = 0;

  const ensureContext = (): AudioContext | null => {
    if (context) return context;

    // Safari still ships only the prefixed constructor, which `Window` does
    // not type: read both off one named view of the global.
    const audioGlobals = window as unknown as {
      AudioContext?: AudioContextCtor;
      webkitAudioContext?: AudioContextCtor;
    };
    const Ctor = audioGlobals.AudioContext ?? audioGlobals.webkitAudioContext;
    if (!Ctor) return null;

    try {
      context = new Ctor({ latencyHint: "interactive" });
    } catch {
      // A transient failure (e.g. too many live contexts after a hot reload)
      // must not disable audio for the rest of the session.
      context = null;
      return null;
    }
    master = context.createGain();
    master.gain.value = MASTER_GAIN;
    master.connect(context.destination);
    noise = createNoiseBuffer(context);
    return context;
  };

  /** Drop the graph; the next gesture builds a fresh, gesture-born context. */
  const resetGraph = () => {
    master?.disconnect();
    master = null;
    noise = null;
    if (context) {
      const stale = context;
      context = null;
      void stale.close().catch(() => undefined);
    }
  };

  /**
   * Nudge a suspended context. Chrome only grants audio after a real gesture
   * (sticky activation), so retrying is what turns the first click anywhere on
   * the page into working hover clicks. Throttled: this is called from every
   * pointer move.
   */
  const nudgeResume = () => {
    if (!context || context.state === "running") return;
    const now = performance.now();
    if (now - lastResumeAt < RESUME_RETRY_MS) return;
    lastResumeAt = now;
    void context.resume();
  };

  const noteLock = () => {
    if (notedLock || process.env.NODE_ENV === "production") return;
    notedLock = true;
    console.info(
      "[lego audio] locked: click anywhere once, then the brick clicks play",
    );
  };

  /** One band-passed noise burst: the plastic-on-plastic contact. */
  const contact = (
    ctx: AudioContext,
    out: AudioNode,
    at: number,
    hz: number,
    q: number,
    gain: number,
    decay: number,
    playbackRate: number,
  ) => {
    const source = ctx.createBufferSource();
    source.buffer = noise;
    source.playbackRate.value = playbackRate;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = hz;
    band.Q.value = q;

    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(gain, at);
    envelope.gain.exponentialRampToValueAtTime(0.0001, at + decay);

    source.connect(band);
    band.connect(envelope);
    envelope.connect(out);
    source.start(
      at,
      Math.random() * (NOISE_SECONDS - 0.06), // random slice = no two hits alike
      decay + 0.02,
    );
  };

  return {
    unlock() {
      // Created inside the gesture, which is the one thing Safari and iOS
      // accept. Never rebuilt here: one click fires pointerdown, pointerup and
      // click, and WebKit caps how many contexts may exist at once.
      const ctx = ensureContext();
      if (!ctx) return;
      if (ctx.state === "running") return;
      void ctx
        .resume()
        .then(() => {
          // A context that refuses to start is reported, not replaced: the
          // replacement would be built outside the gesture and fail too.
          if (ctx.state !== "running") noteLock();
        })
        .catch(() => noteLock());
    },

    nudge() {
      nudgeResume();
    },

    play(kind, options) {
      if (typeof document !== "undefined" && document.hidden) return;
      const ctx = context;
      const sink = master;
      if (!ctx || !sink) return;
      if (ctx.state !== "running") {
        // Locked. Scheduling into a suspended context would fire everything at
        // once when it resumes, so skip this hit and nudge instead.
        nudgeResume();
        noteLock();
        return;
      }
      if (ctx.currentTime - windowStart > VOICE_WINDOW) {
        windowStart = ctx.currentTime;
        windowVoices = 0;
      }
      if (windowVoices >= MAX_VOICES) return;
      windowVoices += 1;
      plays += 1;

      const profile = kind === "tap" ? TAP_PROFILE : STEP_PROFILE;
      // Steps rotate through the four takes, never repeating one back to back,
      // and each hit still gets a little fine pitch drift on top.
      let humanised = 0.94 + Math.random() * 0.12;
      if (kind !== "tap") {
        const count = STEP_PITCHES.length;
        const pick =
          lastPitch < 0
            ? Math.floor(Math.random() * count)
            : (lastPitch + 1 + Math.floor(Math.random() * (count - 1))) %
              count;
        lastPitch = pick;
        humanised = STEP_PITCHES[pick] * (0.97 + Math.random() * 0.06);
      }
      const pitch = Math.min(1.5, Math.max(0.7, options?.pitch ?? humanised));
      const level =
        profile.level * Math.min(1, Math.max(0, options?.gain ?? 1));
      const at = ctx.currentTime + 0.002;

      const out = ctx.createGain();
      out.gain.value = level;
      const pan = Math.min(1, Math.max(-1, options?.pan ?? 0));
      // Safari before 14.1 has no StereoPannerNode: fall back to mono rather
      // than throwing and silencing the voice.
      const panner = ctx.createStereoPanner?.() ?? null;
      if (panner) {
        panner.pan.value = pan;
        out.connect(panner);
        panner.connect(sink);
      } else {
        out.connect(sink);
      }

      const brightness = 0.9 + Math.random() * 0.2;
      contact(
        ctx,
        out,
        at,
        profile.noiseHz * pitch * brightness,
        profile.noiseQ,
        profile.noiseGain,
        profile.noiseDecay,
        pitch,
      );
      // Plastic body: fast downward pitch drop, short decay.
      const body = ctx.createOscillator();
      body.type = "triangle";
      body.frequency.setValueAtTime(profile.bodyHz * pitch, at);
      body.frequency.exponentialRampToValueAtTime(
        Math.max(40, profile.bodyEndHz * pitch),
        at + profile.bodyDecay * 0.7,
      );
      const bodyGain = ctx.createGain();
      bodyGain.gain.setValueAtTime(0.0001, at);
      bodyGain.gain.exponentialRampToValueAtTime(
        profile.bodyGain,
        at + 0.002,
      );
      bodyGain.gain.exponentialRampToValueAtTime(
        0.0001,
        at + profile.bodyDecay,
      );
      body.connect(bodyGain);
      bodyGain.connect(out);

      if (profile.tickGain > 0) {
        const tick = ctx.createOscillator();
        tick.type = "sine";
        tick.frequency.value = 5600 * pitch;
        const tickGain = ctx.createGain();
        tickGain.gain.setValueAtTime(profile.tickGain, at);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.006);
        tick.connect(tickGain);
        tickGain.connect(out);
        tick.start(at);
        tick.stop(at + 0.01);
        tick.onended = () => tickGain.disconnect();
      }

      body.onended = () => {
        bodyGain.disconnect();
        out.disconnect();
        panner?.disconnect();
      };
      body.start(at);
      body.stop(at + profile.bodyDecay + 0.02);
    },

    describe() {
      return { state: context?.state ?? "idle", plays };
    },

    dispose() {
      windowVoices = 0;
      lastPitch = -1;
      resetGraph();
    },
  };
}
