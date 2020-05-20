import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { Tetrisudoku } from './components/Tetrisudoku';

import './styles.scss';

function App() {
  return <Tetrisudoku />;
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
