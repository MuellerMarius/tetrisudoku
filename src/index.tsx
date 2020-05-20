import * as React from 'react';
import { render } from 'react-dom';
import { DndProvider, useDrag } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { createGlobalStyle } from 'styled-components';
import { Tetrisudoku } from './components/Tetrisudoku';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fcfcfc;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <DndProvider backend={Backend}>
        <Tetrisudoku horizontalBlocks={6} verticalBlocks={6} />
      </DndProvider>
    </>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
