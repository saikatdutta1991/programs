/** Abstruction for each key */
class Key {
  constructor(num) {
    this.num = num;
  }
}

/**
 * Builds the keypad graph
 * It represents the paths of each key
 */
function buildKeypadGraph() {
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

/**
 * Calculates the possible keys
 *
 * Function that calculates the next possible unique keys from a given key
 *
 * @param {Key} key from which key, need to find possible paths
 * @param {Map} Dictionary keep track of keys, check key existence in O(1).
 * @param {Array} keypad of Keys. The keypad keyGraph returned from buildKeypadGraph()
 */
function getPossibleKeys(key, pattern, keypad) {
  if (!key) {
    // console.log("keypad", keypad);
    return keypad; // current key does not exists, so returns all keys of keyaboard
  }
  // console.log("key", key.num);
  const sides = [
    "left",
    "topLeft",
    "top",
    "topRight",
    "right",
    "bottomRight",
    "bottom",
    "bottomLeft"
  ];

  let possibleKeys = new Set();

  // Loop through all sides of current key
  for (i in sides) {
    const side = sides[i];
    const sideKey = key[side];

    if (!sideKey) {
      continue;
    }

    if (pattern.has(sideKey)) {
      const tempKeys = getPossibleKeys(sideKey, pattern, keypad);
      for (let k of tempKeys) {
        possibleKeys.add(k);
      }
    } else {
      possibleKeys.add(sideKey);
    }
  }

  return Array.from(possibleKeys);
}

/**
 * Function genrates the patterns recursively
 * @param {Key} key from which key, need to find possible paths
 * @param {Number} pLength Length of the pattern building for
 * @param {Map} currPattern Dictionary keep track of keys, check key existence in O(1)
 * @param {Array} patterns Array of array(patterns)
 * @param {Array} keypad of Keys. The keyboard keyGraph returned from buildKeypadGraph()
 */
function recurseParttern(pLength, key, currPattern, patterns, keypad) {
  if (currPattern.size === pLength) {
    return console.log(readPatternNumbers(currPattern));
  }

  const pKeys = getPossibleKeys(key, currPattern, keypad);
  // console.log("pKeys", pKeys);
  for (i in pKeys) {
    const pkey = pKeys[i];
    currPattern.set(pkey, true);
    recurseParttern(pLength, pkey, currPattern, patterns, keypad);
    currPattern.delete(pkey);
  }
}

/**
 * Returns array of numbers of keys inside pattern
 * @param {Map} pattern Map of Keys
 */
function readPatternNumbers(pattern) {
  const patternKeys = Array.from(pattern.keys());
  return patternKeys.map(k => k.num);
}

// main code
const keypad = buildKeypadGraph();
// console.log("keypad", Object.values(keypad));
const pLength = 3;
const key = null;
const currPattern = new Map();
const patterns = [];
recurseParttern(pLength, key, currPattern, patterns, keypad);
