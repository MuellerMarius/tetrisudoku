import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as Cst from '../../constants';

type Props = {
  state: number;
  hover: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

type WrapperProps = {
  state: number;
};

type HoverProps = {
  isDroppable: boolean;
};

const TileWrapper = styled.div<WrapperProps>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: ${(props) => Cst.BLOCK_COLORS[props.state]};
`;

const HoverOverlay = styled.div<HoverProps>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${(props) =>
    props.isDroppable ? 'rgba(255,0,0,0.5)' : 'rgba(0,255,0,0.5)'};
`;

const Tile: React.FC<Props> = (props) => {
  return (
    <TileWrapper
      state={props.state}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
    >
      {props.hover !== 0 && <HoverOverlay isDroppable={props.hover < 0} />}
    </TileWrapper>
  );
};

export default React.memo(Tile);
