/**
 * Break number multiple units
 *
 * It takes a number(integer) and break
 * into such that units, tens, hundereds, thousands, etc
 * and returns array
 * Ex : 1234 -> [ 1000, 200, 30, 4]
 *
 * @param {number} number
 * @returns {array} Array of units
 */
function breakUnits(number) {
  let multiplier = 1;
  let units = [];
  while (number !== 0) {
    const mod = number % 10;
    units.push(mod * multiplier);
    multiplier *= 10;
    number = parseInt(number / 10);
  }

  return units.reverse();
}

/**
 * Repeat string
 *
 * It takes symbol and how many times to repeat
 * and returns the repeated string
 * Ex : repeat('X', 3) --> 'XXX'
 *
 * @param {string} sym
 * @param {number} times
 * @returns {string}
 */
function repeat(sym, times) {
  return sym.repeat(times);
}
/**
 * Find Number-Scale range
 *
 * It takes scale and number,
 * then finds the upper, middle, lower bound of the number
 * in the given scale list
 *
 * @param {object} scale
 * @param {integer} number
 * @returns {object} object { upper : 1000, middle : 500, lower : 100 }
 */
function findScaleRange(scale, number) {
  const list = Object.keys(scale).map(n => parseInt(n));
  let lower, middle, upper;
  for (let i = 0; i < list.length; i++) {
    if (number >= list[i]) {
      lower = list[i - 1];
      middle = list[i];
      upper = list[i + 1];
      continue;
    }
    break;
  }

  if (!middle) {
    throw new Error("Scale is not configured properly");
  }

  if (!lower) {
    lower = middle;
  }

  if (!upper) {
    upper = middle;
  }

  return { upper, middle, lower };
}

/**
 * Convert single unit to roman
 * It checks multiple conditions in order,
 * if all fails then throws error
 * Eg : 1, 5, 10, 200, 100, 400, 300, 60
 * @param {integer} unit
 * @param {object} range
 * @param {object} scale
 * @returns {sting}
 */
function convert(unit, range, scale) {
  // ex : 50
  if (unit === range.middle) {
    return scale[range.middle];
  }

  // ex : 30 ---> 10 + 10 + 10
  const ss = unit / range.middle;
  if (1 === ss || 2 === ss || 3 === ss) {
    return repeat(scale[range.middle], ss);
  }

  // ex : 40 --> 50 - 10 | range { lower : 5, middle : 10, upper : 50 }
  if (range.upper - range.middle === unit) {
    return scale[range.middle] + scale[range.upper];
  }

  // ex: 9 --> 10 - 1 | range { lower : 1, middle : 5, upper : 10 }
  if (range.upper - range.lower === unit) {
    return scale[range.lower] + scale[range.upper];
  }

  /** check possibility of ex: 80 --> 50 + 10 + 10 + 10 --> LXXX */
  const fc = (range.middle - unit) / range.lower;
  if (-1 === fc || -2 === fc || -3 === fc) {
    return scale[range.middle] + repeat(scale[range.lower], Math.abs(fc));
  }

  throw new Error("Increase the scale capacity");
}

/**
 * Converts number to Roman numerical
 *
 * It takes a number and scale ( number to roman symbol)
 * Then splits the number into units (ones, tens, hundreds etc.)
 * Converts each units to correspondent roman string
 * joins all parts and return
 *
 * Ex : 1200 --> MCC
 * Ex : scale format : scale = {1: "I", 5: "V", ... )
 * * Note : scale format must be in order
 *
 * @param {number} number
 * @param {object} scale
 * @returns {string}
 */
function numToRoman(number, scale) {
  const units = breakUnits(number);
  let roman = "";
  for (let i = 0; i < units.length; i++) {
    if (units[i] === 0) continue;
    const range = findScaleRange(scale, units[i]);
    roman += convert(units[i], range, scale);
  }

  return roman;
}

/** common scale */
const scale = {
  1: "I",
  5: "V",
  10: "X",
  50: "L",
  100: "C",
  500: "D",
  1000: "M"
};

for (let i = 1; i < 100; i++) {
  console.log(`${i} --> ${numToRoman(i, scale)}`);
}


/**
 * sample output
 * 
 *  1 --> I
    2 --> II
    3 --> III
    4 --> IV
    5 --> V
    6 --> VI
    7 --> VII
    8 --> VIII
    9 --> IX
    10 --> X
    11 --> XI
    12 --> XII
    13 --> XIII
    14 --> XIV
    15 --> XV
    16 --> XVI
    17 --> XVII
    18 --> XVIII
    19 --> XIX
    20 --> XX
    21 --> XXI
    22 --> XXII
    23 --> XXIII
    24 --> XXIV
    25 --> XXV
    26 --> XXVI
    27 --> XXVII
    28 --> XXVIII
    29 --> XXIX
    30 --> XXX
    31 --> XXXI
    32 --> XXXII
    33 --> XXXIII
    34 --> XXXIV
    35 --> XXXV
    36 --> XXXVI
    37 --> XXXVII
    38 --> XXXVIII
    39 --> XXXIX
    40 --> XL
    41 --> XLI
    42 --> XLII
    43 --> XLIII
    44 --> XLIV
    45 --> XLV
    46 --> XLVI
    47 --> XLVII
    48 --> XLVIII
    49 --> XLIX
    50 --> L
    51 --> LI
    52 --> LII
    53 --> LIII
    54 --> LIV
    55 --> LV
    56 --> LVI
    57 --> LVII
    58 --> LVIII
    59 --> LIX
    60 --> LX
    61 --> LXI
    62 --> LXII
    63 --> LXIII
    64 --> LXIV
    65 --> LXV
    66 --> LXVI
    67 --> LXVII
    68 --> LXVIII
    69 --> LXIX
    70 --> LXX
    71 --> LXXI
    72 --> LXXII
    73 --> LXXIII
    74 --> LXXIV
    75 --> LXXV
    76 --> LXXVI
    77 --> LXXVII
    78 --> LXXVIII
    79 --> LXXIX
    80 --> LXXX
    81 --> LXXXI
    82 --> LXXXII
    83 --> LXXXIII
    84 --> LXXXIV
    85 --> LXXXV
    86 --> LXXXVI
    87 --> LXXXVII
    88 --> LXXXVIII
    89 --> LXXXIX
    90 --> XC
    91 --> XCI
    92 --> XCII
    93 --> XCIII
    94 --> XCIV
    95 --> XCV
    96 --> XCVI
    97 --> XCVII
    98 --> XCVIII
    99 --> XCIX
 */
