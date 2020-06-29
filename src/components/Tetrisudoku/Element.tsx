import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragElementWrapper, DragSourceOptions } from 'react-dnd';
import * as Cst from '../../constants';

//
// Types
//

type ElementProps = {
  element: ElemCoord[];
  isDragging: boolean;
  drag?: DragElementWrapper<DragSourceOptions>;
  isDragPreview?: boolean;
};

type MinMax = {
  x: number;
  y: number;
};

type GridProps = WrapperProps & {
  isDragPreview?: boolean;
  center: MinMax;
};

type GridElementProps = ElemCoord & {
  isDragging: boolean;
};

//
// Styles
//

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-row-gap: 1px;
  grid-column-gap: 1px;
  margin: auto;
`;

const DragGrid = styled(Grid)`
  position: relative;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  margin: inherit;

  left: ${({ center }) => center.x * Cst.PREV_ELEMENT_BLOCK_SIZE['xlarge']}px;
  top: ${({ center }) => center.y * Cst.PREV_ELEMENT_BLOCK_SIZE['xlarge']}px;
  width: ${({ width }) => width * Cst.PREV_ELEMENT_BLOCK_SIZE['xlarge']}px;

  @media (max-width: 1200px) {
    left: ${({ center }) => center.x * Cst.PREV_ELEMENT_BLOCK_SIZE['large']}px;
    top: ${({ center }) => center.y * Cst.PREV_ELEMENT_BLOCK_SIZE['large']}px;
    width: ${({ width }) => width * Cst.PREV_ELEMENT_BLOCK_SIZE['large']}px;
  }

  @media (max-width: 992px) {
    left: ${({ center }) => center.x * Cst.PREV_ELEMENT_BLOCK_SIZE['medium']}px;
    top: ${({ center }) => center.y * Cst.PREV_ELEMENT_BLOCK_SIZE['medium']}px;
    width: ${({ width }) => width * Cst.PREV_ELEMENT_BLOCK_SIZE['medium']}px;
  }

  @media (max-width: 576px) {
    left: ${({ center }) => center.x * Cst.PREV_ELEMENT_BLOCK_SIZE['small']}px;
    top: ${({ center }) => center.y * Cst.PREV_ELEMENT_BLOCK_SIZE['small']}px;
    width: ${({ width }) => width * Cst.PREV_ELEMENT_BLOCK_SIZE['small']}px;
  }
`;

const GridElement = styled.div<GridElementProps>`
  transform: translateZ(0);
  grid-column: ${({ x }) => x};
  grid-row: ${({ y }) => y};
  background-color: ${({ val }) => Cst.BLOCK_COLORS[val]};
  padding-top: 100%;
  opacity: ${({ isDragging }) => (isDragging ? 0.3 : 1)};
  transition: opacity 0.2s ease-in-out;
  width: 40px;

  @media (max-width: 1200px) {
    width: 25px;
  }
`;

const DragGridElement = styled(GridElement)`
  opacity: 1;
  width: ${Cst.PREV_ELEMENT_BLOCK_SIZE['xlarge']}px;

  @media (max-width: 1200px) {
    width: ${Cst.PREV_ELEMENT_BLOCK_SIZE['large']}px;
  }

  @media (max-width: 992px) {
    width: ${Cst.PREV_ELEMENT_BLOCK_SIZE['medium']}px;
  }

  @media (max-width: 576px) {
    width: ${Cst.PREV_ELEMENT_BLOCK_SIZE['small']}px;
  }
`;

//
// Functions
//

const DragElement: React.FC<ElementProps> = (props) => {
  const { element, drag, isDragging, isDragPreview } = props;
  const [maxValues, setMaxValues] = useState<MinMax>({ x: 0, y: 0 });
  const [minValues, setMinValues] = useState<MinMax>({ x: 0, y: 0 });

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

  return isDragPreview ? (
    <DragGrid width={maxValues.x - minValues.x + 1} center={minValues}>
      {element.map((elemCoord, i) => (
        <DragGridElement
          key={i}
          x={elemCoord.x - minValues.x + 1}
          y={elemCoord.y - minValues.y + 1}
          val={elemCoord.val}
          isDragging={isDragging}
        />
      ))}
    </DragGrid>
  ) : (
    <Grid
      width={maxValues.x - minValues.x + 1}
      isDragPreview={isDragPreview}
      center={minValues}
      ref={drag}
    >
      {element.map((elemCoord, i) => (
        <GridElement
          key={i}
          x={elemCoord.x - minValues.x + 1}
          y={elemCoord.y - minValues.y + 1}
          val={elemCoord.val}
          isDragging={isDragging}
        />
      ))}
    </Grid>
  );
};

DragElement.propTypes = {
  element: PropTypes.array.isRequired,
  isDragging: PropTypes.bool.isRequired,
  drag: PropTypes.func,
  isDragPreview: PropTypes.bool,
};

export default React.memo(DragElement);
