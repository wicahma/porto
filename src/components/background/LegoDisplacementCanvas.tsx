"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createLegoClickAudio, type LegoClickAudio } from "./legoClickAudio";
import { cn } from "@/lib/utils";
import {
  DEFAULT_LEGO_BG_CONFIG,
  LEGO_BRICK,
  LEGO_COLOR_MODES,
  LEGO_PALETTE_SLOTS,
  LEGO_VOXEL_STEPS,
  type LegoBgConfig,
  type LegoColorMode,
} from "@/types/lego-bg";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import * as THREE from "three";

/**
 * Pixels per world unit. The camera is orthographic with `zoom = ORTHO_ZOOM`,
 * which makes one world unit exactly this many CSS pixels at every viewport
 * size: a cell of `brickSizePx / ORTHO_ZOOM` world units always draws
 * `brickSizePx` pixels wide, whatever the container height is.
 */
const ORTHO_ZOOM = 40;

const MAX_RIPPLES = 6;
const RIPPLE_LIFE = 1.6;
const RIPPLE_SPEED_CELLS = 20;
const RIPPLE_BAND_CELLS = 2.7;
const RIPPLE_LIFT_CELLS = 2.7;
const RIPPLE_TILT = 0.35;
const COLOR_EPSILON = 0.004;

/** Fastest click rate for snapped steps; keeps a sweep from buzzing. */
const MIN_SNAP_CLICK_INTERVAL = 0.045;

/** Clicks on chrome (links, buttons, form fields, the HUD) must not ripple. */
const CONTROL_SELECTOR =
  "[data-lego-controls], a, button, input, select, textarea, label";

interface Ndc {
  x: number;
  y: number;
}

interface PointerState extends Ndc {
  active: boolean;
}

interface GridMetrics {
  cols: number;
  rows: number;
  /** World units per cell. */
  cellWorld: number;
  /** `cols * rows`. */
  count: number;
  /** Horizontal shift of the grid inside the canvas, world units. */
  offsetX: number;
}

/** Measured content column: everything the grid needs from the shell. */
interface ContentBox {
  /** Inner width of the column (its padding removed), CSS pixels. */
  widthPx: number;
  /** Its centre relative to the canvas centre, CSS pixels. */
  centerOffsetPx: number;
}

/** Sizes the grid is derived from: the canvas and the content column. */
interface GridLayout {
  /** Canvas size in CSS pixels. */
  widthPx: number;
  heightPx: number;
  /** Content column width; 0 falls back to the canvas width. */
  contentWidthPx: number;
  /** Content column centre relative to the canvas centre, CSS pixels. */
  centerOffsetPx: number;
}

/**
 * The brick field spans the content column exactly (`brickSizePx` is fixed, so
 * the column width snaps to the nearest whole cell) and covers the container
 * height plus one cell of margin per side.
 */
function computeGrid(
  layout: GridLayout,
  brickSizePx: number,
  pixelsPerWorld: number,
): GridMetrics {
  const { widthPx, heightPx, contentWidthPx, centerOffsetPx } = layout;
  if (widthPx <= 0 || heightPx <= 0 || brickSizePx <= 0 || pixelsPerWorld <= 0) {
    return { cols: 0, rows: 0, cellWorld: 0, count: 0, offsetX: 0 };
  }
  const gridWidthPx = contentWidthPx > 0 ? contentWidthPx : widthPx;
  const cols = Math.max(2, Math.round(gridWidthPx / brickSizePx));
  const rows = Math.max(2, Math.ceil(heightPx / brickSizePx) + 2);
  const cellWorld = brickSizePx / pixelsPerWorld;
  return {
    cols,
    rows,
    cellWorld,
    count: cols * rows,
    offsetX: centerOffsetPx / pixelsPerWorld,
  };
}

/** Writes container-relative NDC into `out`; false when the cursor is outside. */
function pointerToNdc(
  out: Ndc,
  rect: DOMRect,
  clientX: number,
  clientY: number,
): boolean {
  if (rect.width === 0 || rect.height === 0) return false;
  const inside =
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom;
  if (!inside) return false;
  out.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  out.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
  return true;
}

interface Point {
  x: number;
  y: number;
}

/**
 * Writes the centre of the brick nearest to a world position into `out` and
 * clamps to the grid, so the hover always sits on a brick instead of between
 * four of them.
 */
function snapToCell(
  out: Point,
  metrics: GridMetrics,
  x: number,
  y: number,
): void {
  const { cols, rows, cellWorld, offsetX } = metrics;
  if (cols <= 0 || rows <= 0 || cellWorld <= 0) {
    out.x = x;
    out.y = y;
    return;
  }
  const col = Math.min(
    cols - 1,
    Math.max(0, Math.round((x - offsetX) / cellWorld + (cols - 1) * 0.5)),
  );
  const row = Math.min(
    rows - 1,
    Math.max(0, Math.round((rows - 1) * 0.5 - y / cellWorld)),
  );
  out.x = offsetX + (col - (cols - 1) * 0.5) * cellWorld;
  out.y = ((rows - 1) * 0.5 - row) * cellWorld;
}

type NumericConfigKey =
  | "brickSizePx"
  | "gapRatio"
  | "hoverRadiusCells"
  | "maxLiftCells"
  | "maxTilt"
  | "smoothing";

const NUMERIC_SLIDERS: ReadonlyArray<{
  key: NumericConfigKey;
  label: string;
  min: number;
  max: number;
  step: number;
  digits: number;
}> = [
  { key: "brickSizePx", label: "brick px", min: 24, max: 80, step: 2, digits: 0 },
  { key: "gapRatio", label: "gap ratio", min: 0.02, max: 0.3, step: 0.01, digits: 2 },
  { key: "hoverRadiusCells", label: "hover radius (cells)", min: 2, max: 16, step: 0.5, digits: 1 },
  { key: "maxLiftCells", label: "lift (cells)", min: 0.5, max: 8, step: 0.5, digits: 1 },
  { key: "maxTilt", label: "max tilt", min: 0, max: 1.2, step: 0.01, digits: 2 },
  { key: "smoothing", label: "smoothing", min: 4, max: 25, step: 1, digits: 0 },
];

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

/**
 * Direction and strength of the *baked* key light. It is baked into vertex
 * colours once per geometry, so the scene needs no light sources at all while
 * the bricks still read as solid (stud tops bright, sides turned away dark).
 */
const BAKE_LIGHT = new THREE.Vector3(0.35, 0.25, 0.9).normalize();
const BAKE_AMBIENT = 0.35;

/** Unlit material: colour comes from vertex tones x per-brick instance colour. */
function createBrickMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true });
}

function bakeNormalTones(geometry: THREE.BufferGeometry): void {
  const normals = geometry.getAttribute("normal");
  const colors = new Float32Array(normals.count * 3);

  for (let i = 0; i < normals.count; i += 1) {
    const lambert = Math.max(
      0,
      normals.getX(i) * BAKE_LIGHT.x +
        normals.getY(i) * BAKE_LIGHT.y +
        normals.getZ(i) * BAKE_LIGHT.z,
    );
    const tone = BAKE_AMBIENT + (1 - BAKE_AMBIENT) * lambert;
    colors[i * 3] = tone;
    colors[i * 3 + 1] = tone;
    colors[i * 3 + 2] = tone;
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function quantize(value: number, steps: number): number {
  return Math.round(value * steps) / steps;
}

/**
 * Resolves the shared brick colour for one brick. Writes into `out` so the
 * per-frame loop allocates nothing.
 */
function resolveBrickColor(
  out: THREE.Color,
  mode: LegoColorMode,
  t: number,
  palette: THREE.Color[],
  base: THREE.Color,
  mosaicSlot: number,
  checker: number,
): void {
  const last = palette.length - 1;

  switch (mode) {
    case "elevation": {
      const pos = t * last;
      const low = Math.floor(pos);
      out.copy(palette[low]);
      out.lerp(palette[Math.min(low + 1, last)], pos - low);
      return;
    }
    case "mosaic":
      out.copy(palette[mosaicSlot]);
      return;
    case "checkerboard":
      out.copy(checker === 1 ? base : palette[0]);
      return;
    default:
      out.copy(base).lerp(palette[0], t);
  }
}

/** Writes one brick's body and stud transforms into both instanced meshes. */
function writeBrick(
  dummy: THREE.Object3D,
  euler: THREE.Euler,
  offset: THREE.Vector3,
  bodyMesh: THREE.InstancedMesh,
  studMesh: THREE.InstancedMesh,
  index: number,
  bx: number,
  by: number,
  lift: number,
  rotX: number,
  rotY: number,
  cell: number,
  plate: number,
): void {
  const bodyHeight = cell * LEGO_BRICK.bodyHeight;
  const studRadius = cell * LEGO_BRICK.studRadius;
  const studHeight = cell * LEGO_BRICK.studHeight;
  const centerZ = lift + bodyHeight / 2;

  dummy.position.set(bx, by, centerZ);
  dummy.rotation.set(rotX, rotY, 0);
  dummy.scale.set(plate, plate, bodyHeight);
  dummy.updateMatrix();
  bodyMesh.setMatrixAt(index, dummy.matrix);

  euler.set(rotX, rotY, 0);
  offset.set(0, 0, bodyHeight / 2 + studHeight / 2).applyEuler(euler);
  dummy.position.set(bx + offset.x, by + offset.y, centerZ + offset.z);
  dummy.scale.set(studRadius, studRadius, studHeight);
  dummy.updateMatrix();
  studMesh.setMatrixAt(index, dummy.matrix);
}

interface WireframeSphereProps {
  config: LegoBgConfig;
  metrics: GridMetrics;
  pointerRef: RefObject<PointerState>;
}

function WireframeSphere({ config, metrics, pointerRef }: WireframeSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const snapped = useMemo<Point>(() => ({ x: 0, y: 0 }), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const pointer = pointerRef.current;
    mesh.visible = config.showWireframeSphere && pointer?.active === true;
    if (!pointer) return;

    const radius = config.hoverRadiusCells * metrics.cellWorld;
    snapToCell(
      snapped,
      metrics,
      pointer.x * state.viewport.width * 0.5,
      pointer.y * state.viewport.height * 0.5,
    );
    mesh.scale.setScalar(radius);
    mesh.position.set(
      snapped.x,
      snapped.y,
      config.maxLiftCells * metrics.cellWorld * 0.35 - radius,
    );
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshBasicMaterial
        wireframe
        transparent
        opacity={0.18}
        depthWrite={false}
      />
    </mesh>
  );
}

interface BricksProps {
  config: LegoBgConfig;
  metrics: GridMetrics;
  pointerRef: RefObject<PointerState>;
  containerRef: RefObject<HTMLDivElement | null>;
  audio: LegoClickAudio;
}

function LegoBricks({
  config,
  metrics,
  pointerRef,
  containerRef,
  audio,
}: BricksProps) {
  const { cols, rows, cellWorld, count, offsetX } = metrics;
  const viewWidth = useThree((state) => state.viewport.width);
  const viewHeight = useThree((state) => state.viewport.height);

  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const studRef = useRef<THREE.InstancedMesh>(null);

  const bodyGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    bakeNormalTones(geometry);
    return geometry;
  }, []);
  const studGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(
      1,
      1,
      1,
      LEGO_BRICK.studSegments,
      1,
    );
    geometry.rotateX(Math.PI / 2);
    bakeNormalTones(geometry);
    return geometry;
  }, []);
  const bodyMaterial = useMemo(() => createBrickMaterial(), []);
  const studMaterial = useMemo(() => createBrickMaterial(), []);

  // Only per-brick simulation state lives here: base positions follow from the
  // grid index every frame, so a cell-size change never resets the sim.
  const buffers = useMemo(
    () => ({
      curLift: new Float32Array(count),
      curRotX: new Float32Array(count),
      curRotY: new Float32Array(count),
      lastR: new Float32Array(count),
      lastG: new Float32Array(count),
      lastB: new Float32Array(count),
    }),
    [count],
  );

  const scratch = useMemo(
    () => ({
      dummy: new THREE.Object3D(),
      euler: new THREE.Euler(),
      offset: new THREE.Vector3(),
      color: new THREE.Color(),
    }),
    [],
  );

  const rippleX = useMemo(() => new Float32Array(MAX_RIPPLES), []);
  const rippleY = useMemo(() => new Float32Array(MAX_RIPPLES), []);
  const rippleStart = useMemo(() => new Float32Array(MAX_RIPPLES), []);
  const rippleActive = useMemo(() => new Uint8Array(MAX_RIPPLES), []);
  const simTime = useRef(0);

  const palette = useMemo(
    () => config.paletteHexColors.map((hex) => new THREE.Color(hex)),
    [config.paletteHexColors],
  );
  const baseColor = useMemo(
    () => new THREE.Color(config.baseHexColor),
    [config.baseHexColor],
  );

  // The hover is snapped to a brick centre, so a click is due exactly when the
  // snapped brick changes (and once more when the cursor leaves the field).
  const snapped = useMemo<Point>(() => ({ x: 0, y: 0 }), []);
  const lastSnap = useRef<Point>({ x: 0, y: 0 });
  const snapActive = useRef(false);
  const lastSnapClickAt = useRef(0);

  const lastClient = useMemo(() => ({ x: 0, y: 0 }), []);
  const ndcScratch = useMemo<Ndc>(() => ({ x: 0, y: 0 }), []);

  useEffect(() => {
    const syncFromLastClient = () => {
      const element = containerRef.current;
      const pointer = pointerRef.current;
      if (!element || !pointer) return;
      pointer.active = pointerToNdc(
        pointer,
        element.getBoundingClientRect(),
        lastClient.x,
        lastClient.y,
      );
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        const pointer = pointerRef.current;
        if (pointer) pointer.active = false;
        return;
      }
      lastClient.x = event.clientX;
      lastClient.y = event.clientY;
      syncFromLastClient();
    };
    const releasePointer = () => {
      const pointer = pointerRef.current;
      if (pointer) pointer.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    // capture:true also catches scroll events from nested scroll containers
    window.addEventListener("scroll", syncFromLastClient, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", syncFromLastClient);
    // pointerleave does not bubble, so it must be bound to the element that
    // receives it when the cursor leaves the viewport.
    document.documentElement.addEventListener("pointerleave", releasePointer);
    window.addEventListener("blur", releasePointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", syncFromLastClient, {
        capture: true,
      });
      window.removeEventListener("resize", syncFromLastClient);
      document.documentElement.removeEventListener(
        "pointerleave",
        releasePointer,
      );
      window.removeEventListener("blur", releasePointer);
    };
  }, [containerRef, lastClient, pointerRef]);

  useEffect(() => {
    const startRipple = (event: MouseEvent) => {
      if (event.button !== 0) return;

      const target = event.target;
      if (target instanceof Element && target.closest(CONTROL_SELECTOR)) return;

      const element = containerRef.current;
      if (!element) return;
      if (
        !pointerToNdc(
          ndcScratch,
          element.getBoundingClientRect(),
          event.clientX,
          event.clientY,
        )
      ) {
        return;
      }

      // Oldest slot wins; spent ripples keep their old start, so they come first.
      let slot = 0;
      for (let s = 1; s < MAX_RIPPLES; s += 1) {
        if (rippleStart[s] < rippleStart[slot]) slot = s;
      }

      rippleX[slot] = ndcScratch.x * viewWidth * 0.5;
      rippleY[slot] = ndcScratch.y * viewHeight * 0.5;
      rippleStart[slot] = simTime.current;
      rippleActive[slot] = 1;
      audio.play("tap", {
        pan: Math.min(0.9, Math.max(-0.9, ndcScratch.x)),
      });
    };

    window.addEventListener("click", startRipple);
    return () => window.removeEventListener("click", startRipple);
  }, [
    audio,
    containerRef,
    ndcScratch,
    rippleActive,
    rippleStart,
    rippleX,
    rippleY,
    viewHeight,
    viewWidth,
  ]);

  useLayoutEffect(() => {
    const bodyMesh = bodyRef.current;
    const studMesh = studRef.current;
    if (!bodyMesh || !studMesh) return;

    const { dummy, euler, offset, color: workColor } = scratch;
    const cell = cellWorld;
    const plate = cell * (1 - config.gapRatio);

    for (let i = 0; i < count; i += 1) {
      const row = (i / cols) | 0;
      const col = i - row * cols;
      const bx = offsetX + (col - (cols - 1) * 0.5) * cell;
      const by = ((rows - 1) * 0.5 - row) * cell;

      writeBrick(
        dummy,
        euler,
        offset,
        bodyMesh,
        studMesh,
        i,
        bx,
        by,
        buffers.curLift[i],
        buffers.curRotX[i],
        buffers.curRotY[i],
        cell,
        plate,
      );

      resolveBrickColor(
        workColor,
        config.colorMode,
        config.maxLiftCells > 0
          ? Math.min(buffers.curLift[i] / (config.maxLiftCells * cell), 1)
          : 0,
        palette,
        baseColor,
        (row * 31 + col * 17) % LEGO_PALETTE_SLOTS,
        (row + col) % 2 === 0 ? 1 : 0,
      );
      workColor.multiplyScalar(
        BAKE_AMBIENT +
          (1 - BAKE_AMBIENT) *
            Math.cos(buffers.curRotX[i]) *
            Math.cos(buffers.curRotY[i]),
      );
      buffers.lastR[i] = workColor.r;
      buffers.lastG[i] = workColor.g;
      buffers.lastB[i] = workColor.b;
      bodyMesh.setColorAt(i, workColor);
      studMesh.setColorAt(i, workColor);
    }

    bodyMesh.instanceMatrix.needsUpdate = true;
    studMesh.instanceMatrix.needsUpdate = true;
    if (bodyMesh.instanceColor) bodyMesh.instanceColor.needsUpdate = true;
    if (studMesh.instanceColor) studMesh.instanceColor.needsUpdate = true;
  }, [buffers, baseColor, config.colorMode, config.gapRatio, config.maxLiftCells, metrics, palette, scratch]);

  useFrame((state, delta) => {
    const bodyMesh = bodyRef.current;
    const studMesh = studRef.current;
    if (!bodyMesh || !studMesh) return;

    const dt = Math.min(delta, 0.05);
    simTime.current += dt;
    const now = simTime.current;

    const { dummy, euler, offset, color: workColor } = scratch;
    const { curLift, curRotX, curRotY, lastR, lastG, lastB } = buffers;

    const cell = cellWorld;
    const hoverRadius = config.hoverRadiusCells * cell;
    const maxLift = config.maxLiftCells * cell;
    const plate = cell * (1 - config.gapRatio);
    const rippleSpeed = RIPPLE_SPEED_CELLS * cell;
    const rippleBand = RIPPLE_BAND_CELLS * cell;
    const rippleLift = RIPPLE_LIFT_CELLS * cell;

    const halfWidth = state.viewport.width * 0.5;
    const halfHeight = state.viewport.height * 0.5;

    let hasPointer = false;
    let pointerX = 0;
    let pointerY = 0;
    const pointer = pointerRef.current;
    if (pointer?.active) {
      const rawX = pointer.x * halfWidth;
      const rawY = pointer.y * halfHeight;
      // Outside the brick field (the gutters beside the content column) nothing
      // lifts, so hovering a gutter must not drag the edge column up.
      if (
        Math.abs(rawX - offsetX) <= cols * cell * 0.5 &&
        Math.abs(rawY) <= rows * cell * 0.5
      ) {
        snapToCell(snapped, metrics, rawX, rawY);
        pointerX = snapped.x;
        pointerY = snapped.y;
        hasPointer = true;
      }
    }

    const previousSnap = lastSnap.current;
    const wasSnapped = snapActive.current;
    snapActive.current = hasPointer;
    if (hasPointer) {
      const moved =
        !wasSnapped ||
        previousSnap.x !== pointerX ||
        previousSnap.y !== pointerY;
      if (moved) {
        previousSnap.x = pointerX;
        previousSnap.y = pointerY;
        // First brick is always audible; steps are rate-limited so a fast
        // sweep reads as a zip rather than a buzz.
        if (!wasSnapped || now - lastSnapClickAt.current > MIN_SNAP_CLICK_INTERVAL) {
          lastSnapClickAt.current = now;
          audio.play("lift", {
            pan: Math.min(0.9, Math.max(-0.9, pointerX / halfWidth)),
          });
        }
      }
    }

    for (let slot = 0; slot < MAX_RIPPLES; slot += 1) {
      if (rippleActive[slot] === 1 && now - rippleStart[slot] > RIPPLE_LIFE) {
        rippleActive[slot] = 0;
      }
    }

    const maxTilt = config.maxTilt;
    const smoothing = 1 - Math.exp(-config.smoothing * dt);
    const voxel = config.voxelStepMode;
    const steps = LEGO_VOXEL_STEPS;
    const mode = config.colorMode;
    const liftToColor = maxLift > 0 ? 1 / maxLift : 0;
    let colorDirty = false;

    for (let i = 0; i < count; i += 1) {
      const row = (i / cols) | 0;
      const col = i - row * cols;
      const bx = offsetX + (col - (cols - 1) * 0.5) * cell;
      const by = ((rows - 1) * 0.5 - row) * cell;

      let targetLift = 0;
      let targetRX = 0;
      let targetRY = 0;

      if (hasPointer) {
        const dx = bx - pointerX;
        const dy = by - pointerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hoverRadius) {
          const u = dist / hoverRadius;
          const q = 1 - u * u;
          targetLift = Math.sqrt(q) * q * maxLift;

          const nx = dist > 1e-5 ? dx / dist : 0;
          const ny = dist > 1e-5 ? dy / dist : 0;
          const tilt = Math.sin(u * Math.PI) * maxTilt;
          targetRX = -ny * tilt;
          targetRY = nx * tilt;
        }
      }

      for (let slot = 0; slot < MAX_RIPPLES; slot += 1) {
        if (rippleActive[slot] === 0) continue;

        const age = now - rippleStart[slot];
        if (age <= 0 || age > RIPPLE_LIFE) continue;

        const rdx = bx - rippleX[slot];
        const rdy = by - rippleY[slot];
        const rd = Math.sqrt(rdx * rdx + rdy * rdy);
        const bandDist = Math.abs(rd - age * rippleSpeed);
        if (bandDist >= rippleBand) continue;

        const w = 1 - bandDist / rippleBand;
        const e = 1 - age / RIPPLE_LIFE;
        const falloff = w * e * e;
        const nx = rd > 1e-5 ? rdx / rd : 0;
        const ny = rd > 1e-5 ? rdy / rd : 0;

        targetLift += falloff * rippleLift;
        targetRX += -ny * falloff * RIPPLE_TILT;
        targetRY += nx * falloff * RIPPLE_TILT;
      }

      curLift[i] += (targetLift - curLift[i]) * smoothing;
      curRotX[i] += (targetRX - curRotX[i]) * smoothing;
      curRotY[i] += (targetRY - curRotY[i]) * smoothing;

      const lift = voxel
        ? (Math.round((curLift[i] / cell) * steps) / steps) * cell
        : curLift[i];
      const rotX = voxel ? quantize(curRotX[i], steps) : curRotX[i];
      const rotY = voxel ? quantize(curRotY[i], steps) : curRotY[i];

      writeBrick(
        dummy,
        euler,
        offset,
        bodyMesh,
        studMesh,
        i,
        bx,
        by,
        lift,
        rotX,
        rotY,
        cell,
        plate,
      );

      const t = Math.min(Math.max(curLift[i] * liftToColor, 0), 1);
      resolveBrickColor(
        workColor,
        mode,
        t,
        palette,
        baseColor,
        (row * 31 + col * 17) % LEGO_PALETTE_SLOTS,
        (row + col) % 2 === 0 ? 1 : 0,
      );
      // With no scene lights, fold the brick's own tilt into its tone so tilted
      // faces darken instead of reading as flat.
      workColor.multiplyScalar(
        BAKE_AMBIENT + (1 - BAKE_AMBIENT) * Math.cos(rotX) * Math.cos(rotY),
      );

      if (
        Math.abs(workColor.r - lastR[i]) +
          Math.abs(workColor.g - lastG[i]) +
          Math.abs(workColor.b - lastB[i]) >
        COLOR_EPSILON
      ) {
        lastR[i] = workColor.r;
        lastG[i] = workColor.g;
        lastB[i] = workColor.b;
        bodyMesh.setColorAt(i, workColor);
        studMesh.setColorAt(i, workColor);
        colorDirty = true;
      }
    }

    bodyMesh.instanceMatrix.needsUpdate = true;
    studMesh.instanceMatrix.needsUpdate = true;
    if (colorDirty) {
      if (bodyMesh.instanceColor) bodyMesh.instanceColor.needsUpdate = true;
      if (studMesh.instanceColor) studMesh.instanceColor.needsUpdate = true;
    }
  });

  useEffect(
    () => () => {
      bodyGeometry.dispose();
      studGeometry.dispose();
      bodyMaterial.dispose();
      studMaterial.dispose();
    },
    [bodyGeometry, studGeometry, bodyMaterial, studMaterial],
  );

  return (
    <>
      <instancedMesh
        ref={bodyRef}
        args={[bodyGeometry, bodyMaterial, count]}
        frustumCulled={false}
      />
      <instancedMesh
        ref={studRef}
        args={[studGeometry, studMaterial, count]}
        frustumCulled={false}
      />
    </>
  );
}

interface SceneProps {
  config: LegoBgConfig;
  containerRef: RefObject<HTMLDivElement | null>;
  content: ContentBox;
  audio: LegoClickAudio;
  onMetrics: (metrics: GridMetrics | null) => void;
}

function LegoScene({
  config,
  containerRef,
  content,
  audio,
  onMetrics,
}: SceneProps) {
  // Subscribe to primitives only: a page scroll re-measures the container, and
  // an object selector would re-render the scene on every measurement.
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const metrics = useMemo(
    () =>
      computeGrid(
        {
          widthPx: width,
          heightPx: height,
          contentWidthPx: content.widthPx,
          centerOffsetPx: content.centerOffsetPx,
        },
        config.brickSizePx,
        ORTHO_ZOOM,
      ),
    [height, width, config.brickSizePx, content.widthPx, content.centerOffsetPx],
  );
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });

  useEffect(() => {
    onMetrics(metrics.count > 0 ? metrics : null);
  }, [metrics, onMetrics]);

  return (
    <>
      <color attach="background" args={[config.backgroundHexColor]} />
      {metrics.count > 0 ? (
        <>
          <LegoBricks
            key={`${metrics.cols}x${metrics.rows}`}
            config={config}
            metrics={metrics}
            pointerRef={pointerRef}
            containerRef={containerRef}
            audio={audio}
          />
          <WireframeSphere
            config={config}
            metrics={metrics}
            pointerRef={pointerRef}
          />
        </>
      ) : null}
    </>
  );
}

interface HudProps {
  config: LegoBgConfig;
  onChange: (patch: Partial<LegoBgConfig>) => void;
  metrics: GridMetrics | null;
  audio: LegoClickAudio;
}

function HexField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const commit = () => {
    if (HEX_PATTERN.test(draft)) onChange(draft.toLowerCase());
    else setDraft(value);
  };

  return (
    <label className="flex items-center justify-between gap-2">
      <span className="text-[10px] uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <span className="flex items-center gap-1">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-5 w-5 cursor-pointer rounded-sm border border-[var(--line)] bg-transparent p-0"
        />
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
            else if (event.key === "Escape") {
              setDraft(value);
              event.currentTarget.blur();
            }
          }}
          spellCheck={false}
          className="w-[74px] rounded-sm border border-[var(--line)] bg-black/40 px-1 py-0.5 font-mono text-[10px] uppercase text-neutral-300 outline-none focus:border-[var(--signal)]"
        />
      </span>
    </label>
  );
}

function LegoHud({ config, onChange, metrics, audio }: HudProps) {
  const [open, setOpen] = useState(true);
  // Audio state is the one thing that cannot be inferred from the frame: show
  // whether the context is actually running, so a silent field is diagnosable.
  const [audioState, setAudioState] = useState(() => audio.describe());
  const [copyLabel, setCopyLabel] = useState("Copy Config JSON");
  const copyTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => setAudioState(audio.describe()), 500);
    return () => window.clearInterval(id);
  }, [audio]);

  const copyConfig = async () => {
    let label = "Copied";
    try {
      await navigator.clipboard.writeText(
        `const DEFAULT_LEGO_BG_CONFIG: LegoBgConfig = ${JSON.stringify(config, null, 2)};`,
      );
    } catch {
      label = "Copy failed";
    }
    setCopyLabel(label);
    if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(
      () => setCopyLabel("Copy Config JSON"),
      1500,
    );
  };

  const setNumber = (key: NumericConfigKey, value: number) => {
    // Computed key over a union of numeric fields; the value is always a number.
    onChange({ [key]: value } as Partial<LegoBgConfig>);
  };

  return (
    <div
      data-lego-controls
      className="fixed right-4 top-4 z-50 pointer-events-auto max-h-[calc(100dvh-2rem)] w-[300px] overflow-y-auto rounded-xl border border-[var(--line-strong)] bg-[var(--ink-900)]/95 p-3 font-mono text-[11px] text-neutral-300 shadow-2xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
          Lego Bg
        </span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="rounded-sm border border-[var(--line-strong)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-400 hover:text-neutral-100"
        >
          {open ? "hide" : "show"}
        </button>
      </div>

      {open ? (
        <div className="mt-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2 rounded-sm border border-[var(--line)] bg-black/40 px-2 py-1 text-[10px] tabular-nums text-neutral-400">
            <span>audio</span>
            <span
              className={
                audioState.state === "running"
                  ? "text-[var(--signal)]"
                  : "text-neutral-300"
              }
            >
              {audioState.state} · {audioState.plays} clicks
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-sm border border-[var(--line)] bg-black/40 px-2 py-1 text-[10px] tabular-nums text-neutral-400">
            <span>grid</span>
            <span className="text-neutral-300">
              {metrics
                ? `${metrics.cols} × ${metrics.rows} (${metrics.count} bricks)`
                : "—"}
            </span>
          </div>

          {NUMERIC_SLIDERS.map((slider) => (
            <label key={slider.key} className="flex flex-col gap-1">
              <span className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-500">
                <span>{slider.label}</span>
                <span className="tabular-nums text-neutral-300">
                  {config[slider.key].toFixed(slider.digits)}
                </span>
              </span>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={config[slider.key]}
                onChange={(event) =>
                  setNumber(slider.key, Number(event.target.value))
                }
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[var(--line)] accent-[var(--signal)]"
              />
            </label>
          ))}

          <div className="rule mt-1" />

          <button
            type="button"
            role="switch"
            aria-checked={config.voxelStepMode}
            onClick={() => onChange({ voxelStepMode: !config.voxelStepMode })}
            className={cn(
              "flex items-center justify-between rounded-sm border px-2 py-1 text-[10px] uppercase tracking-wider",
              config.voxelStepMode
                ? "border-[var(--signal)]/40 bg-[var(--signal)]/15 text-[var(--signal)]"
                : "border-[var(--line)] text-neutral-400",
            )}
          >
            <span>voxel steps</span>
            <span>{config.voxelStepMode ? "on" : "off"}</span>
          </button>

          <button
            type="button"
            role="switch"
            aria-checked={config.showWireframeSphere}
            onClick={() =>
              onChange({ showWireframeSphere: !config.showWireframeSphere })
            }
            className={cn(
              "flex items-center justify-between rounded-sm border px-2 py-1 text-[10px] uppercase tracking-wider",
              config.showWireframeSphere
                ? "border-[var(--signal)]/40 bg-[var(--signal)]/15 text-[var(--signal)]"
                : "border-[var(--line)] text-neutral-400",
            )}
          >
            <span>wire sphere</span>
            <span>{config.showWireframeSphere ? "on" : "off"}</span>
          </button>

          <div className="rule" />

          <HexField
            label="base"
            value={config.baseHexColor}
            onChange={(hex) => onChange({ baseHexColor: hex })}
          />
          <HexField
            label="background"
            value={config.backgroundHexColor}
            onChange={(hex) => onChange({ backgroundHexColor: hex })}
          />
          {config.paletteHexColors.map((hex, index) => (
            <HexField
              key={index}
              label={`palette ${index + 1}`}
              value={hex}
              onChange={(next) =>
                onChange({
                  paletteHexColors: config.paletteHexColors.map((current, i) =>
                    i === index ? next : current,
                  ),
                  // The base tone follows palette slot 1.
                  ...(index === 0 ? { baseHexColor: next } : null),
                })
              }
            />
          ))}

          <label className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500">
              color mode
            </span>
            <select
              value={config.colorMode}
              onChange={(event) =>
                onChange({ colorMode: event.target.value as LegoColorMode })
              }
              className="rounded-sm border border-[var(--line)] bg-black/40 px-1 py-0.5 font-mono text-[10px] text-neutral-200 outline-none focus:border-[var(--signal)]"
            >
              {LEGO_COLOR_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={copyConfig}
            className="mt-1 rounded-sm border border-[var(--line-strong)] px-2 py-1 text-[10px] uppercase tracking-wider text-neutral-300 hover:text-neutral-100"
          >
            {copyLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Stable identities: a new object per render would rebuild the R3F camera. */
const CAMERA_PROPS = {
  position: [0, 0, 20] as [number, number, number],
  zoom: ORTHO_ZOOM,
  near: 0.1,
  far: 100,
};
const GL_PROPS = {
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
} as const;
const DPR_RANGE: [number, number] = [1, 1.25];

/** Real gestures: only these may create the audio context. */
const AUDIO_GESTURE_EVENTS = [
  "pointerdown",
  "pointerup",
  "click",
  "keydown",
  "wheel",
  "touchstart",
] as const;

const NO_CONTENT: ContentBox = { widthPx: 0, centerOffsetPx: 0 };

export default function LegoDisplacementCanvas({
  showControls,
  contentRef,
}: {
  showControls: boolean;
  /** The shell's content column: the brick field spans its inner width. */
  contentRef?: RefObject<HTMLDivElement | null>;
}) {
  const [config, setConfig] = useState<LegoBgConfig>(DEFAULT_LEGO_BG_CONFIG);
  const [metrics, setMetrics] = useState<GridMetrics | null>(null);
  const [pageVisible, setPageVisible] = useState(true);
  const [content, setContent] = useState<ContentBox>(NO_CONTENT);
  const containerRef = useRef<HTMLDivElement>(null);
  const audio = useMemo(() => createLegoClickAudio(), []);

  useEffect(() => () => audio.dispose(), [audio]);

  // Audio stays locked until the page has had a real gesture, so the context is
  // created from those events only (never from a pointer move, and never with
  // `once`: every attempt must stay available). Hovering only nudges an existing
  // context, which is all that is left once the first click has happened.
  useEffect(() => {
    const unlock = () => audio.unlock();
    const nudge = () => audio.nudge();
    for (const type of AUDIO_GESTURE_EVENTS) {
      window.addEventListener(type, unlock, { passive: true });
    }
    window.addEventListener("pointermove", nudge, { passive: true });
    const onVisibility = () => {
      if (!document.hidden) audio.nudge();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      for (const type of AUDIO_GESTURE_EVENTS) {
        window.removeEventListener(type, unlock);
      }
      window.removeEventListener("pointermove", nudge);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [audio]);

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () =>
      document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  const updateConfig = useCallback((patch: Partial<LegoBgConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  // The canvas spans the whole page, but the bricks must span the content
  // column. Measure it with its padding removed, plus its centre offset against
  // the canvas (the column is auto-centred, so the offset is only non-zero when
  // a scrollbar makes the shell wider than the viewport).
  useEffect(() => {
    const measure = () => {
      const frame = containerRef.current?.getBoundingClientRect();
      const content = contentRef?.current;
      if (!frame || !content) return;
      const rect = content.getBoundingClientRect();
      const style = window.getComputedStyle(content);
      const padLeft = Number.parseFloat(style.paddingLeft) || 0;
      const padRight = Number.parseFloat(style.paddingRight) || 0;
      const widthPx = Math.max(0, content.clientWidth - padLeft - padRight);
      const centerOffsetPx =
        rect.left + padLeft + widthPx * 0.5 - (frame.left + frame.width * 0.5);
      setContent((prev) =>
        prev.widthPx === widthPx && prev.centerOffsetPx === centerOffsetPx
          ? prev
          : { widthPx, centerOffsetPx },
      );
    };

    measure();
    // Both elements resize with the viewport, so one observer covers both.
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (contentRef?.current) observer.observe(contentRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [contentRef]);

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full overflow-hidden"
        aria-hidden="true"
      >
        <Canvas
          fallback={null}
          orthographic
          // `flat` pins toneMapping to NoToneMapping: the bricks are unlit and
          // every colour comes from the config palette, so the renderer must
          // not bend them (ACES crushes the dark end to ~1/3 its sRGB value).
          flat
          dpr={DPR_RANGE}
          gl={GL_PROPS}
          camera={CAMERA_PROPS}
          frameloop={pageVisible ? "always" : "never"}
        >
          <LegoScene
            config={config}
            containerRef={containerRef}
            content={content}
            audio={audio}
            onMetrics={setMetrics}
          />
        </Canvas>
      </div>
      {showControls ? (
        <LegoHud
          config={config}
          onChange={updateConfig}
          metrics={metrics}
          audio={audio}
        />
      ) : null}
    </>
  );
}
