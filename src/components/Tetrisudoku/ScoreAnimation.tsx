import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styled, { keyframes } from 'styled-components';

type Props = {
  score: number;
  onAnimationEnd: () => void;
};

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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const ScoreAnimation: React.FC<Props> = (props) => {
  return (
    <Animator onAnimationEnd={props.onAnimationEnd}>
      <div unselectable="on">{props.score}</div>
    </Animator>
  );
};

ScoreAnimation.propTypes = {
  onAnimationEnd: PropTypes.func,
  score: PropTypes.number.isRequired,
};
