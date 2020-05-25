import * as React from 'react';
import { render } from 'react-dom';
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from 'react-dnd-multi-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Backend from 'react-dnd-html5-backend';
import { createGlobalStyle } from 'styled-components';
import { Tetrisudoku } from './components/Tetrisudoku';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fcfcfc;
    font-family: Arial, Helvetica, sans-serif;}
  * {
    box-sizing: border-box;
  }
`;

const HTML5toTouch = {
  backends: [
    {
      backend: Backend,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

function App() {
  return (
    <DndProvider options={HTML5toTouch}>
      <GlobalStyle />
      <Tetrisudoku />
    </DndProvider>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
