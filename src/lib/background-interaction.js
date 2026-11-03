/**
 * Background Interaction State Manager
 * Coordinates cursor movement, click ripples, and element hover states
 * with the GenerativeJourneyCanvas without causing React component re-renders.
 */

export const backgroundInteractionState = {
  // Cursor pointer coordinates (viewport space)
  pointer: {
    x: -1000,
    y: -1000,
    active: false,
    speed: 0,
  },

  // Click ripples
  ripples: [],

  // Active UI hover target (e.g. project card, CTA button, nav link)
  hoverTarget: {
    active: false,
    id: null,
    color: [99, 102, 241],
    intensity: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};

/**
 * Trigger an element hover response in the background
 * @param {string} id - Identifier of the element
 * @param {number[]} color - RGB array e.g. [168, 85, 247]
 * @param {DOMRect} rect - Bounding rectangle of the hovered element
 */
export function triggerBackgroundHover(id, color, rect) {
  if (typeof window === 'undefined') return;

  backgroundInteractionState.hoverTarget.active = true;
  backgroundInteractionState.hoverTarget.id = id;
  if (color) {
    backgroundInteractionState.hoverTarget.color = color;
  }
  if (rect) {
    backgroundInteractionState.hoverTarget.x = rect.left + rect.width / 2;
    backgroundInteractionState.hoverTarget.y = rect.top + rect.height / 2;
    backgroundInteractionState.hoverTarget.width = rect.width;
    backgroundInteractionState.hoverTarget.height = rect.height;
  }
}

/**
 * Clear the active background hover target
 */
export function clearBackgroundHover() {
  if (typeof window === 'undefined') return;
  backgroundInteractionState.hoverTarget.active = false;
  backgroundInteractionState.hoverTarget.id = null;
}

/**
 * Trigger a small click ripple on the background
 * @param {number} x - Client X coordinate
 * @param {number} y - Client Y coordinate
 */
export function triggerBackgroundRipple(x, y) {
  if (typeof window === 'undefined') return;

  // Limit to 3 concurrent ripples to prevent visual clutter
  if (backgroundInteractionState.ripples.length >= 3) {
    backgroundInteractionState.ripples.shift();
  }

  backgroundInteractionState.ripples.push({
    id: Date.now() + Math.random(),
    x,
    y,
    radius: 4,
    maxRadius: 180,
    alpha: 0.65,
    speed: 3.5,
  });
}
