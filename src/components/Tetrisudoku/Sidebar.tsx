import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GameContext } from './context/GameState';
import DragPreview from './DragPreview';
import DraggableElement from './DraggableElement';
import * as Cst from '../../constants';

const SidebarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 94%;
  margin-top: auto;
  margin-bottom: auto;
  background-color: ${Cst.BOARD_BG_COLOR};
  border-radius: 0 15px 15px 0;

  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
    top: 0;
    height: 100%;
    grid-column: 1 / 3;
    border-radius: 0 0 8px 8px;
    padding: 7px;
  }
`;

const ElementsWrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;

  @media (max-width: 768px) {
    grid-template-columns: repeat(${Cst.DRAG_ELEMENTS_COUNT}, 1fr);
    grid-column-gap: 10px;
    min-height: 125px;
  }

  @media (min-width: 769px) {
    height: 80%;
    grid-template-rows: repeat(${Cst.DRAG_ELEMENTS_COUNT}, 1fr);
    grid-row-gap: 10px;
    justify-content: center;
  }
`;

export const Score = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
  user-select: none;

  & p {
    margin-bottom: 0;
    margin-top: 10px;
    font-size: 25pt;
    line-height: 25pt;

    @media (max-width: 768px) {
      margin-top: 0;
      font-size: 18pt;
      line-height: 18pt;
    }

    @media (min-width: 992px) {
      font-size: 40pt;
      line-height: 40pt;
    }
  }
`;

const SideScore = styled(Score)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { draggableElements, score } = useContext(GameContext);

  return (
    <SidebarWrapper>
      <SideScore>
        SCORE<p>{score}</p>
      </SideScore>
      <ElementsWrapper>
        <DragPreview />
        {draggableElements.map((element, index) => (
          <DraggableElement
            key={index}
            index={index}
            element={element}
            setHover={props.setHover}
          />
        ))}
      </ElementsWrapper>
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {
  setHover: PropTypes.func.isRequired,
};

export default Sidebar;
