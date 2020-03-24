// get the value of the first element in the array with the condition
var getCurrentObject = () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map(el => (new Array(5).fill())));

// change game status button
function modifyGameStatusText() {
    const gameControlStatus = document.getElementById("game-control");
    const currentText = gameControlStatus.textContent;
    if (currentText === START_TEXT || currentText === CONTINUE_TEXT) {
        gameControlStatus.firstChild.nodeValue = PAUSE_TEXT;
        gameStatusValue = PLAY_GAME_STATUS;
    } else if (currentText === PAUSE_TEXT) {
        gameControlStatus.firstChild.nodeValue = CONTINUE_TEXT;
        gameStatusValue = PAUSE_GAME_STATUS;
    }
}

const controlBox = document.getElementById("control-box");
controlBox.addEventListener("click", function () {
    modifyGameStatusText();
}, false);

const restartButton = document.getElementById("finish");
restartButton.addEventListener("click", function () {
    document.getElementById("game-control").firstChild.nodeValue = START_TEXT;
    restartGame();
}, false);

// general need functions
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// newObj generator
function generateObject() {
  if (!(// no objects inside
      objects.length === 0 ||
      // all static => new obj
      objects.map(object => object.state === STATIC).filter(objBoolean => objBoolean === false).length === 0)) {
      console.log(objects.map(object => object.state === STATIC).filter(objBoolean => objBoolean === false))
      console.log("********************************")
      console.log("No need to generate new object. Objects: ", objects);
    return null;
  }

  var numArrayOfColors = [0, 1, 2];
  let numberOfKey = randomChoice(numArrayOfColors);
  newObjType = Object.keys(TYPE_COLORS)[numberOfKey];
  var newObj = {
    type: newObjType,
    state: FALLING,
    position: generatePosition(newObjType),
  };
  colorState++;
  console.log("Generated new object = ", newObj.type, " in position: ", newObj.position);
  return newObj;
}

// newObject position generator
function generatePosition(objType) {
    console.log("generatePosition , obj Type = ", objType);
    return rotateObjectToBeValidForPosition(objType);
}

function rotateObjectToBeValidForPosition(objectType) {
    // generate array with a number of all possible rotations
    var numArrayOfRotationStates = [0, 1, 2, 3];
    let num = randomChoice(numArrayOfRotationStates);
    let positionRotationState = arrayOfAllObjectPositions[num];

    const arrayXPositions = positionRotationState[objectType].map(eachCellPosition => eachCellPosition[1]);
    console.log("Base positions of x = ", arrayXPositions);

    let xRightPositionLimit = Math.max(...arrayXPositions);
    let xLeftPositionLimit = Math.min(...arrayXPositions);
    let rangeXPosition = [0 - xLeftPositionLimit, WIDTH - 1 - xRightPositionLimit];
    console.log("Range of x position for particular figure = ", rangeXPosition);
    for (let i = rangeXPosition[0] + 1; i < rangeXPosition[1]; i++)
        rangeXPosition.push(i);

    let xPosition = randomChoice(rangeXPosition);
    console.log("Object not rotated = ", positionRotationState[objectType], "should be added position = ", xPosition);
    for (let i = 0; i < positionRotationState[objectType].length; i++) {
        positionRotationState[objectType][i][1] += xPosition;
    }
    console.log("Object rotated = ", positionRotationState[objectType]);
    return positionRotationState[objectType];
}

// control of objects
function validMove(moveCoordinates) {
    let allStaticPositions = [];
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].state === STATIC) {
            allStaticPositions.push(objects[i].position)
        }
    }
    allStaticPositions = allStaticPositions.flat();
    console.log("@#$%^&*()_(*&^%$#@!#$%^&*()*&^%$#@!#$%^&*()_(*&^%$#@!#$%^&*(");

    for (let i = 0; i < moveCoordinates.length; i++) {
        console.log("Static positions: ", allStaticPositions, " our pos = ", moveCoordinates[i]);
        if ( allStaticPositions.
            map(el => el[0] === (moveCoordinates[i][0])
                    && el[1] === moveCoordinates[i][1]).
            filter(el => el === true).length !== 0) {
            console.log("position is not valid: ", moveCoordinates[i]);
            return 0;
        }
        if ( moveCoordinates[i][1] < 0 || moveCoordinates[i][1] > WIDTH - 1
            || moveCoordinates[i][0] < 0 || moveCoordinates[i][0] > HEIGHT - 1) {
            console.log("position is out of boundaries: ", moveCoordinates[i]);
            return 2;
        }
    }
    console.log("position is valid: ", moveCoordinates);
    return 1;
}
