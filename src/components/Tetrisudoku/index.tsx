import React, { useEffect, useState } from 'react';

interface Props {
  gameWidth?: number;
  gameHeight?: number;
  blockWidth?: number;
  blockHeight?: number;
}

export const Tetrisudoku: React.FC<Props> = (props) => {
  const { gameHeight, gameWidth } = props;
  const [board, setBoard] = useState<Array<number>[]>([]);

  useEffect(() => {
    //initialize Board
    setBoard(new Array(gameHeight));
  }, []);

  return <div>{props.gameHeight}</div>;
};

Tetrisudoku.defaultProps = {
  gameWidth: 9,
  gameHeight: 9,
  blockWidth: 3,
  blockHeight: 3,
} as Partial<Props>;
