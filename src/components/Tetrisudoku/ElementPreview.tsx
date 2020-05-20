import React, { useEffect, useState, ReactNode } from 'react';
import styled from 'styled-components';
import * as Cst from '../../constants';

type Props = {
  element: ElemCoord[];
};

type minmax = {
  x: number;
  y: number;
};

const Wrapper = styled.div`
  background-color: #ccc;
  position: relative;
  width: 100%;
  height: 125px;
`;

const PreviewGrid = styled.div<WrapperProps>`
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => props.width * 25}px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  ${(props) =>
    props.height ? `grid-template-rows: repeat(${props.height}, 1fr);` : null}
  grid-row-gap: 1px;
  grid-column-gap: 1px;
`;

const GridElement = styled.div<ElemCoord>`
  grid-column: ${(props) => props.x};
  grid-row: ${(props) => props.y};
  background-color: ${(props) => Cst.BLOCK_COLORS[props.val]};
  width: 25px;
  height: 25px;
`;

export const ElementPreview: React.FC<Props> = (props) => {
  const { element } = props;
  const [maxValues, setMaxValues] = useState<minmax>({ x: 0, y: 0 });
  const [minValues, setMinValues] = useState<minmax>({ x: 0, y: 0 });

  useEffect(() => {
    let min = { x: element[0].x, y: element[0].y };
    let max = { x: element[0].x, y: element[0].y };

    for (const elemCoord of element) {
      min = {
        x: elemCoord.x > min.x ? min.x : elemCoord.x,
        y: elemCoord.y > min.y ? min.y : elemCoord.y,
      };
      max = {
        x: elemCoord.x < min.x ? min.x : elemCoord.x,
        y: elemCoord.y < min.y ? min.y : elemCoord.y,
      };
    }

    setMinValues(min);
    setMaxValues(max);
  }, [element]);

  return (
    <Wrapper>
      <PreviewGrid
        width={maxValues.x - minValues.x + 1}
        height={maxValues.y - minValues.y + 1}
      >
        {element.map((elemCoord, i) => (
          <GridElement
            key={i}
            x={elemCoord.x - minValues.x + 1}
            y={elemCoord.y - minValues.y + 1}
            val={elemCoord.val}
          />
        ))}
      </PreviewGrid>
    </Wrapper>
  );
};
