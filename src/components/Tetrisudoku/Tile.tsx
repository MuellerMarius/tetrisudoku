import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import * as Cst from '../../constants';

type Props = {
  x: number;
  y: number;
  state: number;
  hover: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onHover: (x: number, y: number, element: ElemCoord[]) => void;
  onDrop: (x: number, y: number, element: ElemCoord[]) => void;
};

type WrapperProps = {
  state: number;
  name: string;
};

type HoverProps = {
  isDroppable: boolean;
};

const TileWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => Cst.BLOCK_COLORS[props.state]};
`;

const HoverOverlay = styled.div<HoverProps>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${(props) =>
    props.isDroppable ? 'rgba(209, 46, 46,0.4)' : 'rgba(57, 209, 46,0.4)'};
`;

const Tile: React.FC<Props> = (props) => {
  const [{ isOver }, drop] = useDrop({
    accept: Cst.ItemTypes.ELEMENT,
    drop: (item: dragItem) => {
      props.onDrop(props.x, props.y, item.element);
    },
    hover: (item: dragItem) => {
      // TODO: refactor
      hover(item.element);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const hover = (element: ElemCoord[]) => {
    !isOver && props.onHover(props.x, props.y, element);
  };

  // console.log('redraw');
  return (
    <TileWrapper state={props.state} ref={drop} name="peter">
      {props.hover !== 0 && <HoverOverlay isDroppable={props.hover < 0} />}
    </TileWrapper>
  );
};

export default React.memo(Tile);
