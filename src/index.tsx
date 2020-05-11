import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { Tetrisudoku } from './components/Tetrisudoku';

import './styles.scss';

const GameContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 50%;
`;

const DummyPlaceholder = styled.div`
  margin-top: 100%;
`;

function App() {
  return (
    <GameContainer>
      <DummyPlaceholder />
      <Tetrisudoku />
    </GameContainer>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
