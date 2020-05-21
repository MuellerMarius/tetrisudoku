import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import * as Cst from '../../constants';

type Props = {
  setHover: (x: number, y: number, element: ElemCoord[]) => void;
};

type minmax = {
  x: number;
  y: number;
};

const PreviewGrid = styled.div<WrapperProps>`
  margin-left: auto;
  margin-right: auto;
  width: ${({ width }) => width * 25}px;
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  ${({ height }) => height && `grid-template-rows: repeat(${height}, 1fr);`}
  grid-row-gap: 1px;
  grid-column-gap: 1px;
`;

const GridElement = styled.div<ElemCoord>`
  grid-column: ${({ x }) => x};
  grid-row: ${({ y }) => y};
  background-color: ${({ val }) => Cst.BLOCK_COLORS[val]};
  width: 25px;
  height: 25px;
`;

const randomElement = () => {
  return Cst.ELEMENTS[Math.floor(Math.random() * Cst.ELEMENTS.length)];
};

export const DragElement: React.FC<Props> = (props) => {
  const [element, setNextElement] = useState<ElemCoord[]>(randomElement());
  const [maxValues, setMaxValues] = useState<minmax>({ x: 0, y: 0 });
  const [minValues, setMinValues] = useState<minmax>({ x: 0, y: 0 });
  const [, drag] = useDrag({
    item: { type: Cst.TYPE_ELEMENT, element },
    end: (item, monitor) => {
      if (monitor.getDropResult()) {
        setNextElement(randomElement());
      }
      props.setHover(0, 0, []);
    },
  });

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
    <PreviewGrid
      width={maxValues.x - minValues.x + 1}
      height={maxValues.y - minValues.y + 1}
      ref={drag}
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
  );
};
