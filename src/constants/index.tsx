export const DEFAULT_HORIZONTAL_BLOCKS = 4;
export const DEFAULT_VERTICAL_BLOCKS = 4;
export const DEFAULT_BLOCK_WIDTH = 3;
export const DEFAULT_BLOCK_HEIGHT = 3;
export const BLOCK_COLORS = ['#def4f0', '#74d4c0', '#d9455f', '#9a1f40'];
export const BLOCK_BORDER_COLOR = '#74d8c2';
export const ItemTypes = {
  ELEMENT: 'element',
};
export const ELEMENTS = [
  [
    // long z
    { x: -2, y: -1, val: 1 },
    { x: -1, y: -1, val: 1 },
    { x: 0, y: -1, val: 1 },
    { x: 0, y: 0, val: 1 },
    { x: 0, y: 1, val: 1 },
    { x: 1, y: 1, val: 1 },
    { x: 2, y: 1, val: 1 },
  ],
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
