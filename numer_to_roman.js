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
  // check for unit whole divisible by middle and must be 1 or 2 or 3
  const sc = unit / range.middle;
  if (1 === sc || 2 === sc || 3 === sc) {
    return repeat(scale[range.middle], sc);
  }

  /** check one less poissible, ex: 4 --> (5-1) --> IV */
  const tc = (range.upper - unit) / range.lower;
  if (tc === 1) {
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

num = 80;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 90;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 100;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 5;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 4;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 3;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 1;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 900;
console.log(`${num} --> ${numToRoman(num, scale)}`);

num = 2501;
console.log(`${num} --> ${numToRoman(num, scale)}`);


/** 
Sample output

80 --> LXXX
90 --> XC
100 --> C
5 --> V
4 --> IV
3 --> III
1 --> I
900 --> CM
2501 --> MMDI
**/
