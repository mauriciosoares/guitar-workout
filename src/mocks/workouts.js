import { byId } from '../shared/utils';

export default [
  {
    id: '3d95296b-b13a-49c8-aa08-5f2e6e92408d',
    name: 'Morning Workout',
    description: 'Some stuff in the morning',
    tracks: byId([
      {
        id: '4a281cb4-9e55-46fb-9356-496600092ec3',
        name: '4 fingers chromatic',
        description: 'DESCRIPTION: 4 fingers chromatic',
        bpm: 100,
        timer: 5,
        order: 0
      },
      {
        id: 'e44908c4-11bd-47dd-b409-c516d8bb54b1',
        name: '3 fingers chromatic / 1',
        description: 'DESCRIPTION: 3 fingers chromatic / 1',
        bpm: 130,
        timer: 5,
        order: 1
      },
      {
        id: '6d26c72e-bb8e-4ccc-a4c2-7d9841e3d6e6',
        name: '3 fingers chromatic / 2',
        description: 'DESCRIPTION: 3 fingers chromatic / 2',
        bpm: 130,
        timer: 5,
        order: 2
      }
    ])
  }
];
