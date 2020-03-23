// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  console.log('moving down')
  // 1. get current object - done
  let currentObject = getCurrentObject();

  // 2. re-define objects - done
  console.log(objects)
  currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)));
  console.log(objects)
  
  // 3. re-define clear playground
  playground = createPlayground();

  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground()
}

function moveRight(obj) {
  console.log('moving right')
  let currentObject = getCurrentObject();
  console.log(currentObject);
}

function moveLeft(obj) {
  console.log('moving left')
  let currentObject = getCurrentObject();
  console.log(currentObject);
}

function pauseGame() {
  console.log('pausing the game')
  clearInterval(gameInterval);
}

// function createObj() {}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

// interval 1 second -
var gameInterval = setInterval(() => {
  if (gameStatusValue === PLAY_GAME_STATUS) {
    console.log("Action: generate new object.");
    // if we need => to generate new element
    newObj = generateObject();
    if (newObj !== null) {
      objects.push(newObj);
    }
    renderPositions();
    moveDown();
  }
}, TIMEOUT);

var playground = createPlayground();
console.log("Playground is created");

function restartGame() {
    if (objects.length > 0) {
      objects.length = 0;
      playground = createPlayground();
      console.log("Playground is created");
    }
    console.log(playground);
    renderPlayground();
}

restartGame();