import { getRandomDraggableElement } from './GameState';
import * as actionType from './actions';

export default (state: StateObject, action: ActionObject) => {
  switch (action.type) {
    case actionType.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case actionType.DROP:
      return {
        ...state,
        board: action.payload.board,
        draggableElements: state.draggableElements.map((elem, i) =>
          i === action.payload.droppedElementIndex
            ? getRandomDraggableElement()
            : elem
        ),
      };
    default:
      return state;
  }
};
