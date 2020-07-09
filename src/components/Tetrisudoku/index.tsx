import React from 'react';
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from 'react-dnd-multi-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Backend from 'react-dnd-html5-backend';
import { GameContextProvider } from './context/GameState';
import { Game } from './Game';

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

export const Tetrisudoku: React.FC = () => {
  return (
    <DndProvider options={HTML5toTouch}>
      <GameContextProvider>
        <Game />
      </GameContextProvider>
    </DndProvider>
  );
};
