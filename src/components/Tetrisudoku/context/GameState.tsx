import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import GameReducer from './GameReducer';
import * as actionType from './actions';
import * as Cst from '../../../constants';

declare global {
  interface Array<T> {
    deepClone(): Array<T>;
  }
}

// eslint-disable-next-line no-extend-native
Array.prototype.deepClone = function deepClone() {
  return JSON.parse(JSON.stringify(this));
};

export const getRandomDraggableElement = () =>
  Cst.ELEMENTS[Math.floor(Math.random() * Cst.ELEMENTS.length)];

export const getEmptyBoard = () =>
  Array.from(Array(Cst.VERTICAL_BLOCKS * Cst.BLOCK_HEIGHT), () =>
    new Array(Cst.HORIZONTAL_BLOCKS * Cst.BLOCK_WIDTH).fill(0),
  );

const getInitialState = () => ({
  board: getEmptyBoard(),
  draggableElements: [
    getRandomDraggableElement(),
    getRandomDraggableElement(),
    getRandomDraggableElement(),
  ],
  score: 0,
});

export const iterateBlock = (
  xBlock: number,
  yBlock: number,
  func: (x: number, y: number) => boolean | void,
) => {
  const yMax = (yBlock + 1) * Cst.BLOCK_HEIGHT;
  for (let y = yBlock * Cst.BLOCK_HEIGHT; y < yMax; y += 1) {
    const xMax = (xBlock + 1) * Cst.BLOCK_WIDTH;
    for (let x = xBlock * Cst.BLOCK_WIDTH; x < xMax; x += 1) {
      func.apply(null, [x, y]);
    }
  }
};

export const GameContext = createContext<GameContextProps>(
  {} as GameContextProps,
);

const initState = (initialState: Object) => {
  return JSON.parse(localStorage.getItem('gameState')) || initialState;
};

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    GameReducer,
    getInitialState(),
    initState,
  );
  const [firedScoreAnimation, fireScoreAnimation] = useState<
    FiredScoreAnimation
  >({} as FiredScoreAnimation);

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  const resetGame = useCallback(() => {
    dispatch({
      type: actionType.UPDATE,
      payload: getInitialState(),
    });
  }, []);

  const dropElement = useCallback(
    (x: number, y: number, index: number) => {
      const tempBoard = state.board.deepClone();

      state.draggableElements[index].forEach((elemCoord) => {
        if (
          state.board[y + elemCoord.y] !== undefined &&
          state.board[y + elemCoord.y][x + elemCoord.x] !== undefined &&
          state.board[y + elemCoord.y][x + elemCoord.x] === 0
        ) {
          tempBoard[y + elemCoord.y][x + elemCoord.x] = elemCoord.val;
        }
      });

      dispatch({
        type: actionType.DROP,
        payload: {
          board: tempBoard,
          droppedElementIndex: index,
        },
      });
    },
    [state.board, state.draggableElements],
  );

  const clearDraggableElements = useCallback(() => {
    dispatch({
      type: actionType.UPDATE,
      payload: { draggableElements: [] },
    });
  }, []);

  const isBlockCompletelyFilled = (xBlock: number, yBlock: number): boolean => {
    let result = true;
    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      if (state.board[y][x] === 0) result = false;
    });
    return result;
  };

  const clearBlock = (xBlock: number, yBlock: number) => {
    const tempBoard = state.board.deepClone();
    let addScore = 0;

    iterateBlock(xBlock, yBlock, (x: number, y: number) => {
      tempBoard[y][x] = 0;
      addScore += state.board[y][x];
    });

    fireScoreAnimation({ xBlock, yBlock, addScore });

    dispatch({
      type: actionType.UPDATE,
      payload: {
        board: tempBoard,
        score: state.score + addScore,
      },
    });
  };

  const canElementBeDropped = useCallback(
    (x: number, y: number, index: number) => {
      let canBeDropped = true;

      state.draggableElements[index].forEach((elemCoord) => {
        if (
          state.board[y + elemCoord.y] === undefined ||
          state.board[y + elemCoord.y][x + elemCoord.x] === undefined ||
          state.board[y + elemCoord.y][x + elemCoord.x] !== 0
        ) {
          canBeDropped = false;
        }
      });

      return canBeDropped;
    },
    [state],
  );

  const isElementPlacable = (elem: ElemCoord[]) => {
    const boardWidth = Cst.HORIZONTAL_BLOCKS * Cst.BLOCK_WIDTH;
    const boardHeight = Cst.VERTICAL_BLOCKS * Cst.BLOCK_HEIGHT;
    for (let y = 0; y < boardHeight; y += 1) {
      for (let x = 0; x < boardWidth; x += 1) {
        let canBeDropped = true;
        elem.forEach((elemCoord) => {
          if (
            state.board[y + elemCoord.y] === undefined ||
            state.board[y + elemCoord.y][x + elemCoord.x] === undefined ||
            state.board[y + elemCoord.y][x + elemCoord.x] !== 0
          ) {
            canBeDropped = false;
          }
        });

        if (canBeDropped) return true;
      }
    }
    return false;
  };

  const isAnyElementPlaceable = () => {
    let result = false;
    state.draggableElements.forEach((element) => {
      if (isElementPlacable(element)) {
        result = true;
      }
    });
    return result;
  };

  useEffect(() => {
    let blockWasCleared = false;

    for (let yBlock = 0; yBlock < Cst.VERTICAL_BLOCKS; yBlock += 1) {
      for (let xBlock = 0; xBlock < Cst.HORIZONTAL_BLOCKS; xBlock += 1) {
        if (isBlockCompletelyFilled(xBlock, yBlock)) {
          clearBlock(xBlock, yBlock);
          blockWasCleared = true;
        }
      }
    }

    if (
      !blockWasCleared &&
      state.draggableElements.length > 0 &&
      !isAnyElementPlaceable()
    ) {
      clearDraggableElements();
      alert('Game over!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const contextValue = useMemo(
    () => ({
      board: state.board,
      draggableElements: state.draggableElements,
      score: state.score,
      firedScoreAnimation,
      dropElement,
      clearDraggableElements,
      canElementBeDropped,
      resetGame,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
