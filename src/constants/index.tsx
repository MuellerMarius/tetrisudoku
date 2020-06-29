export const DEFAULT_HORIZONTAL_BLOCKS = 3;
export const DEFAULT_VERTICAL_BLOCKS = 3;
export const DEFAULT_BLOCK_WIDTH = 3;
export const DEFAULT_BLOCK_HEIGHT = 3;
export const PREV_ELEMENT_BLOCK_SIZE = {
  small: 35,
  medium: 45,
  large: 50,
  xlarge: 60,
};
export const BOARD_BG_COLOR = '#D9DCE2';
export const BLOCK_COLORS = ['#fefefe', '#84a9ac', '#3b6978', '#204051'];
export const BLOCK_BORDER_COLOR = '#74d8c2';
export const BLOCK_HOVER_COLOR_DROPPABLE = '#cae8d5';
export const BLOCK_HOVER_COLOR_NOT_DROPPABLE = 'rgba(209, 46, 46,0.4)';
export const TYPE_ELEMENT = 'element';
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
export const SAMPLE_ELEMENT = [
  { x: -2, y: -1, val: 1 },
  { x: -1, y: -1, val: 1 },
  { x: 0, y: -1, val: 1 },
  { x: 0, y: 0, val: 1 },
  { x: 0, y: 1, val: 1 },
  { x: 1, y: 1, val: 1 },
  { x: 2, y: 1, val: 1 },
];
