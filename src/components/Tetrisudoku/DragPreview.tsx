import React, { useContext } from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import styled from 'styled-components';
import { GameContext } from './context/GameState';
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

const DragPreview: React.FC = () => {
  const { draggableElements } = useContext(GameContext);
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  // TODO: this line solves github issue #6
  if (
    !isDragging ||
    draggableElements.length === 0 ||
    typeof item.index === 'undefined'
  ) {
    return null;
  }

  return (
    <DragWrapper>
      <div style={getItemStyles(currentOffset)}>
        <div>
          <Element
            element={draggableElements[item.index]}
            isDragging={isDragging}
            isDragPreview
          />
        </div>
      </div>
    </DragWrapper>
  );
};

export default React.memo(DragPreview);
