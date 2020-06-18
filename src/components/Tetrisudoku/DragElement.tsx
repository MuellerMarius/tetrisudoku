import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Element from './Element';
import * as Cst from '../../constants';

//
// Types
//

type Props = {
  index: number;
  element: ElemCoord[];
  setHover: (x: number, y: number, index: number) => void;
};

//
// Functions
//

const DragElement: React.FC<Props> = (props) => {
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
  }, []);

  return <Element element={element} drag={drag} isDragging={isDragging} />;
};

DragElement.propTypes = {
  element: PropTypes.array.isRequired,
  setHover: PropTypes.func.isRequired,
};

export default React.memo(DragElement);
