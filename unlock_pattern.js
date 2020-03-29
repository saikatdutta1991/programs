/** Abstruction for each key */
class Key {
  constructor(num) {
    this.num = num;
  }
}

class PatternMaker {
  /**
   * Builds the keypad graph
   * It represents the paths of each key
   */
  _buildKeypadGraph() {
    /** List of all keys  */
    const keypad = {
      1: new Key(1),
      2: new Key(2),
      3: new Key(3),
      4: new Key(4),
      5: new Key(5),
      6: new Key(6),
      7: new Key(7),
      8: new Key(8),
      9: new Key(9)
    };
    // mapping paths of each key

    // for key1
    keypad[1].right = keypad[2];
    keypad[1].bottomRight = keypad[5];
    keypad[1].bottom = keypad[4];

    // for key2
    keypad[2].left = keypad[1];
    keypad[2].bottomLeft = keypad[4];
    keypad[2].bottom = keypad[5];
    keypad[2].bottomRight = keypad[6];
    keypad[2].right = keypad[3];

    // for key3
    keypad[3].left = keypad[2];
    keypad[3].bottomLeft = keypad[5];
    keypad[3].bottom = keypad[6];

    //for key4
    keypad[4].top = keypad[1];
    keypad[4].topRight = keypad[2];
    keypad[4].right = keypad[5];
    keypad[4].bottomRight = keypad[8];
    keypad[4].bottom = keypad[7];

    //for key5
    keypad[5].topLeft = keypad[1];
    keypad[5].top = keypad[2];
    keypad[5].topRight = keypad[3];
    keypad[5].left = keypad[4];
    keypad[5].right = keypad[6];
    keypad[5].bottomLeft = keypad[7];
    keypad[5].bottom = keypad[8];
    keypad[5].bottomRight = keypad[9];

    //for key6
    keypad[6].top = keypad[3];
    keypad[6].topLeft = keypad[2];
    keypad[6].left = keypad[5];
    keypad[6].bottomLeft = keypad[8];
    keypad[6].bottom = keypad[9];

    // for key7
    keypad[7].top = keypad[4];
    keypad[7].topRight = keypad[5];
    keypad[7].right = keypad[8];

    // for key8
    keypad[8].left = keypad[7];
    keypad[8].topLeft = keypad[4];
    keypad[8].top = keypad[5];
    keypad[8].topRight = keypad[6];
    keypad[8].right = keypad[9];

    // for key9
    keypad[9].left = keypad[8];
    keypad[9].topLeft = keypad[5];
    keypad[9].top = keypad[6];

    return Object.values(keypad);
  }

  get sides() {
    return [
      "left",
      "topLeft",
      "top",
      "topRight",
      "right",
      "bottomRight",
      "bottom",
      "bottomLeft"
    ];
  }

  /**
   * Calculates the possible keys
   *
   * Function that calculates the next possible unique keys from a given key
   *
   * @param {Key} key from which key, need to find possible paths
   * @param {Map} Dictionary keep track of keys, check key existence in O(1).
   * @param {Array} keypad of Keys. The keypad keyGraph returned from _buildKeypadGraph()
   */
  _getPossibleKeys(key, pattern, keypad) {
    if (!key) {
      // console.log("keypad", keypad);
      return keypad; // current key does not exists, so returns all keys of keyaboard
    }

    let possibleKeys = new Set();

    // Loop through all sides of current key
    for (let side of this.sides) {
      const sideKey = key[side];

      if (sideKey) {
        if (pattern.has(sideKey)) {
          for (let side of this.sides) {
            if (sideKey[side] && !pattern.has(sideKey[side])) {
              possibleKeys.add(sideKey[side]);
            }
          }
        } else {
          possibleKeys.add(sideKey);
        }
      }
    }

    return Array.from(possibleKeys);
  }

  /**
   * Function genrates the patterns recursively
   * Thsi function is a generator function
   * @param {Key} key from which key, need to find possible paths
   * @param {Number} pLength Length of the pattern building for
   * @param {Map} currPattern Dictionary keep track of keys, check key existence in O(1)
   * @param {Array} keypad of Keys. The keyboard keyGraph returned from buildKeypadGraph()
   */
  *_recurseParttern(pLength, key, currPattern, keypad) {
    if (currPattern.size === pLength) {
      yield this._readPatternNumbers(currPattern);
      return;
    }

    const pKeys = this._getPossibleKeys(key, currPattern, keypad);
    // console.log("pKeys", pKeys);
    for (let pkey of pKeys) {
      currPattern.set(pkey, true);
      yield* this._recurseParttern(pLength, pkey, currPattern, keypad);
      currPattern.delete(pkey);
    }
  }

  /**
   * Returns array of numbers of keys inside pattern
   * @param {Map} pattern Map of Keys
   */
  _readPatternNumbers(pattern) {
    const patternKeys = Array.from(pattern.keys());
    return patternKeys.map(k => k.num);
  }

  getGenerator(pLength) {
    const keypad = this._buildKeypadGraph();
    const key = null;
    const currPattern = new Map();
    return this._recurseParttern(pLength, key, currPattern, keypad);
  }
}
