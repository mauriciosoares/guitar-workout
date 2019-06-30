import { createSelector } from "reselect";

function getWorkouts(state) {
  return state.workouts;
}

export const getWorkoutsList = createSelector(
  getWorkouts,
  workouts => workouts.ids.map(id => workouts.byId[id])
);

function getTracks(workout) {
  return workout.tracks;
}

export const getTracksList = createSelector(
  getTracks,
  tracks => tracks.ids.map(id => tracks.byId[id])
);
