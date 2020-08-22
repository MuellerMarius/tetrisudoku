import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import GameReducer from './GameReducer';
import * as actionType from './actions';
import * as Cst from '../../../constants';

declare global {
  interface Array<T> {
    deepClone(): Array<T>;
  }
}

Array.prototype.deepClone = function() {
  return JSON.parse(JSON.stringify(this));
};

export const getRandomDraggableElement = () => {
  return Cst.ELEMENTS[Math.floor(Math.random() * Cst.ELEMENTS.length)];
};

export const getEmptyBoard = () => {
  return Array.from(Array(Cst.VERTICAL_BLOCKS * Cst.BLOCK_HEIGHT), () =>
    new Array(Cst.HORIZONTAL_BLOCKS * Cst.BLOCK_WIDTH).fill(0)
  );
};

const getInitialState = () => {
  return {
    board: getEmptyBoard(),
    draggableElements: [
      getRandomDraggableElement(),
      getRandomDraggableElement(),
      getRandomDraggableElement(),
    ],
    score: 0,
  };
};

export const iterateBlock = (
  xBlock: number,
  yBlock: number,
  func: (x: number, y: number) => boolean | void
) => {
  for (
    let y = yBlock * Cst.BLOCK_HEIGHT;
    y < (yBlock + 1) * Cst.BLOCK_HEIGHT;
    y++
  ) {
    for (
      let x = xBlock * Cst.BLOCK_WIDTH;
      x < (xBlock + 1) * Cst.BLOCK_WIDTH;
      x++
    ) {
      func.apply(null, [x, y]);
    }
  }
};

export const GameContext = createContext<GameContextProps>(
  {} as GameContextProps
);

export const GameContextProvider = ({ children }) => {
  const localState = JSON.parse(localStorage.getItem('gameState'));
  const [state, dispatch] = useReducer(
    GameReducer,
    localState || getInitialState()
  );
  const [firedScoreAnimation, fireScoreAnimation] = useState<
    FiredScoreAnimation
  >({} as FiredScoreAnimation);

  useEffect(() => {
    let blockWasCleared = false;

    for (let yBlock = 0; yBlock < Cst.VERTICAL_BLOCKS; yBlock++) {
      for (let xBlock = 0; xBlock < Cst.HORIZONTAL_BLOCKS; xBlock++) {
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
  }, [state]);

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

      for (const elemCoord of state.draggableElements[index]) {
        if (
          state.board[y + elemCoord.y] !== undefined &&
          state.board[y + elemCoord.y][x + elemCoord.x] !== undefined &&
          state.board[y + elemCoord.y][x + elemCoord.x] === 0
        ) {
          tempBoard[y + elemCoord.y][x + elemCoord.x] = elemCoord.val;
        } else {
          return;
        }
      }

      dispatch({
        type: actionType.DROP,
        payload: {
          board: tempBoard,
          droppedElementIndex: index,
        },
      });
    },
    [state.board, state.draggableElements]
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

      for (const elemCoord of state.draggableElements[index]) {
        if (
          state.board[y + elemCoord.y] === undefined ||
          state.board[y + elemCoord.y][x + elemCoord.x] === undefined ||
          state.board[y + elemCoord.y][x + elemCoord.x] !== 0
        ) {
          canBeDropped = false;
        }
      }
      return canBeDropped;
    },
    [state]
  );

  const isAnyElementPlaceable = () => {
    for (const element of state.draggableElements) {
      if (isElementPlacable(element)) {
        return true;
      }
    }
    return false;
  };

  const isElementPlacable = (elem: ElemCoord[]) => {
    const boardWidth = Cst.HORIZONTAL_BLOCKS * Cst.BLOCK_WIDTH;
    const boardHeight = Cst.VERTICAL_BLOCKS * Cst.BLOCK_HEIGHT;
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        let canBeDropped = true;
        for (const elemCoord of elem) {
          if (
            state.board[y + elemCoord.y] === undefined ||
            state.board[y + elemCoord.y][x + elemCoord.x] === undefined ||
            state.board[y + elemCoord.y][x + elemCoord.x] !== 0
          ) {
            canBeDropped = false;
          }
        }
        if (canBeDropped) return true;
      }
    }
    return false;
  };

  const contextValue = useMemo(() => {
    return {
      board: state.board,
      draggableElements: state.draggableElements,
      score: state.score,
      firedScoreAnimation,
      dropElement,
      clearDraggableElements,
      canElementBeDropped,
      resetGame,
    };
  }, [
    state,
    dropElement,
    clearDraggableElements,
    canElementBeDropped,
    firedScoreAnimation,
  ]);

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
