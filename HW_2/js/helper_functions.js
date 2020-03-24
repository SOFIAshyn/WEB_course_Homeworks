// get the value of the first element in the array with the condition
const getCurrentObject = () => objects.find((object) => object.state === 'falling');
const createPlayground = () => (new Array(10).fill().map((el) => (new Array(5).fill())));

// change game status button
function modifyGameStatusText() {
  const gameControlStatus = document.getElementById('game-control');
  const currentText = gameControlStatus.textContent;
  if (currentText === START_TEXT || currentText === CONTINUE_TEXT) {
    gameControlStatus.firstChild.nodeValue = PAUSE_TEXT;
    gameStatusValue = PLAY_GAME_STATUS;
  } else if (currentText === PAUSE_TEXT) {
    gameControlStatus.firstChild.nodeValue = CONTINUE_TEXT;
    gameStatusValue = PAUSE_GAME_STATUS;
  }
}

const controlBox = document.getElementById('control-box');
controlBox.addEventListener('click', function() {
  modifyGameStatusText();
}, false);

const restartButton = document.getElementById('finish');
restartButton.addEventListener('click', function() {
  document.getElementById('game-control').firstChild.nodeValue = START_TEXT;
  restartGame();
}, false);

// general need functions
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// new object generator
function generateObject() {
  if (!(// no objects inside
    objects.length === 0 ||
      // all static => new obj
      objects.map((object) => object.state === STATIC).filter((objBoolean) => objBoolean === false).length === 0)) {
    console.log(objects.map((object) => object.state === STATIC).filter((objBoolean) => objBoolean === false));
    console.log('********************************');
    console.log('No need to generate new object. Objects: ', objects);
    return null;
  }

  const numArrayOfColors = [0, 1, 2];
  const numberOfKey = randomChoice(numArrayOfColors);
  newObjType = Object.keys(TYPE_COLORS)[numberOfKey];
  const newObj = {
    type: newObjType,
    state: FALLING,
    position: generatePosition(newObjType),
  };
  colorState++;
  console.log('Generated new object = ', newObj.type, ' in position: ', newObj.position);
  return newObj;
}

// newObject position generator
function generatePosition(objType) {
  console.log('generatePosition , obj Type = ', objType);
  let rotatedObj = rotateObjectToBeValidForPosition(objType);
  console.log('rotated Type = ', validMove(rotatedObj));
  while (validMove(rotatedObj) === 0 &&
        rotatedObj.map((el) => el[0]).filter((y) => y < 6).length === 0
  ) {
    rotatedObj = rotateObjectToBeValidForPosition(objType);
    console.log('bad rotated Type = ', rotatedObj);
  }
  console.log('good rotated Type = ', rotatedObj);
  return rotatedObj;
}

// set random rotation on the object
function rotateObjectToBeValidForPosition(objectType) {
  // generate array with a number of all possible rotations
  const numArrayOfRotationStates = [0, 1, 2, 3];
  const num = randomChoice(numArrayOfRotationStates);
  const positionRotationState = arrayOfAllObjectPositions[num];

  const arrayXPositions = positionRotationState[objectType].map((eachCellPosition) => eachCellPosition[1]);
  console.log('Base positions of x = ', arrayXPositions);

  const xRightPositionLimit = Math.max(...arrayXPositions);
  const xLeftPositionLimit = Math.min(...arrayXPositions);
  const rangeXPosition = [0 - xLeftPositionLimit, WIDTH - 1 - xRightPositionLimit];
  console.log('Range of x position for particular figure = ', rangeXPosition);
  for (let i = rangeXPosition[0] + 1; i < rangeXPosition[1]; i++) {
    rangeXPosition.push(i);
  }

  const xPosition = randomChoice(rangeXPosition);
  console.log('Object not rotated = ', positionRotationState[objectType], 'should be added position = ', xPosition);
  for (let i = 0; i < positionRotationState[objectType].length; i++) {
    positionRotationState[objectType][i][1] += xPosition;
  }
  console.log('Object rotated = ', positionRotationState[objectType]);
  return positionRotationState[objectType];
}

// function to get static positions
function getStaticPositions() {
  let allStaticPositions = [];
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].state === STATIC) {
      allStaticPositions.push(objects[i].position);
    }
  }
  allStaticPositions = allStaticPositions.flat();
  return allStaticPositions;
}

// control of objects
// get information if the move that we want to do is valid
function validMove(moveCoordinates) {
  const allStaticPositions = getStaticPositions();

  for (let i = 0; i < moveCoordinates.length; i++) {
    // console.log("Static positions: ", allStaticPositions, " our pos = ", moveCoordinates[i]);
    if ( allStaticPositions.
        map((el) => el[0] === (moveCoordinates[i][0]) &&
                    el[1] === moveCoordinates[i][1]).
        filter((el) => el === true).length !== 0) {
      console.log('position is not valid: ', moveCoordinates[i]);
      return 0;
    }
    if ( moveCoordinates[i][1] < 0 || moveCoordinates[i][1] > WIDTH - 1 ||
            moveCoordinates[i][0] < 0 || moveCoordinates[i][0] > HEIGHT - 1) {
      console.log('position is out of boundaries: ', moveCoordinates[i]);
      return 2;
    }
  }
  console.log('position is valid: ', moveCoordinates);
  return 1;
}

// game over, clear rows
// checks if any row if full, to delete elements from there
function checkRows() {
  const allStaticPositions = getStaticPositions();

  for (let i = 0; i < WIDTH; i++) {
    if (allStaticPositions.map((el) => el[0]).filter((xCoord) => xCoord === i).length === WIDTH) {
      for (let obj = 0; obj < objects.length; obj++) {
        for (let coord = 0; coord < objects[obj].position.length; coord++ ) {
          console.log(allStaticPositions.map((el) => el[0]).filter((xCoord) => xCoord === i).length);
          console.log('----------------------- = ', objects[obj].position[coord][0]);
          objects[obj].position = objects[obj].position.filter((pos_el) => pos_el[0] !== i);
        }
      }
    }
  }

  objects = objects.filter((obj) => obj.position.length !== 0);
}

// checks if any column if full, to set game over
function checkColumns() {
  const allStaticPositions = getStaticPositions();

  for (let i = 0; i < WIDTH; i++) {
    if (allStaticPositions.map((el) => el[1]).filter((xCoord) => xCoord === i).length === HEIGHT) {
      return 0;
    }
  }
  return 1;
}
