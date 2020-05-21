import React, { useEffect, useState, ReactNode } from 'react';
import styled from 'styled-components';
import { DragElement } from './DragElement';

type Props = {
  setHover: (x: number, y: number, element: ElemCoord[]) => void;
};

const Wrapper = styled.div`
  background-color: #efefef;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ElementPreview: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <DragElement setHover={props.setHover} />
      <DragElement setHover={props.setHover} />
    </Wrapper>
  );
};
