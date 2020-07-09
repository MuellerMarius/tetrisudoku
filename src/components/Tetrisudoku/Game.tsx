import React, {
  useState,
  useCallback,
  ReactChild,
  useContext,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { GameContext, getEmptyBoard, iterateBlock } from './context/GameState';
import { ScoreAnimation } from './ScoreAnimation';
import Board from './Board';
import BoardTile from './BoardTile';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import * as Cst from '../../constants';

const GameWrapper = styled.div`
  position: relative;
  top: 10px;
  width: 85%;
  left: 7.5%;
  display: grid;
  grid-template-columns: 80% 20%;

  @media (min-width: 1200px) {
    top: 25px;
    width: 65%;
    left: 17.5%;
  }

  @media (min-width: 1600px) {
    width: 55%;
    left: 22.5%;
  }
`;

const Block = styled.div`
  position: relative;
  border: 1px solid ${Cst.BLOCK_BORDER_COLOR};
  display: grid;
  grid-template-columns: repeat(${Cst.BLOCK_WIDTH}, 1fr);
  grid-row-gap: 1px;
  grid-column-gap: 1px;
`;

export const Game: React.FC = () => {
  const initialAnimState = Array(
    Cst.HORIZONTAL_BLOCKS * Cst.VERTICAL_BLOCKS
  ).fill(0);

  const [hoverState, setHoverState] = useState<number[][]>(getEmptyBoard());
  const [scoreAnimations, setScoreAnim] = useState<number[]>(initialAnimState);
  const { board, draggableElements, firedScoreAnimation } = useContext(
    GameContext
  );

  useEffect(() => {
    setScoreAnim((scoreAnimations) =>
      scoreAnimations.map((elem, index) =>
        index ===
        firedScoreAnimation.yBlock * Cst.HORIZONTAL_BLOCKS +
          firedScoreAnimation.xBlock
          ? firedScoreAnimation.addScore
          : elem
      )
    );
  }, [firedScoreAnimation]);

  const hoverElement = useCallback(
    (x: number, y: number, index: number) => {
      const element = index >= 0 ? draggableElements[index] : [];
      let tempState = getEmptyBoard();
      let canBeDropped = true;

      for (const elemCoord of element) {
        if (
          board[y + elemCoord.y] !== undefined &&
          board[y + elemCoord.y][x + elemCoord.x] !== undefined
        ) {
          tempState[y + elemCoord.y][x + elemCoord.x] = 1;
          if (board[y + elemCoord.y][x + elemCoord.x] !== 0) {
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
    [board, draggableElements]
  );

  const renderBlock = useCallback(
    (xBlock: number, yBlock: number) => {
      const tiles: ReactChild[] = [];
      const index = yBlock * Cst.HORIZONTAL_BLOCKS + xBlock;
      iterateBlock(xBlock, yBlock, (x: number, y: number) => {
        tiles.push(
          <BoardTile
            key={`${x}${y}`}
            x={x}
            y={y}
            hover={hoverState[y][x]}
            onHover={hoverElement}
          />
        );
      });

      return (
        <Block key={index}>
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
    },
    [hoverState, hoverElement, scoreAnimations]
  );

  const renderBlocks = useCallback(() => {
    const blocks: ReactChild[] = [];
    for (let y = 0; y < Cst.VERTICAL_BLOCKS; y++) {
      for (let x = 0; x < Cst.HORIZONTAL_BLOCKS; x++) {
        blocks.push(renderBlock(x, y));
      }
    }
    return blocks;
  }, [renderBlock]);

  return (
    <GameWrapper>
      <Topbar />
      <Board>{renderBlocks()}</Board>
      <Sidebar setHover={hoverElement} />
    </GameWrapper>
  );
};
