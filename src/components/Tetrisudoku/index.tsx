import React, { useEffect, useState, useCallback, ReactChild } from 'react';
import styled from 'styled-components';
import { ScoreAnimation } from './ScoreAnimation';
import CustomDragLayer from './CustomDragLayer';
import DragElement from './DragElement';
import Tile from './Tile';
import * as Cst from '../../constants';

//
// Types
//

type TetrissudokuProps = {
  blockWidth?: number;
  blockHeight?: number;
  horizontalBlocks?: number;
  verticalBlocks?: number;
};

type LayoutStretcherProps = {
  width: number;
  height: number;
};

type ElementsWrapperProps = {
  itemCount: number;
};

declare global {
  interface Array<T> {
    deepClone(): Array<T>;
  }
}

//
// Styles
//

const Game = styled.div`
  position: relative;
  width: 85%;
  left: 7.5%;
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 7px;

  @media (min-width: 1200px) {
    width: 65%;
    left: 17.5%;
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

const Sidebar = styled.div`
  position: relative;
  width: 100%;
  background-color: ${Cst.BOARD_BG_COLOR};

  @media (max-width: 768px) {
    margin-top: 5px;
    grid-column: 1 / 3;
  }
`;

const Score = styled.div`
  margin-top: 15px;
  width: 100%;
  text-align: center;

  & p {
    margin-bottom: 0;
    margin-top: 10px;
    font-size: 25pt;

    @media (min-width: 992px) {
      font-size: 40pt;
    }
  }
`;

const ElementsWrapper = styled.div<ElementsWrapperProps>`
  position: relative;
  width: 100%;
  height: 80%;
  display: grid;

  @media (max-width: 768px) {
    grid-template-columns: repeat(${({ itemCount }) => itemCount}, 1fr);
    grid-column-gap: 10px;
    min-height: 125px;
  }

  @media (min-width: 768px) {
    grid-template-rows: repeat(${({ itemCount }) => itemCount}, 1fr);
    grid-row-gap: 10px;
    justify-content: center;
  }
`;

const BlockWrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-row-gap: 0px;
  grid-column-gap: 0px;
  background-color: ${Cst.BOARD_BG_COLOR};
`;

const Block = styled.div<WrapperProps>`
  position: relative;
  border: 1px solid ${Cst.BLOCK_BORDER_COLOR};
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-row-gap: 1px;
  grid-column-gap: 1px;
`;

const LayoutStretcher = styled.div<LayoutStretcherProps>`
  margin-top: ${({ width, height }) => (height / width) * 100}%;
`;

//
// Functions
//

Array.prototype.deepClone = function() {
  return JSON.parse(JSON.stringify(this));
};

const randomDragElement = () => {
  return Cst.ELEMENTS[Math.floor(Math.random() * Cst.ELEMENTS.length)];
};

export const Tetrisudoku: React.FC<TetrissudokuProps> = ({
  blockWidth = Cst.DEFAULT_BLOCK_WIDTH,
  blockHeight = Cst.DEFAULT_BLOCK_HEIGHT,
  horizontalBlocks = Cst.DEFAULT_HORIZONTAL_BLOCKS,
  verticalBlocks = Cst.DEFAULT_VERTICAL_BLOCKS,
}: TetrissudokuProps) => {
  const initialAnimState = Array(horizontalBlocks * verticalBlocks).fill(0);
  const initialBoardState = Array.from(
    Array(verticalBlocks * blockHeight),
    () => new Array(horizontalBlocks * blockWidth).fill(0)
  );

  const [boardState, setBoardState] = useState<number[][]>(initialBoardState);
  const [hoverState, setHoverState] = useState<number[][]>(initialBoardState);
  const [score, setScore] = useState<number>(0);
  const [scoreAnimations, setScoreAnim] = useState<number[]>(initialAnimState);
  const [dragElements, setDragElements] = useState<ElemCoord[][]>([
    randomDragElement(),
    randomDragElement(),
    randomDragElement(),
  ]);

  //
  // Logic
  //

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

    if (
      !blockWasCleared &&
      dragElements.length > 0 &&
      !isAnyElementPlaceable()
    ) {
      setDragElements([]);
      alert('Game over!');
    }
  }, [boardState, dragElements]);

  const setNewDragElement = (index: number) => {
    const tempElements = dragElements.deepClone();
    tempElements[index] = randomDragElement();
    setDragElements(tempElements);
  };

  const dropElement = useCallback(
    (x: number, y: number, index: number) => {
      const tempState = boardState.deepClone();

      for (const elemCoord of dragElements[index]) {
        if (
          boardState[y + elemCoord.y] !== undefined &&
          boardState[y + elemCoord.y][x + elemCoord.x] !== undefined &&
          boardState[y + elemCoord.y][x + elemCoord.x] === 0
        ) {
          tempState[y + elemCoord.y][x + elemCoord.x] = elemCoord.val;
        } else {
          return;
        }
      }

      setBoardState(tempState);
      setNewDragElement(index);
    },
    [boardState, dragElements]
  );

  const hoverElement = useCallback(
    (x: number, y: number, index: number) => {
      const element = index >= 0 ? dragElements[index] : [];
      let tempState = initialBoardState.deepClone();
      let canBeDropped = true;

      for (const elemCoord of element) {
        if (
          boardState[y + elemCoord.y] !== undefined &&
          boardState[y + elemCoord.y][x + elemCoord.x] !== undefined
        ) {
          tempState[y + elemCoord.y][x + elemCoord.x] = 1;
          if (boardState[y + elemCoord.y][x + elemCoord.x] !== 0) {
            canBeDropped = false;
          }
        } else {
          canBeDropped = false;
        }
      }

      if (!canBeDropped) {
        tempState = tempState.map((row) =>
          row.map((item) => (item !== 0 ? item * -1 : 0))
        );
      }

      setHoverState(tempState);
    },
    [boardState, dragElements]
  );

  const canElementBeDropped = useCallback(
    (x: number, y: number, index: number) => {
      let canBeDropped = true;

      for (const elemCoord of dragElements[index]) {
        if (
          boardState[y + elemCoord.y] === undefined ||
          boardState[y + elemCoord.y][x + elemCoord.x] === undefined ||
          boardState[y + elemCoord.y][x + elemCoord.x] !== 0
        ) {
          canBeDropped = false;
        }
      }
      return canBeDropped;
    },
    [boardState, dragElements]
  );

  const isAnyElementPlaceable = () => {
    for (const element of dragElements) {
      if (isElementPlacable(element)) {
        return true;
      }
    }
    return false;
  };

  const isElementPlacable = (elem: ElemCoord[]) => {
    const boardWidth = horizontalBlocks * blockWidth;
    const boardHeight = verticalBlocks * blockHeight;
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        let canBeDropped = true;
        for (const elemCoord of elem) {
          if (
            boardState[y + elemCoord.y] === undefined ||
            boardState[y + elemCoord.y][x + elemCoord.x] === undefined ||
            boardState[y + elemCoord.y][x + elemCoord.x] !== 0
          ) {
            canBeDropped = false;
          }
        }
        if (canBeDropped) return true;
      }
    }
    return false;
  };

  const iterateBlock = (
    xBlock: number,
    yBlock: number,
    func: (x: number, y: number) => boolean | void
  ) => {
    for (let y = yBlock * blockHeight; y < (yBlock + 1) * blockHeight; y++) {
      for (let x = xBlock * blockWidth; x < (xBlock + 1) * blockWidth; x++) {
        func.apply(null, [x, y]);
      }
    }
  };

  const clearBlock = (xBlock: number, yBlock: number) => {
    const tempState = boardState.deepClone();
    let addScore = 0;

    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      tempState[y][x] = 0;
      addScore += boardState[y][x];
    });

    setScoreAnim((scoreAnimations) =>
      scoreAnimations.map((elem, index) =>
        index === yBlock * horizontalBlocks + xBlock ? addScore : elem
      )
    );

    setScore((oldScore) => oldScore + addScore);
    setBoardState(tempState);
  };

  const checkBlock = (xBlock: number, yBlock: number): boolean => {
    let result = true;
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      if (boardState[y][x] === 0) result = false;
    });
    return result;
  };

  //
  // Presentation
  //

  const renderBlock = (xBlock: number, yBlock: number) => {
    const tiles: ReactChild[] = [];
    const index = yBlock * horizontalBlocks + xBlock;
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      tiles.push(
        <Tile
          key={`${x}${y}`}
          x={x}
          y={y}
          value={boardState[y][x]}
          hover={hoverState[y][x]}
          onDrop={dropElement}
          onHover={hoverElement}
          canDrop={canElementBeDropped}
        />
      );
    });

    return (
      <Block width={blockWidth} key={index}>
        {tiles}
        {scoreAnimations[index] > 0 && (
          <ScoreAnimation
            score={scoreAnimations[index]}
            onAnimationEnd={() =>
              setScoreAnim((scoreAnimations) =>
                scoreAnimations.map((elem, i) => (i === index ? 0 : elem))
              )
            }
          />
        )}
      </Block>
    );
  };

  const renderBlocks = () => {
    const blocks: ReactChild[] = [];
    for (let y = 0; y < verticalBlocks; y++) {
      for (let x = 0; x < horizontalBlocks; x++) {
        blocks.push(renderBlock(x, y));
      }
    }
    return blocks;
  };

  return (
    <Game>
      <Board>
        <LayoutStretcher
          width={horizontalBlocks * blockWidth}
          height={verticalBlocks * blockHeight}
        />
        <BlockWrapper width={horizontalBlocks}>{renderBlocks()}</BlockWrapper>
      </Board>
      <Sidebar>
        <Score>
          SCORE<p>{score}</p>
        </Score>
        <ElementsWrapper itemCount={dragElements.length}>
          <CustomDragLayer elements={dragElements} />
          {dragElements.map((element, index) => (
            <DragElement
              key={index}
              index={index}
              element={element}
              setHover={hoverElement}
            />
          ))}
        </ElementsWrapper>
      </Sidebar>
    </Game>
  );
};
