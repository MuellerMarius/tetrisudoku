import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { GameContext } from './context/GameState';
import * as Cst from '../../constants';

const TileWrapper = styled.div<TileWrapperProps>`
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  background-color: ${({ value }) => Cst.BLOCK_COLORS[value]};
  transition: background-color 0.4s ease-in-out;
`;

const HoverOverlay = styled.div<TileHoverProps>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${({ isDroppable }) =>
    isDroppable
      ? Cst.BLOCK_HOVER_COLOR_DROPPABLE
      : Cst.BLOCK_HOVER_COLOR_NOT_DROPPABLE};
`;

const BoardTile: React.FC<BoardTileProps> = (props) => {
  const { board, dropElement, canElementBeDropped } = useContext(GameContext);
  const [{ isOver }, drop] = useDrop({
    accept: Cst.TYPE_ELEMENT,
    drop: (item: dragItem) => {
      dropElement(props.x, props.y, item.index);
    },
    hover: (item: dragItem) => {
      hover(item.index);
    },
    canDrop: (item) => canElementBeDropped(props.x, props.y, item.index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const hover = (index: number) => {
    !isOver && props.onHover(props.x, props.y, index);
  };

  return (
    <TileWrapper value={board[props.y][props.x]} ref={drop}>
      {props.hover !== 0 && <HoverOverlay isDroppable={props.hover >= 0} />}
    </TileWrapper>
  );
};

BoardTile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  hover: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default React.memo(BoardTile);
