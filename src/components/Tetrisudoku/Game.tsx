import React, {
  useState,
  useCallback,
  ReactChild,
  useContext,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { GameContext, getEmptyBoard, iterateBlock } from './context/GameState';
import ScoreAnimation from './ScoreAnimation';
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

const ResetButton = styled.button`
  cursor: pointer;
  grid-column: 1 / 3;
  width: 100%;
  margin-top: 25px;
  padding: 13px;
  background-color: rgb(254, 254, 254);
  border: solid 1px #8c95a6;
  color: #8c95a6;
  border-radius: 10px;
  font-size: 1.3rem;
  font-weight: 600;

  &:hover {
    background-color: #84a9ac;
    color: white;
  }

  @media (max-width: 768px) {
    position: relative;
    left: 5%;
    width: 90%;
  }
`;

const Game: React.FC = () => {
  const initialAnimState = Array(
    Cst.HORIZONTAL_BLOCKS * Cst.VERTICAL_BLOCKS,
  ).fill(0);

  const [hoverState, setHoverState] = useState<number[][]>(getEmptyBoard());
  const [scoreAnimations, setScoreAnim] = useState<number[]>(initialAnimState);
  const {
    board,
    draggableElements,
    firedScoreAnimation,
    resetGame,
  } = useContext(GameContext);

  useEffect(() => {
    setScoreAnim((oldScoreAnimations) =>
      oldScoreAnimations.map((elem, index) =>
        index ===
        firedScoreAnimation.yBlock * Cst.HORIZONTAL_BLOCKS +
          firedScoreAnimation.xBlock
          ? firedScoreAnimation.addScore
          : elem,
      ),
    );
  }, [firedScoreAnimation]);

  const confirmReset = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you really want to start a new game?')) {
      resetGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hoverElement = useCallback(
    (x: number, y: number, index: number) => {
      const element = index >= 0 ? draggableElements[index] : [];
      let tempState = getEmptyBoard();
      let canBeDropped = true;

      element.forEach((elemCoord) => {
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
      });

      if (!canBeDropped) {
        // return negative numbers if element cannot be dropped here
        tempState = tempState.map((row) =>
          row.map((item) => (item !== 0 ? item * -1 : 0)),
        );
      }

      setHoverState(tempState);
    },
    [board, draggableElements],
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
            hoverElement={hoverElement}
          />,
        );
      });

      return (
        <Block key={index}>
          {tiles}
          {scoreAnimations[index] > 0 && (
            <ScoreAnimation
              score={scoreAnimations[index]}
              onAnimationEnd={() =>
                setScoreAnim((oldScoreAnimations) =>
                  oldScoreAnimations.map((elem, i) => (i === index ? 0 : elem)),
                )
              }
            />
          )}
        </Block>
      );
    },
    [hoverState, hoverElement, scoreAnimations],
  );

  const renderBlocks = useCallback(() => {
    const blocks: ReactChild[] = [];
    for (let y = 0; y < Cst.VERTICAL_BLOCKS; y += 1) {
      for (let x = 0; x < Cst.HORIZONTAL_BLOCKS; x += 1) {
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
      <ResetButton onClick={() => confirmReset()}>Reset Game</ResetButton>
    </GameWrapper>
  );
};

export default Game;
