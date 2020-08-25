import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Cst from '../../constants';

const BoardWrapper = styled.div`
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.35);
  display: inline-block;
  position: relative;
  width: 100%;
  grid-column: 1 / 2;
  z-index: 1;

  @media (max-width: 768px) {
    grid-column: 1 / 3;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
  }
`;

const BlockWrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-row-gap: 0px;
  grid-column-gap: 0px;
  background-color: ${Cst.BOARD_BG_COLOR};
`;

const LayoutStretcher = styled.div<WrapperProps>`
  display: inline-block;
  margin-top: ${({ width, height }) => (height / width) * 100}%;
  bottom: 0;
`;

const Board: React.FC<BoardProps> = ({ children }) => (
  <BoardWrapper>
    <LayoutStretcher
      width={Cst.HORIZONTAL_BLOCKS * Cst.BLOCK_WIDTH}
      height={Cst.VERTICAL_BLOCKS * Cst.BLOCK_HEIGHT}
    />
    <BlockWrapper width={Cst.HORIZONTAL_BLOCKS}>{children}</BlockWrapper>
  </BoardWrapper>
);

export default React.memo(Board);
