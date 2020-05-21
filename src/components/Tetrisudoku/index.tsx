import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ElementPreview } from './ElementPreview';
import Tile from './Tile';
import * as Cst from '../../constants';

type Props = {
  blockWidth?: number;
  blockHeight?: number;
  horizontalBlocks?: number;
  verticalBlocks?: number;
};

type PlaceholderProps = {
  width: number;
  height: number;
};

const Game = styled.div`
  position: relative;
  width: 70%;
  left: 15%;
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 7px;

  @media (min-width: 1200px) {
    width: 50%;
    left: 25%;
  }
`;

const Board = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  grid-column: 1 / 2;
  @media (max-width: 768px) {
    grid-column: 1 / 3;
  }
`;

const BoardGridWrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-row-gap: 0px;
  grid-column-gap: 0px;
`;

const BlockWrapper = styled.div<WrapperProps>`
  border: 1px solid ${Cst.BLOCK_BORDER_COLOR};
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-row-gap: 1px;
  grid-column-gap: 1px;
`;

const DummyPlaceholder = styled.div<PlaceholderProps>`
  margin-top: ${({ width, height }) => (height / width) * 100}%;
`;

declare global {
  interface Array<T> {
    deepClone(): Array<T>;
  }
}

Array.prototype.deepClone = function() {
  return JSON.parse(JSON.stringify(this));
};

export const Tetrisudoku: React.FC<Props> = ({
  blockWidth = Cst.DEFAULT_BLOCK_WIDTH,
  blockHeight = Cst.DEFAULT_BLOCK_HEIGHT,
  horizontalBlocks = Cst.DEFAULT_HORIZONTAL_BLOCKS,
  verticalBlocks = Cst.DEFAULT_VERTICAL_BLOCKS,
}: Props) => {
  const boardWidth = horizontalBlocks * blockWidth;
  const boardHeight = verticalBlocks * blockHeight;
  const initialBoardState = Array.from(Array(boardHeight), () =>
    new Array(boardWidth).fill(0)
  );
  const [boardState, setBoardState] = useState<number[][]>(initialBoardState);
  const [hoverState, setHoverState] = useState<number[][]>(initialBoardState);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    let blockWasCleared = false;

    for (let yBlock = 0; yBlock < verticalBlocks; yBlock++) {
      for (let xBlock = 0; xBlock < horizontalBlocks; xBlock++) {
        if (checkBlock(xBlock, yBlock)) {
          clearBlock(xBlock, yBlock);
          blockWasCleared = true;
        }
      }
    }
    // TODO: nextElements über DragEvent
    // if (!blockWasCleared && !isElementPlacable(nextElement)) {
    //   alert('Game over! :-(');
    // }
  }, [boardState]);

  const addElement = useCallback(
    (x: number, y: number, element: ElemCoord[]) => {
      let tempState = boardState.deepClone();

      for (const elemCoord of element) {
        if (
          boardState[y + elemCoord.y] !== undefined &&
          boardState[y + elemCoord.y][x + elemCoord.x] !== undefined &&
          boardState[y + elemCoord.y][x + elemCoord.x] === 0
        ) {
          tempState[y + elemCoord.y][x + elemCoord.x] = elemCoord.val;
        } else {
          // TODO: Display message
          return;
        }
      }

      setHoverState(initialBoardState.deepClone());
      setBoardState(tempState);
    },
    [boardState]
  );

  const handleHover = useCallback(
    (x: number, y: number, element: ElemCoord[]) => {
      let tempState = initialBoardState.deepClone();
      let isDroppable = true;

      for (const elemCoord of element) {
        if (
          boardState[y + elemCoord.y] !== undefined &&
          boardState[y + elemCoord.y][x + elemCoord.x] !== undefined
        ) {
          tempState[y + elemCoord.y][x + elemCoord.x] = 1;
          if (boardState[y + elemCoord.y][x + elemCoord.x] !== 0) {
            isDroppable = false;
          }
        } else {
          isDroppable = false;
        }
      }

      if (!isDroppable) {
        tempState = tempState.map((row) =>
          row.map((item) => (item !== 0 ? item * -1 : 0))
        );
      }

      setHoverState(tempState);
    },
    [boardState]
  );

  const canElementBeDropped = useCallback(
    (x: number, y: number, element: ElemCoord[]) => {
      let isDroppable = true;

      for (const elemCoord of element) {
        if (
          boardState[y + elemCoord.y] === undefined ||
          boardState[y + elemCoord.y][x + elemCoord.x] === undefined ||
          boardState[y + elemCoord.y][x + elemCoord.x] !== 0
        ) {
          isDroppable = false;
        }
      }
      return isDroppable;
    },
    [boardState]
  );

  function isElementPlacable(elem: ElemCoord[]) {
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        let isDroppable = true;
        for (const elemCoord of elem) {
          if (
            boardState[y + elemCoord.y] === undefined ||
            boardState[y + elemCoord.y][x + elemCoord.x] === undefined ||
            boardState[y + elemCoord.y][x + elemCoord.x] !== 0
          ) {
            isDroppable = false;
          }
        }
        if (isDroppable) return true;
      }
    }
    return false;
  }

  function iterateBlock(
    xBlock: number,
    yBlock: number,
    func: (x: number, y: number) => any
  ) {
    for (let y = yBlock * blockHeight; y < (yBlock + 1) * blockHeight; y++) {
      for (let x = xBlock * blockWidth; x < (xBlock + 1) * blockWidth; x++) {
        func.apply(null, [x, y]);
      }
    }
  }

  function clearBlock(xBlock: number, yBlock: number): void {
    let tempState = boardState.deepClone();
    let addScore = 0;

    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      tempState[y][x] = 0;
      addScore += boardState[y][x];
    });

    setScore((oldScore) => oldScore + addScore);
    setBoardState(tempState);
  }

  function checkBlock(xBlock: number, yBlock: number): boolean {
    let result = true;
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      if (boardState[y][x] === 0) result = false;
    });
    return result;
  }

  function drawBlock(xBlock: number, yBlock: number) {
    let tiles: JSX.Element[] = [];
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      tiles.push(
        <Tile
          key={`${x}${y}`}
          x={x}
          y={y}
          state={boardState[y][x]}
          hover={hoverState[y][x]}
          onDrop={addElement}
          onHover={handleHover}
          canDrop={canElementBeDropped}
        />
      );
    });

    return (
      <BlockWrapper width={blockWidth} key={`${xBlock}${yBlock}`}>
        {tiles}
      </BlockWrapper>
    );
  }

  function drawBlocks() {
    let blocks: JSX.Element[] = [];
    for (let y = 0; y < verticalBlocks; y++) {
      for (let x = 0; x < horizontalBlocks; x++) {
        blocks.push(drawBlock(x, y));
      }
    }
    return blocks;
  }

  return (
    <Game>
      <Board>
        <DummyPlaceholder
          width={horizontalBlocks * blockWidth}
          height={verticalBlocks * blockHeight}
        />
        <BoardGridWrapper width={horizontalBlocks}>
          {drawBlocks()}
        </BoardGridWrapper>
      </Board>
      <ElementPreview setHover={handleHover} />
      <div> Score: {score}</div>
    </Game>
  );
};
