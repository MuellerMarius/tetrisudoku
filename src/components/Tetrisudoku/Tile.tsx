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
  canDrop: (x: number, y: number, element: ElemCoord[]) => boolean;
};

type WrapperProps = {
  state: number;
};

type HoverProps = {
  isDroppable: boolean;
};

const TileWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ state }) => Cst.BLOCK_COLORS[state]};
`;

const HoverOverlay = styled.div<HoverProps>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${({ isDroppable }) =>
    isDroppable ? 'rgba(209, 46, 46,0.4)' : 'rgba(57, 209, 46,0.4)'};
`;

const Tile: React.FC<Props> = (props) => {
  const [{ isOver }, drop] = useDrop({
    accept: Cst.TYPE_ELEMENT,
    drop: (item: dragItem) => {
      props.onDrop(props.x, props.y, item.element);
    },
    hover: (item: dragItem) => {
      hover(item.element);
    },
    canDrop: (item, monitor) => props.canDrop(props.x, props.y, item.element),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const hover = (element: ElemCoord[]) => {
    !isOver && props.onHover(props.x, props.y, element);
  };

  return (
    <TileWrapper state={props.state} ref={drop}>
      {props.hover !== 0 && <HoverOverlay isDroppable={props.hover < 0} />}
    </TileWrapper>
  );
};

export default React.memo(Tile);
