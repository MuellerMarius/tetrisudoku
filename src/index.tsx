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
import InfoText from './InfoText';

const GlobalStyle = createGlobalStyle`
  body {
    background: #fefefe;
    background: linear-gradient(0deg, rgba(254,254,254,1) 60%, rgba(20,40,51,0.75) 60%);
    background-repeat: no-repeat;
    font-family: 'Noto Sans TC', sans-serif;
    color: #323232;

    @media (max-width: 700px) {
      background: #fefefe;  
      background: linear-gradient(0deg, rgba(254,254,254,1) 65%, rgba(20,40,51,0.75) 65%);
      background-repeat: no-repeat;
    }

    @media (max-width: 400px) {
      background: #fefefe;  
      background: linear-gradient(0deg, rgba(254,254,254,1) 90%, rgba(20,40,51,0.75) 90%);
      background-repeat: no-repeat;
    }
  }
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
      <InfoText />
    </DndProvider>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
