import { actionTypes } from './constants';
import uuid from 'uuid';
import { getTracksList } from './selectors';

export function nextWorkout(workoutId, currentTrackId) {
  return (dispatch, getState) => {
    const { workouts } = getState();
    const tracks = workouts.byId[workoutId].tracks;
    const currentTrack = tracks.byId[currentTrackId];
    const tracksList = getTracksList(workouts.byId[workoutId]);
    const nextTrack = tracksList.find(
      ({ order }) => order === currentTrack.order + 1
    );

    if (nextTrack) {
      dispatch(activateWorkout(workoutId, nextTrack.id));
    } else {
      dispatch(pauseWorkout(workoutId));
    }
  };
}

export function activateWorkout(workoutId, trackId) {
  return {
    type: actionTypes.ACTIVATE_WORKOUT,
    payload: {
      workoutId,
      trackId
    }
  };
}

export function pauseWorkout(workoutId) {
  return {
    type: actionTypes.PAUSE_WORKOUT,
    payload: {
      workoutId
    }
  };
}

export function reorderTracks(workoutId, tracks) {
  return {
    type: actionTypes.REORDER_TRACKS,
    payload: {
      workoutId,
      tracks
    }
  };
}

export function createWorkout(values) {
  return dispatch => {
    const workout = {
      id: uuid.v4(),
      ...values,
      tracks: {
        byId: {},
        ids: []
      }
    };
    dispatch({
      type: actionTypes.CREATE_WORKOUT,
      payload: workout
    });

    return workout;
  };
}

export function updateWorkout(workoutId, fields) {
  return {
    type: actionTypes.UPDATE_WORKOUT,
    payload: {
      workoutId,
      ...fields
    }
  };
}

export function createTrack(workoutId, values) {
  return (dispatch, getState) => {
    const { workouts } = getState();
    const tracks = workouts.byId[workoutId].tracks;

    const track = {
      id: uuid.v4(),
      ...values,
      order: tracks.ids.length + 1
    };
    dispatch({
      type: actionTypes.CREATE_TRACK,
      payload: {
        workoutId,
        track
      }
    });
  };
}

export function updateTrack(workoutId, trackId, fields) {
  return {
    type: actionTypes.UPDATE_TRACK,
    payload: {
      workoutId,
      trackId,
      ...fields
    }
  };
}

export function deleteTrack(workoutId, trackId) {
  return {
    type: actionTypes.DELETE_TRACK,
    payload: {
      workoutId,
      trackId
    }
  };
}
