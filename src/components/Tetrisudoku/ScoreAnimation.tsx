import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeAnimation = keyframes`
  0%    {opacity: 0; transform: scale(0);}
  20%   {opacity: 1; }
  80%   {opacity: 0;}
  99%   {opacity: 0; transform: scale(30)};
  100%  { transform: scale(0)}
`;

const Animator = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100;
  display: grid;
  justify-content: center;
  align-items: center;
  animation: ${fadeAnimation} 0.6s ease-in-out 1;
  animation-fill-mode: forwards;
  user-select: none;
`;

const ScoreAnimation: React.FC<ScoreAnimationProps> = ({
  onAnimationEnd,
  score,
}) => (
  <Animator onAnimationEnd={onAnimationEnd}>
    <div unselectable="on">{score}</div>
  </Animator>
);

ScoreAnimation.propTypes = {
  onAnimationEnd: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default ScoreAnimation;
