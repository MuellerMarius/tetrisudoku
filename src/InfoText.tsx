import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  top: 40px;
  width: 85%;
  left: 7.5%;
  text-align: justify;

  @media (min-width: 1200px) {
    top: 75px;
    width: 65%;
    left: 17.5%;
  }

  @media (min-width: 1600px) {
    width: 55%;
    left: 22.5%;
  }

  & p {
    margin-bottom: 40px;
  }
`;

const InfoText: React.FC = () => {
  return (
    <Container>
      <h3>Tetrisodoku</h3>
      <p>
        Tetrisodoku is a game combining the famous game Tetris and Sodoku. With
        each move you can chose between three Tetris tiles which you can drag
        and drop anywhere on the game board. Once you completely fill one of the
        marked squares on the gameboard, the blocks disappear and make room for
        new tiles to place. On top of that you will be credited the respective
        score. The darker the color of the Tetris blocks, the more points you
        will receive. Chose wiseley where to place your tiles as the game is
        over when none of the tiles can be placed on the board any more.
      </p>
      <h3>Source code</h3>
      <p>
        This game is a little fun project written in Typescript and React. If
        you are interested in the source code please visit the{' '}
        <a href="https://github.com/MuellerMarius/tetrisudoku">
          Github repository
        </a>
        . I would be happy if you leave a comment or suggestion for improvement!
        Thanks and stay healthy!
      </p>
    </Container>
  );
};

export default InfoText;
