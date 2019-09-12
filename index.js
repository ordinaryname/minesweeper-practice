const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let turn = 0;
let grid = {};

console.log('Welcome to Minesweeper!');

initGrid = () => {
  // Set up a 18 by 18 grid
  for(col = 0; col <= 18; col++) {
    for(row = 0; row <= 18; row++) {
      grid[col.toString() + '-' + row.toString()] = 0;
    }
  }
  console.log('Grid Initialized');
}

initGrid();

rl.question('Print Grid?', (answer) => {
  if(answer === 'yes'){
    let i = 0;
    for(square in grid) {
      process.stdout.write(square + ':' + grid[square].toString() + ' ');
      i++;
      if(i%10 == 0){
        console.log('');
      }
    }
  }
  rl.close();
});
