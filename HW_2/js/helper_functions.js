// get the value of the first element in the array with the condition
var getCurrentObject = () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map( el => (new Array(5).fill())));

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
      objects.map(object => object.state === STATIC).filter(objBoolean => objBoolean === false) === [])) {
      console.log("No need to generate new object.");
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
  console.log("Generated new object = ", newObj.type, " in position: ", newObj.position)
  return newObj;
}

// newObject position generator
function generatePosition(objType) {
    // position for left top cell of object
    // objL = Object.keys(TYPE_COLORS)[0];
    // objT = Object.keys(TYPE_COLORS)[1];
    // objI = Object.keys(TYPE_COLORS)[2];
    // if (objType === objL){
    //     return rotateObjectToBeValidForPosition(objL);
    // }
    // if (objType === objT){
    //     return rotateObjectToBeValidForPosition(objT);
    // }
    // if (objType === objI){
    //     return rotateObjectToBeValidForPosition(objI);
    // }
    console.log("generatePosition , obj Type = ", objType);
    return rotateObjectToBeValidForPosition(objType);
}

function rotateObjectToBeValidForPosition(objectType) {
    // generate array with a number of all possible rotations
  var numArrayOfRotationStates = [0, 1, 2, 3];
    let num = randomChoice(numArrayOfRotationStates);
    let positionRotationState = arrayOfAllObjectPositions[num];

    console.log(positionRotationState[objectType], " = positionRotationState[objectType]")
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
        console.log("positionRotationState[objectType][i] = ", positionRotationState[objectType][i][1])
        positionRotationState[objectType][i][1] += xPosition;
    }
    // let  = positionRotationState[objectType].map(coordinates => coordinates[2] += xPosition);
    console.log("Object rotated = ", positionRotationState[objectType], ", position = ", xPosition);
    return positionRotationState[objectType];
}

// function rotateLObjectToBeValidForPosition(position) {
//
// }
//
// function rotateTObjectToBeValidForPosition(position) {
//
// }
//
// function rotateIObjectToBeValidForPosition(position) {
//
// }