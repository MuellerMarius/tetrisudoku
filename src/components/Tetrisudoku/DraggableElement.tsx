import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Element from './Element';
import * as Cst from '../../constants';

const DraggableElement: React.FC<DraggableElementProps> = (props) => {
  const { element, index, setHover } = props;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: Cst.TYPE_ELEMENT, index },
    end: () => {
      setHover(0, 0, -1);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Element element={element} drag={drag} isDragging={isDragging} />;
};

DraggableElement.propTypes = {
  element: PropTypes.arrayOf(
    PropTypes.exact({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      val: PropTypes.number.isRequired,
    }),
  ).isRequired,
  index: PropTypes.number.isRequired,
  setHover: PropTypes.func.isRequired,
};

export default React.memo(DraggableElement);
