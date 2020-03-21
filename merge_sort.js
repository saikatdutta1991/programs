function mergeSort(arr) {
  let newArray = arr.map(x => x);

  const sort = function(low, high) {
    if (low < high) {
      let middle = parseInt((low + high) / 2);
      sort(low, middle);
      sort(middle + 1, high);
      merge(low, middle, high);
    }
  };

  const merge = function(low, middle, high) {
    let tempArr = [],
      i = low,
      j = middle + 1;

    while (i <= middle && j <= high) {
      tempArr.push(newArray[i] < newArray[j] ? newArray[i++] : newArray[j++]);
    }

    while (i <= middle) {
      tempArr.push(newArray[i++]);
    }

    while (j <= high) {
      tempArr.push(newArray[j++]);
    }

    i = low;
    tempArr.forEach(v => {
      newArray[i++] = v;
    });
  };

  sort(0, newArray.length - 1);

  return newArray;
}

let arr = [3, 5, 7, 1, 2, 8, 9];
console.log(mergeSort(arr));
