// Example:
// co:Test Company id:12342 status:QUEUE
// {
//     "co": "",
//     "id": "",
//     "status": ""
// }

let supportedKeywords = ["co:", "id:", "status:"];

function findSearchKeywors(searchText) {
  let response = {};
  supportedKeywords.forEach((it) => {
    response[it] = extractKeyword(it, searchText);
  });

  return response;
}

function extractKeyword(keyword, searchText) {
  var content = second(searchText.split(`${keyword}`)) || "";

  supportedKeywords.forEach((supportedKeyword) => {
    content = removeAfter(content, supportedKeyword);
  });

  return content.trim();
}

function second(arr) {
  return arr.splice(1, 1)[0];
}

function removeAfter(text, keyword) {
  return text.replaceAll(new RegExp(`${keyword}.*`, "g"), "");
}

let searchText = "co:Test Company id:12342 id:123432 status:QUEUE";
console.log(findSearchKeywors(searchText));
