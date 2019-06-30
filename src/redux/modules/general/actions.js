import { actionTypes } from "./constants";

export function openModal({ modal, meta }) {
  return {
    type: actionTypes.OPEN_MODAL,
    payload: {
      modal,
      meta
    }
  };
}

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL
  };
}
