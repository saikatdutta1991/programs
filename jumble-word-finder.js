// Note: Execute this file using nodejs

const https = require('https');

// 1. HTNXAAR
// 2. ERXLFE
// 3. MCXOPEL
// 4. FNUIXL
// 5. ARXLYN
// 6. PXELUD
// 7. PNEXAIPD
// 8. NIACMITLXA
// 9. EHOPXIN
// 10. ARALPLXA
// 11. FRCUIXIC
// 12. EUMXLITLP
// 13. MFXLOUM
// 14. OVNEXC
// 15. NPXYHRA
// 16. EXTBHCATOR
// 17. HXODROTO
// 18. QINEUXO
// 19. NPXSYH
// 20. LXPPREE
// 21. AXYNST
// 22. IXCAML

const word = 'HTNXAAR';
findCorrectWord(word)
  .then((correctWord) =>
    console.log(`Correct word of ${word} is ${correctWord}`)
  )
  .catch((error) => console.log({ error }));

async function findCorrectWord(jumbleWord) {
  const combinations = findEachCombinationsOfWord(jumbleWord);
  for (const word of combinations) {
    console.log(`Checking if word combination is valid for: ${word}`);
    if (await isWordValid(word)) {
      return word;
    }
  }

  throw new Error(`No correct word found for ${word}`);
}

function findEachCombinationsOfWord(word) {
  const output = [];
  findCombinations(word.split(''), 0, [], output);
  return output.map((wordArray) => wordArray.join(''));
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

async function isWordValid(word) {
  const response = await geFromDictionary(word);
  return !!(response && response[0] && response[0].word);
}

function geFromDictionary(word) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.dictionaryapi.dev',
      port: 443,
      path: `/api/v2/entries/en/${word}`,
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
