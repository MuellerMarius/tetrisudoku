import * as React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Tetrisudoku } from './components/Tetrisudoku';
import InfoText from './InfoText';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  body {
    background: #fefefe;
    background: linear-gradient(0deg, rgba(254,254,254,1) 60%, rgba(20,40,51,0.75) 60%);
    background-repeat: no-repeat;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 12pt;
    color: #323232;

    @media (max-width: 700px) {
      background: #fefefe;  
      background: linear-gradient(0deg, rgba(254,254,254,1) 70%, rgba(20,40,51,0.75) 70%);
      background-repeat: no-repeat;
    }

    @media (max-width: 400px) {
      background: #fefefe;  
      background: linear-gradient(0deg, rgba(254,254,254,1) 80%, rgba(20,40,51,0.75) 80%);
      background-repeat: no-repeat;
      font-size: 11pt;
    }
  }
  * {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <main>
      <GlobalStyle />
      <Tetrisudoku />
      <InfoText />
    </main>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
serviceWorker.register();
