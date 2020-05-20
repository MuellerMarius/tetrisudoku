type ElemCoord = {
  x: number;
  y: number;
  val: number;
};

type WrapperProps = {
  width: number;
  height?: number;
};

type dragItem = {
  type: any;
  element: ElemCoord[];
};
