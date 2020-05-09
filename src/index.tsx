import * as React from 'react';
import { render } from 'react-dom';
import { Tetrisudoku } from './components/Tetrisudoku';

import './styles.scss';

function App() {
  return (
    <div className="App">
      <Tetrisudoku />
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
