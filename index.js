const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let turn = 0;
let grid = {};
let mineCount = 0;
let flagsPlanted = 0;
let flags = {};
let gameOver = false;

console.log('Welcome to Minesweeper!');

initGrid = () => {
  // Set up a 18 by 18 grid
  for(col = 0; col <= 9; col++) {
    for(row = 0; row <= 9; row++) {
      grid[col.toString() + ',' + row.toString()] = '0';
    }
  }
  generateMines();
  console.log(`Grid Initialized. You have ${mineCount} flags.`);
  printGrid();
}

generateMines = () => {
  for(i = 0; i < 13; i++) {
    let col = Math.floor(Math.random() * 10);
    let row = Math.floor(Math.random() * 10);
    if(grid[col.toString() + ',' + row.toString()] !== '*') {
      grid[col.toString() + ',' + row.toString()] = '*';
      mineCount++;
    }
  }
}

printGrid = () => {
  let i = 0;
  for(square in grid) {
    /*
    if(grid[square] != '*') {
      process.stdout.write(square + ':' + grid[square].toString() + ' ');
    } else {
      process.stdout.write(square + ':' + '0 ');
    }
    */
    process.stdout.write(square + ':' + grid[square].toString() + ' ');
    i++;
    if(i%10 == 0){
      console.log('');
    }
  }
}

initGrid();
console.log('Select a square and plant a flag (0,0 -f) or clear the square (0,0 -c): ');

rl.on('line', (answer) => {
  if(grid[answer.substring(0,3)]){
    if(answer.substring(5,6).toLowerCase() === 'c') {
      if(grid[answer.substring(0,3)] === '*') {
        gameOver = true;
        console.log('You have selected a mine. Game Over.');
      } else {
        grid[answer.substring(0,3)] = answer.substring(5,6).toLowerCase();
      }
    } else if(answer.substring(5,6).toLowerCase() === 'f') {
      if(grid[answer.substring(0,3)] !== 'f') {
        //Save original grid square's value and then place a flag
        flags[answer.substring(0,3)] = grid[answer.substring(0,3)];
        grid[answer.substring(0,3)] = answer.substring(5,6).toLowerCase();
      } else {
        grid[answer.substring(0,3)] = flags[answer.substring(0,3)];
        delete flags[answer.substring(0,3)];
      }
    } else {
      console.log('Option not recognized!');
    }

  }
  printGrid();
  if(gameOver == true) {
    rl.close();
  } else {
    console.log('Select a square and plant a flag (0,0 -f) or clear the square (0,0 -c): ');
  }
});
