/**
 * Contract for the Lego voxel-displacement background. The HUD, the canvas and
 * the "copy config" button all read this shape, so tuning happens here and the
 * copied object can be pasted back into `DEFAULT_LEGO_BG_CONFIG` verbatim.
 *
 * Every length is expressed in cells (or in CSS pixels for the cell itself):
 * the grid is derived from the container size at runtime, so the brick field
 * keeps a fixed on-screen density whatever the page height.
 */

export type LegoColorMode = "elevation" | "mosaic" | "checkerboard" | "solid";

export interface LegoBgConfig {
  /** On-screen cell size in CSS pixels. */
  brickSizePx: number;
  /** Gap between bricks as a share of one cell. */
  gapRatio: number;
  /** Hover sphere radius in cells. */
  hoverRadiusCells: number;
  /** Peak lift in cells. */
  maxLiftCells: number;
  /** Peak tilt in radians. */
  maxTilt: number;
  smoothing: number;
  voxelStepMode: boolean;
  showWireframeSphere: boolean;
  /** Base tone for the checkerboard/solid modes; follows palette slot 1. */
  baseHexColor: string;
  backgroundHexColor: string;
  paletteHexColors: string[];
  colorMode: LegoColorMode;
}

export const LEGO_PALETTE_SLOTS = 5;

export const LEGO_COLOR_MODES: readonly LegoColorMode[] = [
  "elevation",
  "mosaic",
  "checkerboard",
  "solid",
];

export const DEFAULT_LEGO_BG_CONFIG: LegoBgConfig = {
  brickSizePx: 30,
  gapRatio: 0.08,
  hoverRadiusCells: 2.5,
  maxLiftCells: 3,
  maxTilt: 0.8,
  smoothing: 9,
  voxelStepMode: false,
  showWireframeSphere: false,
  baseHexColor: "#1c1c1c",
  /** Matches `.dark { --background }` so the field sits on the page surface. */
  backgroundHexColor: "#131313",
  paletteHexColors: ["#1c1c1c", "#292929", "#313131", "#3c3c3c", "#515151"],
  colorMode: "elevation",
};

/** Brick proportions per cell; multiplied by the runtime cell size when drawing. */
export const LEGO_BRICK = {
  bodyHeight: 0.45,
  studRadius: 0.17,
  studHeight: 0.16,
  studSegments: 12,
} as const;

/** Quantisation steps per cell used by `voxelStepMode`. */
export const LEGO_VOXEL_STEPS = 4;
