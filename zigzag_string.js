/**
 * This problem was asked by PayPal.

Given a string and a number of lines k, print the string in zigzag form. In zigzag, characters are printed out diagonally from top left to bottom right until reaching the kth line, then back up to top right, and so on.

For example, given the sentence "thisisazigzag" and k = 4, you should print:

t     a     g
 h   s z   a
  i i   i z
   s     g

 */

class Zigzag {
  /**
   * Constructor
   *
   * @param {String} string
   * @param {Number} lines
   * @param {Char} emptySpaceChar
   */
  constructor(string, lines, emptySpaceChar) {
    this.char = emptySpaceChar;
    this.string = string;
    this.width = this.string.length;
    this.height = lines;
    this.mat = [];
    this.swingGenerator = this.getSwingGenerator(0, this.height - 1);
  }

  /**
   * Generate numbers between min and max in swing manner
   *
   * @param {Number} min
   * @param {Number} max
   */
  getSwingGenerator(min, max) {
    return (function* (min, max) {
      let low = min,
        isIncreasing = true;

      while (true) {
        yield low;

        if (low == max && isIncreasing === true) {
          isIncreasing = false;
        } else if (low === min && isIncreasing === false) {
          isIncreasing = true;
        }

        low = isIncreasing ? low + 1 : low - 1;
      }
    })(min, max);
  }

  print() {
    for (let i = 0; i < this.height; i++) {
      let line = "";

      for (let j = 0; j < this.width; j++) {
        line += this.mat[i][j] ? this.mat[i][j] : this.char;
      }
      console.log(line);
    }
  }

  /**
   * Function to fill the 2D array with chars
   *
   * Loop each chars in string as column,
   * Each char, fill the 2D array with swing gererator row
   */
  execute() {
    for (let col = 0; col < this.width; col++) {
      const { value: row } = this.swingGenerator.next();

      if (!Array.isArray(this.mat[row])) {
        this.mat[row] = [];
      }
      this.mat[row][col] = this.string.charAt(col);
    }

    return this;
  }
}

const z = new Zigzag("iamsaikatdutta", 4, "-");
z.execute().print();


/**
 * Output:
 * 
 *  i-----k-----t-
    -a---i-a---t-a
    --m-a---t-u---
    ---s-----d----
 */
