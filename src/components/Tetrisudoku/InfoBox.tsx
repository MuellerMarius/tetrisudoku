import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useCycle } from 'framer-motion';
import * as Cst from '../../constants';

const Container = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  grid-column: 1 / 3;
  background-color: ${Cst.BOARD_BG_COLOR};
  color: #555;
  margin-bottom: 8px;
  padding: 5px 25px 5px 25px;
  font-size: 14pt;
  z-index: 99;
`;

const Icon = styled.span`
  margin-right: 7px;
`;

const QuestionMark = styled.button`
  outline: none;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  position: absolute;
  top: 9px;
  left: 7px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgba(20, 40, 51, 0.4);
  color: #fefefe;
  cursor: pointer;
  font-size: 13pt;
  z-index: 99;
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;

const BoxInnerText = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  padding: 65px 30px 30px 30px;
  background-color: rgba(20, 40, 51, 0.75);
  color: #fefefe;
  font-size: 11pt;
  z-index: 98;
  text-align: justify;

  h3 {
    margin-top: 20px;
    margin-bottom: 0;
  }

  a {
    background-color: #fefefe;
    color: rgb(20, 40, 51);
    text-decoration: none;
    padding-right: 3px;
    padding-left: 3px;
  }

  a:hover {
    background-color: #ddd;
  }
`;

const box = {
  open: (width = 1000) => ({
    clipPath: `circle(${width * 2}px at 20px 20px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(12px at 20px 20px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const InfoBox: React.FC = () => {
  const [expanded, toggleExpanded] = useCycle(false, true);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  return (
    <Container>
      <motion.div initial={false} animate={expanded ? 'open' : 'closed'}>
        <Box variants={box} custom={windowDimensions.width}>
          <QuestionMark onClick={() => toggleExpanded()}>?</QuestionMark>
          <BoxInnerText>
            <h3>Tetrisodoku</h3>
            <p>
              Tetrisodoku is a game combining the famous Tetris with Sodoku.
              With each move you get to chose between three Tetris tiles which
              you can drag and drop anywhere on the game board. Once you
              completely fill one of the marked squares, the blocks disappear
              and you will be credited the respective score. The darker the
              color of the Tetris blocks, the more points you will receive.
              Chose wiseley where to place your tiles as the game is over when
              none of the tiles can be placed on the board any more.
            </p>
            <h3>Source code</h3>
            <p>
              For source code and more information have a look at the{' '}
              <a href="https://github.com/MuellerMarius/tetrisudoku">
                Github repository
              </a>
              .
            </p>
          </BoxInnerText>
        </Box>
      </motion.div>
    </Container>
  );
};

export default InfoBox;
