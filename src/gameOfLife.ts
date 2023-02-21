export function createGrid(width: number, height: number): boolean[][] {
  return new Array(height).fill(false).map(() => new Array(width).fill(false));
}

export function getCell(
  grid: boolean[][],
  xPosition: number,
  yPosition: number
) {
  return grid[xPosition][yPosition];
}

export function setCell(
  grid: boolean[][],
  xPosition: number,
  yPosition: number,
  value: boolean
) {
  grid[xPosition][yPosition] = value;
}

export function randomizeGrid(grid: boolean[][], randomValue: number) {
  let numRows = grid.length;
  let numCols = grid[0].length;

  for (let i = 0; i < numRows; i++) {
    grid.push(
      Array.from(Array(numCols), () =>
        Math.random() > randomValue ? true : false
      )
    );
  }
  return grid;
}

export function countNeighbors(
  grid: boolean[][],
  xPosition: number,
  yPosition: number
) {
  let count = 0;
  let numRows = grid.length;
  let numCols = grid[0].length;

  if (xPosition - 1 >= 0) {
    if (grid[xPosition - 1][yPosition] == true) count++;
  }
  if (xPosition - 1 >= 0 && yPosition - 1 >= 0) {
    if (grid[xPosition - 1][yPosition - 1] == true) count++;
  }
  if (xPosition - 1 >= 0 && yPosition + 1 < numCols) {
    if (grid[xPosition - 1][yPosition + 1] == true) count++;
  }
  if (yPosition - 1 >= 0) {
    if (grid[xPosition][yPosition - 1] == true) count++;
  }
  if (yPosition + 1 < numCols) {
    if (grid[xPosition][yPosition + 1] == true) count++;
  }
  if (xPosition + 1 < numRows) {
    if (grid[xPosition + 1][yPosition] == true) count++;
  }
  if (xPosition + 1 < numRows && yPosition - 1 >= 0) {
    if (grid[xPosition + 1][yPosition - 1] == true) count++;
  }
  if (xPosition + 1 < numRows && yPosition + 1 < numCols) {
    if (grid[xPosition + 1][yPosition + 1] == true) count++;
  }
  return count;
}

// RULES
// ------------
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
// =
// Any live cell with two or three live neighbours survives.
// Any dead cell with three live neighbours becomes a live cell.
// All other live cells die in the next generation. Similarly, all other dead cells stay dead.

export function applyRules(
  grid: boolean[][],
  xPosition: number,
  yPosition: number
) {
  let nextGrid: boolean[][] = [];
  let numNeighbors = countNeighbors(grid, xPosition, yPosition);
  if (grid[xPosition][yPosition] == true) {
    if (numNeighbors < 2) {
      grid[xPosition][yPosition] = false;
    } else if (numNeighbors == 2 || numNeighbors == 3) {
      grid[xPosition][yPosition] = true;
    } else if (numNeighbors > 3) {
      grid[xPosition][yPosition] = false;
    }
  } else if (grid[xPosition][yPosition] == false) {
    if (numNeighbors == 3) {
      grid[xPosition][yPosition] = true;
    }
  }
  return nextGrid;
}

export function computeNextGen(grid: boolean[][]) {
  let rows = grid.length;
  let cols = grid[0].length;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      applyRules(grid, i, j);
    }
  }
}
