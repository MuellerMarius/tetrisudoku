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

const LayoutStretcher = styled.div`
  display: relative;
  margin-top: 100%;
  bottom: 0;
  z-index: -1;
`;

const HoverOverlay = styled.div<TileHoverProps>`
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${({ isDroppable }) =>
    isDroppable
      ? Cst.BLOCK_HOVER_COLOR_DROPPABLE
      : Cst.BLOCK_HOVER_COLOR_NOT_DROPPABLE};
`;

const BoardTile: React.FC<BoardTileProps> = ({ hover, hoverElement, x, y }) => {
  const { board, dropElement, canElementBeDropped } = useContext(GameContext);
  const [{ isOver }, drop] = useDrop({
    accept: Cst.TYPE_ELEMENT,
    drop: (item: dragItem) => {
      dropElement(x, y, item.index);
    },
    hover: (item: dragItem) => {
      if (!isOver) {
        hoverElement(x, y, item.index);
      }
    },
    canDrop: (item) => canElementBeDropped(x, y, item.index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <TileWrapper value={board[y][x]} ref={drop}>
      {hover !== 0 && <HoverOverlay isDroppable={hover >= 0} />}
      <LayoutStretcher />
    </TileWrapper>
  );
};

BoardTile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  hover: PropTypes.number.isRequired,
  hoverElement: PropTypes.func.isRequired,
};

export default React.memo(BoardTile);
