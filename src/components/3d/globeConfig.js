// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLOBE CONFIG — Single source of truth for Earth size.
//
// Change GLOBE_RADIUS to resize the entire globe.
// All layers (atmosphere, clouds, arcs, labels, rings)
// derive their dimensions from this value.
//
// Examples:
//   GLOBE_RADIUS = 2    → default size
//   GLOBE_RADIUS = 2.5  → 25% larger
//   GLOBE_RADIUS = 1.5  → 25% smaller
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const GLOBE_RADIUS = 2

// Derived sizes — do not edit these directly, change GLOBE_RADIUS instead
export const CLOUD_RADIUS = GLOBE_RADIUS * 1.075       // 2.15 at default
export const ATMOSPHERE_RADIUS = GLOBE_RADIUS * 1.08    // 2.16 at default — very tight rim, not a shell
export const ARC_SURFACE = GLOBE_RADIUS * 1.3           // 2.6 at default
export const ARC_PEAK = GLOBE_RADIUS * 1.9              // 3.8 at default
export const LABEL_SCALE = GLOBE_RADIUS / 2             // 1.0 at default (multiplier for label positions)
export const RING_INNER = GLOBE_RADIUS * 2.1            // 4.2 at default
export const RING_OUTER = GLOBE_RADIUS * 2.4            // 4.8 at default
