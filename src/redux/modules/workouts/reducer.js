import set from "lodash/fp/set";
import flow from "lodash/fp/flow";
import omit from "lodash/fp/omit";
import workouts from "../../../mocks/workouts";
import { actionTypes } from "./constants";

const INITIAL_STATE = {
  ids: workouts.map(({ id }) => id),
  byId: workouts.reduce(
    (acc, workout) => ({
      ...acc,
      [workout.id]: {
        ...workout,
        currentTrackId: null,
        isActive: false
      }
    }),
    {}
  )
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.ACTIVATE_WORKOUT: {
      const { workoutId, trackId } = action.payload;
      return flow(
        set(`byId[${workoutId}].currentTrackId`, trackId),
        set(`byId[${workoutId}].isActive`, true)
      )(state);
    }

    case actionTypes.PAUSE_WORKOUT: {
      const { workoutId } = action.payload;
      return set(`byId[${workoutId}].isActive`, false, state);
    }

    case actionTypes.REORDER_TRACKS: {
      const { workoutId, tracks } = action.payload;
      return set(`byId[${workoutId}].tracks`, tracks, state);
    }

    case actionTypes.CREATE_WORKOUT: {
      const workout = action.payload;

      return flow(
        set(`byId`, {
          ...state.byId,
          [workout.id]: workout
        }),
        set(`ids`, [...state.ids, workout.id])
      )(state);
    }

    case actionTypes.UPDATE_WORKOUT: {
      const { name, description, workoutId } = action.payload;
      return flow(
        set(`byId[${workoutId}].name`, name),
        set(`byId[${workoutId}].description`, description)
      )(state);
    }

    case actionTypes.CREATE_TRACK: {
      const { workoutId, track } = action.payload;

      return flow(
        set(`byId[${workoutId}].tracks.byId`, {
          ...state.byId[workoutId].tracks.byId,
          [track.id]: track
        }),
        set(`byId[${workoutId}].tracks.ids`, [
          ...state.byId[workoutId].tracks.ids,
          track.id
        ])
      )(state);
    }

    case actionTypes.UPDATE_TRACK: {
      const {
        name,
        description,
        timer,
        bpm,
        trackId,
        workoutId
      } = action.payload;
      return flow(
        set(`byId[${workoutId}].tracks.byId[${trackId}].name`, name),
        set(
          `byId[${workoutId}].tracks.byId[${trackId}].description`,
          description
        ),
        set(`byId[${workoutId}].tracks.byId[${trackId}].timer`, timer),
        set(`byId[${workoutId}].tracks.byId[${trackId}].bpm`, bpm)
      )(state);
    }

    case actionTypes.DELETE_TRACK: {
      const { trackId, workoutId } = action.payload;
      const workout = state.byId[workoutId];
      const newWorkout = {
        ...workout,
        tracks: {
          ids: workout.tracks.ids.filter(id => id !== trackId),
          byId: omit(trackId, workout.tracks.byId)
        }
      };

      return set(`byId[${workoutId}]`, newWorkout, state);
    }

    default: {
      return state;
    }
  }
}
