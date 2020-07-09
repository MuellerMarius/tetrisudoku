// Game
export const HORIZONTAL_BLOCKS = 3;
export const VERTICAL_BLOCKS = 3;
export const BLOCK_WIDTH = 3;
export const BLOCK_HEIGHT = 3;
export const DRAG_ELEMENTS_COUNT = 3;

// Colors
export const BOARD_BG_COLOR = '#D9DCE2';
export const BLOCK_COLORS = ['#FEFEFE', '#84A9AC', '#3B6978', '#204051'];
export const BLOCK_BORDER_COLOR = '#74D8C2';
export const BLOCK_HOVER_COLOR_DROPPABLE = '#CAE8D5';
export const BLOCK_HOVER_COLOR_NOT_DROPPABLE = 'rgba(209, 46, 46, 0.4)';

// Elements
export const TYPE_ELEMENT = 'ELEMENT';
export const ELEMENTS = [
  [
    // z
    { x: -1, y: -1, val: 1 },
    { x: 0, y: -1, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 0, y: 1, val: 1 },
    { x: 1, y: 1, val: 1 },
  ],
  [
    // z invers
    { x: -1, y: 1, val: 1 },
    { x: 0, y: 1, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 0, y: -1, val: 1 },
    { x: 1, y: -1, val: 1 },
  ],
  [
    // block
    { x: 0, y: 0, val: 2 },
    { x: 0, y: 1, val: 2 },
    { x: 1, y: 0, val: 2 },
    { x: 1, y: 1, val: 2 },
  ],
  [
    // L
    { x: 0, y: -1, val: 2 },
    { x: 0, y: 0, val: 2 },
    { x: 0, y: 1, val: 2 },
    { x: 1, y: 1, val: 2 },
  ],
  [
    // L invers
    { x: 1, y: -1, val: 2 },
    { x: 0, y: -1, val: 2 },
    { x: 0, y: 0, val: 2 },
    { x: 0, y: 1, val: 2 },
  ],
  [
    // I
    { x: 0, y: -1, val: 3 },
    { x: 0, y: 0, val: 3 },
    { x: 0, y: 1, val: 3 },
    { x: 0, y: 2, val: 3 },
  ],
  [
    // _
    { x: -1, y: 0, val: 3 },
    { x: 0, y: 0, val: 3 },
    { x: 1, y: 0, val: 3 },
    { x: 2, y: 0, val: 3 },
  ],
  [
    // lying L
    { x: -1, y: 1, val: 3 },
    { x: -1, y: 0, val: 3 },
    { x: 0, y: 0, val: 3 },
    { x: 1, y: 0, val: 3 },
  ],
  [
    // lying L invers
    { x: -1, y: 0, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 1, y: 0, val: 1 },
    { x: 1, y: 1, val: 1 },
  ],
  [
    // T
    { x: -1, y: 0, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 1, y: 0, val: 1 },
    { x: 0, y: -1, val: 1 },
  ],
  [
    // T invers
    { x: -1, y: 0, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 1, y: 0, val: 1 },
    { x: 0, y: 1, val: 1 },
  ],
  [
    // T rotated 90°
    { x: -1, y: 0, val: 1 },
    { x: 0, y: 1, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 0, y: -1, val: 1 },
  ],
  [
    // T rotated 270°
    { x: 1, y: 0, val: 1 },
    { x: 0, y: 1, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 0, y: -1, val: 1 },
  ],
  [
    // simple block
    { x: 0, y: 0, val: 1 },
  ],
  [
    // small I
    { x: 0, y: 0, val: 1 },
    { x: 0, y: 1, val: 1 },
  ],
  [
    // small -
    { x: 0, y: 0, val: 1 },
    { x: 1, y: 0, val: 1 },
  ],
];
