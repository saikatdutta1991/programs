class NumberToWord {
  constructor(wordsMap = {}) {
    this.wordsMap = wordsMap;
    this._init();
  }

  _findDivider(num) {
    const keys = Object.keys(this.wordsMap);
    let d = 0;
    for (let i = keys.length - 1; i >= 0; i--) {
      if (keys[i] <= num) {
        d = keys[i];
        break;
      }
    }
    return d;
  }

  convert(num) {
    const wordObj = this.wordsMap[num];
    if (wordObj && !wordObj.isCountable) {
      return wordObj.word + " ";
    }

    const d = this._findDivider(num);

    const left = this.wordsMap[d].isCountable
      ? this.convert(parseInt(num / d))
      : "";
    const middle = this.wordsMap[d].word + " ";
    const right = num % d === 0 ? "" : this.convert(num % d);
    return left + middle + right;
  }

  _init() {
    if (this.isObjectEmpty(this.wordsMap)) {
      // emtpy words map, so set default
      this.wordsMap = this.constructor.wordsMap;
    }

    // Make sure last key has to be isCountable set to true
    Object.values(this.wordsMap)[
      Object.keys(this.wordsMap).length - 1
    ].isCountable = true;
  }

  /**
   * List of all possible words vs numbers map
   * isCountable true means number has left count
   * Ex : 200 --> Two Hundred
   *      22 -> Two Twenty ( not possible )
   *      Only possilbe if list has max number upto 20
   * Make sure last key has to be isCountable set to true
   * This list will be overridden by passed argument at constructor
   */
  static get wordsMap() {
    return {
      1: { word: "One" },
      2: { word: "Two" },
      3: { word: "Three" },
      4: { word: "Four" },
      5: { word: "Five" },
      6: { word: "Six" },
      7: { word: "Seven" },
      8: { word: "Eight" },
      9: { word: "Nine" },
      10: { word: "Ten" },
      11: { word: "Eleven" },
      12: { word: "Twelve" },
      13: { word: "Thirteen" },
      14: { word: "Fourteen" },
      15: { word: "Fifteen" },
      16: { word: "Sixteen" },
      17: { word: "Seventeen" },
      18: { word: "Eighteen" },
      19: { word: "Nineteen" },
      20: { word: "Twenty" },
      30: { word: "Thirty" },
      40: { word: "Fourty" },
      50: { word: "Fifty" },
      60: { word: "Sixty" },
      70: { word: "Seventy" },
      80: { word: "Eighty" },
      90: { word: "Ninty" },
      100: { word: "Hundred", isCountable: true },
      1000: { word: "Thousand", isCountable: true },
      100000: { word: "Lakh", isCountable: true },
      1000000: { wrod: "Million", isCountable: true },
      10000000: { word: "Crore", isCountable: true }
    };
  }

  /**
   * Check if object empty
   * It checks if argument type if 'object' and keys length
   * @param {Object} obj
   */
  isObjectEmpty(obj = {}) {
    return !("object" === typeof obj && Object.keys(obj).length);
  }
}

const numberToWord = new NumberToWord();
const num = 1000000;
console.log("num = ", num, ", In words : ", numberToWord.convert(num));
