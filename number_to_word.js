class NumberToWord {
  constructor(wordsMap = {}) {
    this.wordsMap = wordsMap;
    this._init();
  }

  /**
   * Find Perfect Match
   * Iterates from last to first of the words map keys,
   * When finds first less value than given number returns it;
   * @name _findDivider
   * @param {Integer} num
   */
  _findDivider(num) {
    const keys = Object.keys(this.wordsMap);
    let d = 0;
    for (let i = keys.length - 1; i >= 0; i--) {
      if (keys[i] <= num) return keys[i];
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
    // emtpy words map, so set default
    if (this.isObjectEmpty(this.wordsMap)) {
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
      0: { word: "Zero" },
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

for (let n = 0; n <= 100; n++)
  console.log("num = ", n, ", In words : ", numberToWord.convert(n));




//   Sample Output:
//   num =  0 , In words :  Zero 
// num =  1 , In words :  One 
// num =  2 , In words :  Two 
// num =  3 , In words :  Three 
// num =  4 , In words :  Four 
// num =  5 , In words :  Five 
// num =  6 , In words :  Six 
// num =  7 , In words :  Seven 
// num =  8 , In words :  Eight 
// num =  9 , In words :  Nine 
// num =  10 , In words :  Ten 
// num =  11 , In words :  Eleven 
// num =  12 , In words :  Twelve 
// num =  13 , In words :  Thirteen 
// num =  14 , In words :  Fourteen 
// num =  15 , In words :  Fifteen 
// num =  16 , In words :  Sixteen 
// num =  17 , In words :  Seventeen 
// num =  18 , In words :  Eighteen 
// num =  19 , In words :  Nineteen 
// num =  20 , In words :  Twenty 
// num =  21 , In words :  Twenty One 
// num =  22 , In words :  Twenty Two 
// num =  23 , In words :  Twenty Three 
// num =  24 , In words :  Twenty Four 
// num =  25 , In words :  Twenty Five 
// num =  26 , In words :  Twenty Six 
// num =  27 , In words :  Twenty Seven 
// num =  28 , In words :  Twenty Eight 
// num =  29 , In words :  Twenty Nine 
// num =  30 , In words :  Thirty 
// num =  31 , In words :  Thirty One 
// num =  32 , In words :  Thirty Two 
// num =  33 , In words :  Thirty Three 
// num =  34 , In words :  Thirty Four 
// num =  35 , In words :  Thirty Five 
// num =  36 , In words :  Thirty Six 
// num =  37 , In words :  Thirty Seven 
// num =  38 , In words :  Thirty Eight 
// num =  39 , In words :  Thirty Nine 
// num =  40 , In words :  Fourty 
// num =  41 , In words :  Fourty One 
// num =  42 , In words :  Fourty Two 
// num =  43 , In words :  Fourty Three 
// num =  44 , In words :  Fourty Four 
// num =  45 , In words :  Fourty Five 
// num =  46 , In words :  Fourty Six 
// num =  47 , In words :  Fourty Seven 
// num =  48 , In words :  Fourty Eight 
// num =  49 , In words :  Fourty Nine 
// num =  50 , In words :  Fifty 
// num =  51 , In words :  Fifty One 
// num =  52 , In words :  Fifty Two 
// num =  53 , In words :  Fifty Three 
// num =  54 , In words :  Fifty Four 
// num =  55 , In words :  Fifty Five 
// num =  56 , In words :  Fifty Six 
// num =  57 , In words :  Fifty Seven 
// num =  58 , In words :  Fifty Eight 
// num =  59 , In words :  Fifty Nine 
// num =  60 , In words :  Sixty 
// num =  61 , In words :  Sixty One 
// num =  62 , In words :  Sixty Two 
// num =  63 , In words :  Sixty Three 
// num =  64 , In words :  Sixty Four 
// num =  65 , In words :  Sixty Five 
// num =  66 , In words :  Sixty Six 
// num =  67 , In words :  Sixty Seven 
// num =  68 , In words :  Sixty Eight 
// num =  69 , In words :  Sixty Nine 
// num =  70 , In words :  Seventy 
// num =  71 , In words :  Seventy One 
// num =  72 , In words :  Seventy Two 
// num =  73 , In words :  Seventy Three 
// num =  74 , In words :  Seventy Four 
// num =  75 , In words :  Seventy Five 
// num =  76 , In words :  Seventy Six 
// num =  77 , In words :  Seventy Seven 
// num =  78 , In words :  Seventy Eight 
// num =  79 , In words :  Seventy Nine 
// num =  80 , In words :  Eighty 
// num =  81 , In words :  Eighty One 
// num =  82 , In words :  Eighty Two 
// num =  83 , In words :  Eighty Three 
// num =  84 , In words :  Eighty Four 
// num =  85 , In words :  Eighty Five 
// num =  86 , In words :  Eighty Six 
// num =  87 , In words :  Eighty Seven 
// num =  88 , In words :  Eighty Eight 
// num =  89 , In words :  Eighty Nine 
// num =  90 , In words :  Ninty 
// num =  91 , In words :  Ninty One 
// num =  92 , In words :  Ninty Two 
// num =  93 , In words :  Ninty Three 
// num =  94 , In words :  Ninty Four 
// num =  95 , In words :  Ninty Five 
// num =  96 , In words :  Ninty Six 
// num =  97 , In words :  Ninty Seven 
// num =  98 , In words :  Ninty Eight 
// num =  99 , In words :  Ninty Nine 
// num =  100 , In words :  One Hundred 