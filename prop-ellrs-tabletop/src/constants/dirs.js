// dir objects that will determine where robot will face if left or right is clicked
// from a starting direction

export const NORTH = 'North';
export const EAST = 'East';
export const SOUTH = 'South';
export const WEST = 'West';

export const dirs = {
    'North': {
      xStep: 0,
      yStep: 1,
      name: NORTH,
      right: EAST,
      left: WEST
    },
    'East': {
      xStep: 1,
      yStep: 0,
      name: EAST,
      right: SOUTH,
      left: NORTH
    },
    'South': {
      xStep: 0,
      yStep: -1,
      name: SOUTH,
      right: EAST,
      left: WEST
    },
    'West': {
      xStep: -1,
      yStep: 0,
      name: WEST,
      right: NORTH,
      left: SOUTH
    },
  }
