import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import * as Cst from '../../constants';

//
// Types
//

type TileProps = {
  x: number;
  y: number;
  value: number;
  hover: number;
  onHover: (x: number, y: number, index: number) => void;
  onDrop: (x: number, y: number, index: number) => void;
  canDrop: (x: number, y: number, index: number) => boolean;
};

type TileWrapperProps = {
  value: number;
};

type HoverProps = {
  isDroppable: boolean;
};

//
// Styles
//

const TileWrapper = styled.div<TileWrapperProps>`
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  background-color: ${({ value }) => Cst.BLOCK_COLORS[value]};
  transition: background-color 0.4s ease-in-out;
`;

const HoverOverlay = styled.div<HoverProps>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${({ isDroppable }) =>
    isDroppable
      ? Cst.BLOCK_HOVER_COLOR_DROPPABLE
      : Cst.BLOCK_HOVER_COLOR_NOT_DROPPABLE};
`;

//
// Functions
//

const Tile: React.FC<TileProps> = (props) => {
  const [{ isOver }, drop] = useDrop({
    accept: Cst.TYPE_ELEMENT,
    drop: (item: dragItem) => {
      props.onDrop(props.x, props.y, item.index);
    },
    hover: (item: dragItem) => {
      hover(item.index);
    },
    canDrop: (item) => props.canDrop(props.x, props.y, item.index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const hover = (index: number) => {
    !isOver && props.onHover(props.x, props.y, index);
  };

  return (
    <TileWrapper value={props.value} ref={drop}>
      {props.hover !== 0 && <HoverOverlay isDroppable={props.hover >= 0} />}
    </TileWrapper>
  );
};

Tile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  hover: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  canDrop: PropTypes.func.isRequired,
};

export default React.memo(Tile);
