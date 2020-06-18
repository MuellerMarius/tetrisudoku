import React from 'react';
import PropTypes from 'prop-types';
import { XYCoord, useDragLayer } from 'react-dnd';
import styled from 'styled-components';
import Element from './Element';

const DragWrapper = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

function getItemStyles(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

type CustomDragLayerProps = {
  elements: ElemCoord[][];
};

const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || props.elements.length === 0) {
    return null;
  }
  return (
    <DragWrapper>
      <div style={getItemStyles(currentOffset)}>
        <div>
          <Element
            element={props.elements[item.index]}
            isDragging={isDragging}
            isDragPreview
          />
        </div>
      </div>
    </DragWrapper>
  );
};

CustomDragLayer.propTypes = {
  elements: PropTypes.array.isRequired,
};

export default React.memo(CustomDragLayer);
