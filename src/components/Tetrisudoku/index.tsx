import React, { useEffect, useState } from 'react';
import * as Cst from '../../constants';

interface Props {
  gameWidth?: number;
  gameHeight?: number;
  blockWidth?: number;
  blockHeight?: number;
}

export const Tetrisudoku: React.FC<Props> = (props) => {
  const { gameHeight, gameWidth } = props;
  const [boardState, setBoardState] = useState<Array<Array<number>>>([]);

  useEffect(() => {
    setBoardState(new Array(gameHeight).fill(new Array(gameWidth).fill(0)));
  }, []);

  return <div>{gameHeight}</div>;
};

Tetrisudoku.defaultProps = {
  gameWidth: Cst.DEFAULT_GAME_WIDTH,
  gameHeight: Cst.DEFAULT_GAME_HEIGHT,
  blockWidth: Cst.DEFAULT_BLOCK_WIDTH,
  blockHeight: Cst.DEFAULT_BLOCK_HEIGHT,
} as Partial<Props>;
