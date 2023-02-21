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
