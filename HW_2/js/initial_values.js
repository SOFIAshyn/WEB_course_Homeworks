const objects = [
  // {
  //   type: 'L',
  //   state: 'falling',
  //   position: [[9, 1], [8, 1], [8, 2], [8, 3]]
  // }, {
  //   type: 'T',
  //   state: 'static',
  //   position: [[3, 2], [3, 3], [3, 4], [2, 3]]
  // }, {
  //   type: 'L',
  //   state: 'static',
  //   position: [[2, 0], [1, 0], [0, 0], [0, 1]]
  // }, {
  //   type: 'I',
  //   state: 'static',
  //   position: [[2, 2], [1, 2], [0, 2]]
  // }
];

let gameInterval;

// Status Game:
const gameStatusValue = PAUSE_GAME_STATUS;

const colorState = 0;

// to save newly generated object
let newObj;
let newObjType;

const INITIAL_POSITIONS = {
  'L': [[9, 0],
    [8, 0],
    [8, 1],
    [8, 2]], // |__
  'T': [[9, -1],
    [9, 0],
    [9, 1],
    [8, 0]],
  'I': [[9, 0],
    [9, 1],
    [9, 2]],
};

const ROTATE_180_POSITIONS = {
  'L': [[8, 0],
    [9, 0],
    [9, -1],
    [9, -2]],
  'T': [[8, -1],
    [8, 0],
    [8, 1],
    [9, 0]],
  'I': [[9, 0],
    [9, 1],
    [9, 2]],
};

const VERT_INITIAL_POSITIONS = {
  'L': [[7, 0],
    [7, -1],
    [8, -1],
    [9, -1]], // |_
  'T': [[7, -1],
    [8, -1],
    [9, -1],
    [8, 0]],
  'I': [[9, 0],
    [8, 0],
    [7, 0]],
};

const VERT_180_INITIAL_POSITIONS = {
  'L': [[7, 0],
    [7, 1],
    [8, 1],
    [9, 1]],
  'T': [[7, 1],
    [8, 1],
    [9, 1],
    [8, 1]],
  'I': [[9, 0],
    [8, 0],
    [7, 0]],
};

const arrayOfAllObjectPositions = [INITIAL_POSITIONS, ROTATE_180_POSITIONS,
  VERT_INITIAL_POSITIONS, VERT_180_INITIAL_POSITIONS];
