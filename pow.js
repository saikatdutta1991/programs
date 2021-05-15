let memoization = new Map();

function myPow(x, n) {
  if (n < 0) {
    return 1 / pow(x, Math.abs(n));
  } else {
    return pow(x, n);
  }
};

function pow(x, n) {
  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return x;
  } else if (n === 2) {
    return x * x;
  } else if (memoization.has(n)) {
    return memoization.get(n);
  } else {
    const output = pow(x, parseInt(n / 2)) * pow(x, parseInt(n / 2)) * (isEvenNumber(n) ? 1 : pow(x, 1));
    memoization.set(n, output);
    return output;
  }
}

function isEvenNumber(n) {
  return n % 2 === 0;
}


const x = 8.88023, n = 3;
console.log('final output', myPow(x, n), Math.pow(x, n))