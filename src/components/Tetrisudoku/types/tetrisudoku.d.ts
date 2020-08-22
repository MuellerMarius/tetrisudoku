type StateObject = {
  board: number[][];
  draggableElements: ElemCoord[][];
  score: number;
};

type ActionObject = {
  type: string;
  payload?: Partial<StateObject> & { droppedElementIndex?: number };
};

type ElemCoord = {
  x: number;
  y: number;
  val: number;
};

type dragItem = {
  type: string;
  index: number;
};

type MinMax = {
  x: number;
  y: number;
};

type FiredScoreAnimation = {
  addScore: number;
  xBlock: number;
  yBlock: number;
};

//
// Props
//

type GameContextProps = StateObject & {
  firedScoreAnimation?: FiredScoreAnimation;
  dropElement: (x: number, y: number, index: number) => void;
  clearDraggableElements: () => void;
  canElementBeDropped: (x: number, y: number, index: number) => boolean;
  resetGame: () => void;
};

type WrapperProps = {
  width: number;
  height?: number;
};

type BoardProps = {
  children: ReactNode[];
};

type SidebarProps = {
  setHover: (x: number, y: number, index: number) => void;
};

type DraggableElementProps = {
  index: number;
  element: ElemCoord[];
  setHover: (x: number, y: number, index: number) => void;
};

type ScoreAnimationProps = {
  score: number;
  onAnimationEnd: () => void;
};

type BoardTileProps = {
  x: number;
  y: number;
  hover: number;
  onHover: (x: number, y: number, index: number) => void;
};

type TileWrapperProps = {
  value: number;
};

type TileHoverProps = {
  isDroppable: boolean;
};

type ElementProps = {
  element: ElemCoord[];
  isDragging: boolean;
  drag?: DragElementWrapper<DragSourceOptions>;
  isDragPreview?: boolean;
};

type GridProps = WrapperProps & {
  center: MinMax;
};

type GridElementProps = ElemCoord & {
  isDragging: boolean;
};
