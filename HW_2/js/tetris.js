// will add object positions to the empty playground array

let playground = createPlayground();
console.log('Playground is created');
console.log(objects);

// eslint-disable-next-line require-jsdoc
function renderPositions() {
  console.log(objects);
  console.log(playground);
  objects.forEach( (object) => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type];
    });
  });
}

// function to move the object down
function moveDown() {
  console.log('moving down');
  // get current object
  const currentObject = getCurrentObject();
  console.log('current object = ', currentObject);

  const futurePosition = [];
  for (let i = 0; i < currentObject.position.length; i++) {
    futurePosition.push([currentObject.position[i][0] - 1, currentObject.position[i][1]]);
  }
  console.log('replacement to : ', futurePosition);
  const validness = validMove(futurePosition);
  console.log('Move valid = ', validness);
  if (validness === 1) {
    currentObject.position.forEach((position) => position[0] -= 1);
  } else if (!validness) {
    currentObject.state = STATIC;
    console.log('element is static.');
  }
  if ( currentObject.position.map((pos) => pos[0] === 0).filter((el) => el === true).length !== 0 ) {
    currentObject.state = STATIC;
    console.log('element is static.');
  }

  // 3. re-define clear playground
  playground = createPlayground();
  // 4. re-renderPositions
  renderPositions();
  // 5. re-renderPlayground
  renderPlayground();
}

// function to move the object right
function moveRight() {
  console.log('moving right');
  // get current object
  const currentObject = getCurrentObject();
  console.log('current object = ', currentObject);

  const futurePosition = [];
  for (let i = 0; i < (currentObject.position).length; i++) {
    futurePosition.push([currentObject.position[i][0], currentObject.position[i][1] + 1]);
  }
  console.log('replacement to : ', futurePosition);
  if (validMove(futurePosition) === 1) {
    (currentObject.position).forEach((position) => position[1] += 1);
  }

  // 3. re-define clear playground
  playground = createPlayground();
  // 4. re-renderPositions
  renderPositions();
  // 5. re-renderPlayground
  renderPlayground();
}

// function to move the object left
function moveLeft() {
  console.log('moving left');
  // get current object
  const currentObject = getCurrentObject();
  console.log('current object = ', currentObject);

  const futurePosition = [];
  for (let i = 0; i < (currentObject.position).length; i++) {
    futurePosition.push([currentObject.position[i][0], currentObject.position[i][1] - 1]);
  }
  console.log('replacement to : ', futurePosition);
  if (validMove(futurePosition) === 1) {
    (currentObject.position).forEach((position) => position[1] -= 1);
  }

  // 3. re-define clear playground
  playground = createPlayground();
  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPositions();
  renderPlayground();
}

// Pause the game while the button is pressed
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

// Stop the game
function stopTheGame() {
  clearInterval(gameInterval);
}

// Restart game while finish
function restartGame() {
  // interval
  gameInterval = setInterval(() => {
    if (gameStatusValue === PLAY_GAME_STATUS) {
      console.log('Action: generate new object.');
      // if we need => to generate new element
      newObj = generateObject();
      // null if we don't need it to be generated && if there is not enough space
      if (newObj !== null) {
        objects.push(newObj);
      }
      renderPositions();
      if (checkColumns() === 0) {
        stopTheGame();
        alert('Game Over');
      }
      moveDown();
      checkRows();
    }
  }, TIMEOUT);

  if (objects.length > 0) {
    objects.length = 0;
    playground = createPlayground();
    console.log('Playground is created');
  }
  console.log(playground);
  renderPlayground();
}

restartGame();
