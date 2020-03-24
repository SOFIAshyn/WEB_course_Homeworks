// will add object positions to the empty playground array

var playground = createPlayground();
console.log("Playground is created");
console.log(objects)

function renderPositions() {
  console.log(objects);
  console.log(playground);
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  console.log('moving down');
  // get current object
  let currentObject = getCurrentObject();
  console.log('current object = ', currentObject);

  let futurePosition = [];
  for (let i = 0; i < currentObject.position.length; i++) {
    futurePosition.push([currentObject.position[i][0] - 1, currentObject.position[i][1]])
  }
  console.log('replacement to : ', futurePosition);
  let validness = validMove(futurePosition);
  console.log("XXX = ", validness)
  if (validness === 1) {
      currentObject.position.forEach(position => position[0] -= 1);
  } else if (!validness) {
      currentObject.state = STATIC;
      console.log("element is static.");
  }
  if ( currentObject.position.map(pos => pos[0] === 0).filter(el => el === true).length !== 0 ) {
    currentObject.state = STATIC;
    console.log("element is static.");
  }

  // 3. re-define clear playground
  playground = createPlayground();
  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground();
  renderPositions();

}

function moveRight(obj) {
  console.log('moving right');
  // get current object
  let currentObject = getCurrentObject();
  console.log('current object = ', currentObject);

  let futurePosition = [];
  for (let i = 0; i < (currentObject.position).length; i++) {
    futurePosition.push([currentObject.position[i][0], currentObject.position[i][1] + 1])
  }
  console.log('replacement to : ', futurePosition);
  if (validMove(futurePosition) === 1) {
    (currentObject.position).forEach(position => position[1] += 1);
  }

  // 3. re-define clear playground
  playground = createPlayground();
  renderPlayground();
  // 4. re-renderPositions
  renderPositions();
  // 5. re-renderPlayground
}

function moveLeft(obj) {
  console.log('moving left');
  // get current object
  let currentObject = getCurrentObject();
  console.log('current object = ', currentObject);

  let futurePosition = [];
  for (let i = 0; i < (currentObject.position).length; i++) {
    futurePosition.push([currentObject.position[i][0], currentObject.position[i][1] - 1])
  }
  console.log('replacement to : ', futurePosition);
  if (validMove(futurePosition) === 1) {
    (currentObject.position).forEach(position => position[1] -= 1);
  }

  // 3. re-define clear playground
  playground = createPlayground();
  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground();
  renderPositions();
}

function pauseGame() {
  console.log('pausing the game');
  clearInterval(gameInterval);
}

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
    // null if we don't need it to be generated && if there is not enough space
    if (newObj !== null) {
      objects.push(newObj);
    }
    renderPositions();
    moveDown();
  }
}, TIMEOUT);


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