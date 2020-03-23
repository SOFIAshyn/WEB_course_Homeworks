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
    console.log(objType);
    return rotateObjectToBeValidForPosition(objType);
}

function rotateObjectToBeValidForPosition(objectType) {
    console.log("we are here");
    let positionRotationState = randomChoice(arrayOfAllObjectPositions);
    console.log(positionRotationState, " = positionRotationState")
    let arrayXPositions = positionRotationState[objectType].map(eachCellPosition => eachCellPosition[1]);
    let xRightPositionLimit = Math.max(...arrayXPositions);
    let xLeftPositionLimit = Math.min(...arrayXPositions);
    let rangeXPosition = [0 - xLeftPositionLimit, WIDTH - xRightPositionLimit];
    console.log("fghjkl", rangeXPosition);
    for (let i = rangeXPosition[0] + 1; i < rangeXPosition[1]; i++)
        rangeXPosition.push(i);
    var xPosition = randomChoice(rangeXPosition);
    positionRotationState[objectType].map(coordinates => coordinates[2] += xPosition);
    console.log("Object rotation, state = ", positionRotationState[objectType], ", position = ", xPosition)
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