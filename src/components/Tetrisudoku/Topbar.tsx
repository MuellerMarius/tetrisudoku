import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from './context/GameState';
import { Score } from './Sidebar';
import * as Cst from '../../constants';

const TopbarWrapper = styled.div`
  width: 40%;
  height: 100%;
  left: 30%;
  position: relative;
  grid-column: 1 / 3;
  grid-row: 1;
  background-color: ${Cst.BOARD_BG_COLOR};
  border-radius: 5px 5px 0 0;
  color: #555;
  padding: 5px 25px 5px 25px;
  font-size: 14pt;
  z-index: 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

const TopScore = styled(Score)`
  margin-top: 0;
  font-size: 11pt;
  margin-bottom: 5px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Topbar: React.FC = () => {
  const { score } = useContext(GameContext);

  return (
    <TopbarWrapper>
      <TopScore>
        SCORE<p>{score}</p>
      </TopScore>
    </TopbarWrapper>
  );
};

export default Topbar;
