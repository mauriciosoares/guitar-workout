import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { actionTypes } from './constants';

const INITIAL_STATE = {
  modal: {
    opened: null,
    meta: null
  }
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL: {
      const { modal, meta } = action.payload;

      return flow(
        set('modal.opened', modal),
        set('modal.meta', meta)
      )(state);
    }

    case actionTypes.CLOSE_MODAL: {
      return flow(
        set('modal.opened', null),
        set('modal.meta', null)
      )(state);
    }

    default: {
      return state;
    }
  }
}
