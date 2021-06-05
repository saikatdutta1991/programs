// Note: Execute this file using nodejs

const https = require('https');

function findCorrectWordFromJumbleString(jumbleString, dictionary) {
  const combinations = findEachCombinationsOfString(jumbleString);
  for (const str of combinations) {
    if (dictionary.isValidWord(str)) {
      return str;
    }
  }

  throw new Error(`No correct word found for ${jumbleString}`);
}

function findEachCombinationsOfString(str) {
  const output = [];
  findCombinations(str.split(''), 0, [], output);
  return output.map((strArray) => strArray.join(''));
}

function findCombinations(
  inputArray,
  intermediateOutputPositionIndex,
  intermediateOutputIndexes,
  outputStack
) {
  if (intermediateOutputPositionIndex >= inputArray.length) {
    outputStack.push(
      intermediateOutputIndexes.map((index) => inputArray[index])
    );
  } else {
    inputArray.forEach((letter, index) => {
      if (!intermediateOutputIndexes.includes(index)) {
        intermediateOutputIndexes[intermediateOutputPositionIndex] = index;
        findCombinations(
          inputArray,
          intermediateOutputPositionIndex + 1,
          intermediateOutputIndexes,
          outputStack
        );
        delete intermediateOutputIndexes[intermediateOutputPositionIndex];
      }
    });
  }
}

class Dictionary {
  constructor() {
    this.wordsMap = {};
  }

  async init() {
    console.log(`Initializing dictionary..`);
    this.wordsMap = await this.downloadDictionary();
    console.log(`Dictionary initialized.`);
  }

  downloadDictionary() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'raw.githubusercontent.com',
        port: 443,
        path: `/dwyl/english-words/master/words_dictionary.json`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve(JSON.parse(body)));
      });
      req.on('error', (error) => {
        reject(error);
      });
      req.end();
    });
  }

  isValidWord(word) {
    return !!this.wordsMap[word.toLowerCase()];
  }
}

(async () => {
  const dictionary = new Dictionary();
  await dictionary.init();

  const strings = [
    'HTNXAAR',
    'ERXLFE',
    'MCXOPEL',
    'FNUIXL',
    'ARXLYN',
    'PXELUD',
    'PNEXAIPD',
    'NIACMITLXA',
    'EHOPXIN',
    'ARALPLXA',
    'FRCUIXIC',
    'EUMXLITLP',
    'MFXLOUM',
    'OVNEXC',
    'NPXYHRA',
    'EXTBHCATOR',
    'HXODROTO',
    'QINEUXO',
    'NPXSYH',
    'LXPPREE',
    'AXYNST',
    'IXCAML',
  ];

  strings.forEach((str) => {
    try {
      const correctWord = findCorrectWordFromJumbleString(str, dictionary);
      console.log(`${str} => ${correctWord}`);
    } catch (error) {
      console.log({ error });
    }
  });
})();
