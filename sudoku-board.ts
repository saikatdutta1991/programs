interface SubgridBoundary {
  row: {
    min: number;
    max: number;
  };
  col: {
    min: number;
    max: number;
  };
}

class SudokuSolver {
  public board: Array<Array<number>>;
  private solution: Array<Array<number>>;

  private readonly MIN_CELL_NUMBER = 1;
  private readonly MAX_CELL_NUMBER = 9;

  private readonly MIN_ROW_INDEX = 0;
  private readonly MAX_ROW_INDEX = 8;

  private readonly MIN_COL_INDEX = 0;
  private readonly MAX_COL_INDEX = 8;

  private readonly EMPTY_CELL_VALUE = -1;

  constructor(input: string[][]) {
    this.initBoard(input);
  }

  private initBoard(input: string[][]) {
    const tempBoard = JSON.parse(JSON.stringify(input));
    tempBoard.forEach2DArray((row: number, col: number) => {
      tempBoard[row][col] =
        parseInt(tempBoard[row][col]) || this.EMPTY_CELL_VALUE;
    });
    this.board = tempBoard;
  }

  public findSolution(): Array<Array<number>> {
    this.solution = null;
    const [startingRow, startingCol] = this.findNextEmptyCell();
    this.findAndPutNumber(startingRow, startingCol);
    return this.solution;
  }

  private findAndPutNumber(row: number, col: number): void {
    if (row === -1 || col === -1) {
      this.solution = JSON.parse(JSON.stringify(this.board));
      return;
    }

    for (let num = this.MIN_CELL_NUMBER; num <= this.MAX_CELL_NUMBER; num++) {
      if (this.canPutNumber(row, col, num)) {
        this.board[row][col] = num;
        const nextEmptyCell = this.findNextEmptyCell(row, col);
        this.findAndPutNumber(nextEmptyCell[0], nextEmptyCell[1]);
        this.board[row][col] = this.EMPTY_CELL_VALUE;
      }
    }
  }

  private canPutNumber(row: number, col: number, num: number): boolean {
    return (
      !this.hasNumberInSubgrid(row, col, num) &&
      !this.hasNumberInVertical(col, num) &&
      !this.hasNumberInHorizontal(row, num)
    );
  }

  private hasNumberInSubgrid(row: number, col: number, value: number): boolean {
    const subgridBoundary = this.findSubgridBoundary(row, col);
    let found = false;
    for (let i = subgridBoundary.row.min; i <= subgridBoundary.row.max; i++) {
      for (let j = subgridBoundary.col.min; j <= subgridBoundary.col.max; j++) {
        if (this.board[i][j] === value) {
          found = true;
          break;
        }
      }
    }

    return !!found;
  }

  private findSubgridBoundary(row: number, col: number): SubgridBoundary {
    if (row >= 0 && row <= 2) {
      if (col >= 0 && col <= 2) {
        return {
          row: {
            min: 0,
            max: 2
          },
          col: {
            min: 0,
            max: 2
          }
        };
      } else if (col >= 3 && col <= 5) {
        return {
          row: {
            min: 0,
            max: 2
          },
          col: {
            min: 3,
            max: 5
          }
        };
      } else if (col >= 6 && col <= 8) {
        return {
          row: {
            min: 0,
            max: 2
          },
          col: {
            min: 6,
            max: 8
          }
        };
      }
    } else if (row >= 3 && row <= 5) {
      if (col >= 0 && col <= 2) {
        return {
          row: {
            min: 3,
            max: 5
          },
          col: {
            min: 0,
            max: 2
          }
        };
      } else if (col >= 3 && col <= 5) {
        return {
          row: {
            min: 3,
            max: 5
          },
          col: {
            min: 3,
            max: 5
          }
        };
      } else if (col >= 6 && col <= 8) {
        return {
          row: {
            min: 3,
            max: 5
          },
          col: {
            min: 6,
            max: 8
          }
        };
      }
    } else if (row >= 6 && row <= 8) {
      if (col >= 0 && col <= 2) {
        return {
          row: {
            min: 6,
            max: 8
          },
          col: {
            min: 0,
            max: 2
          }
        };
      } else if (col >= 3 && col <= 5) {
        return {
          row: {
            min: 6,
            max: 8
          },
          col: {
            min: 3,
            max: 5
          }
        };
      } else if (col >= 6 && col <= 8) {
        return {
          row: {
            min: 6,
            max: 8
          },
          col: {
            min: 6,
            max: 8
          }
        };
      }
    }
  }

  private hasNumberInVertical(fixedColumn: number, value: number): boolean {
    let found = false;
    for (let row = this.MIN_ROW_INDEX; row <= this.MAX_ROW_INDEX; row++) {
      if (this.board[row][fixedColumn] === value) {
        found = true;
        break;
      }
    }

    return !!found;
  }

  private hasNumberInHorizontal(fixRow: number, value: number): boolean {
    let found = false;
    for (let col = this.MIN_COL_INDEX; col <= this.MAX_COL_INDEX; col++) {
      if (this.board[fixRow][col] === value) {
        found = true;
        break;
      }
    }

    return !!found;
  }

  private findNextEmptyCell(
    row: number = 0,
    col: number = -1
  ): [number, number] {
    let jValue = col + 1;
    for (let i = row; i <= this.MAX_ROW_INDEX; i++) {
      for (let j = jValue; j <= this.MAX_COL_INDEX; j++) {
        if (this.board[i][j] === -1) {
          return [i, j];
        }
      }
      jValue = this.MIN_COL_INDEX;
    }
    return [-1, -1];
  }
}

enum ForEach2DArrayCBResponse {
  BREAK,
  SUCCESS
}
type ForEach2DArrayCB = (row: number, col: number) => ForEach2DArrayCBResponse;
interface Array<T> {
  forEach2DArray: (cb: ForEach2DArrayCB) => void;
}

Array.prototype.forEach2DArray = function<T>(cb: ForEach2DArrayCB) {
  let breakLoop = false;
  const rowSize = this.length;
  for (let row = 0; row < rowSize; row++) {
    const colSize = this[row].length;
    for (let col = 0; col < colSize; col++) {
      const response = cb.apply(this, [row, col, this[row][col]]);
      if (response === ForEach2DArrayCBResponse.BREAK) {
        breakLoop = true;
        break;
      }
    }
    if (breakLoop) {
      break;
    }
  }
};

const solver = new SudokuSolver([
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]);

console.log(JSON.stringify(solver.findSolution()));
// [
//   ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
//   ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
//   ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
//   ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
//   ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
//   ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
//   ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
//   ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
//   ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
// ];
