import React, { useEffect, useState, ReactNode } from 'react';
import styled from 'styled-components';
import * as Cst from '../../constants';

type Props = {
  blockWidth?: number;
  blockHeight?: number;
  horizontalBlocks?: number;
  verticalBlocks?: number;
};

type WrapperProps = {
  width: number;
};

type TileProps = {
  filled?: number;
};

const BoardWrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-row-gap: 1px;
  grid-column-gap: 1px;
`;

const BlockWrapper = styled.div<WrapperProps>`
  border: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-row-gap: 1px;
  grid-column-gap: 1px;
`;

const Tile = styled.div<TileProps>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.filled ? '#FF0000' : '#FFFF00')};
`;

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

  useEffect(() => {
    for (let yBlock = 0; yBlock < verticalBlocks; yBlock++) {
      for (let xBlock = 0; xBlock < horizontalBlocks; xBlock++) {
        if (checkBlock(xBlock, yBlock)) {
          clearBlock(xBlock, yBlock);
        }
      }
    }
  }, [boardState]);

  function changeState(x: number, y: number, value: number) {
    let tempState = [...boardState];
    tempState[y][x] = value;
    setBoardState(tempState);
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
    let tempState = [...boardState];
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      tempState[y][x] = 0;
    });
    setBoardState(tempState);
  }

  function checkBlock(xBlock: number, yBlock: number): boolean {
    let result = true;
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      if (boardState[y][x] === 0) {
        result = false;
      }
    });
    return result;
  }

  function drawBlock(xBlock: number, yBlock: number) {
    // TODO: any type ändern
    let tiles: any[] = [];
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      tiles.push(
        <Tile
          key={`${x}${y}`}
          filled={boardState[y][x]}
          onClick={() => changeState(x, y, 1)}
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
    let blocks = [];
    for (let y = 0; y < verticalBlocks; y++) {
      for (let x = 0; x < horizontalBlocks; x++) {
        blocks.push(drawBlock(x, y));
      }
    }
    return blocks;
  }

  return <BoardWrapper width={3}>{drawBlocks()}</BoardWrapper>;
};
