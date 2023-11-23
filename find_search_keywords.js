// Example:
// co:Test Company1, co:Test Company2 id:12342 id:123432 status:QUEUE status:PROCESSING
// {
//   'co:': [ 'Test Company1,', 'Test Company2' ],
//   'id:': [ '12342', '123432' ],
//   'status:': [ 'QUEUE', 'PROCESSING' ]
// }

function findSearchKeywors(searchText) {
  let supportedKeywords = ["co:", "id:", "status:"];
  let response = supportedKeywords.reduce((object, keyword) => {
    object[keyword] = [];
    return object;
  }, {});

  let joinedKeywords = supportedKeywords.join("|");
  let tokens = searchText
    .replaceAll(new RegExp(`(${joinedKeywords})`, "g"), "\n$1\n")
    .split("\n");

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    for (let j = 0; j < supportedKeywords.length; j++) {
      const keyword = supportedKeywords[j];
      if (keyword == token && tokens[i + 1]) {
        response[keyword].push(tokens[++i].trim());
        break;
      }
    }
  }

  return response;
}

let searchText =
  "co:Test Company1, co:Test Company2 id:12342 id:123432 status:QUEUE status:PROCESSING";
console.log(findSearchKeywors(searchText));
