function findSubsets(arr, loopStartIndex, stack, subsets) {
  for (let i = loopStartIndex; i < arr.length; i++) {
    stack.push(arr[i]);
    subsets.push(stack.slice());
    findSubsets(arr, i + 1, stack, subsets);
    stack.pop();
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const subsets = [];
const stack = [];

findSubsets(arr, 0, stack, subsets);

console.log("arr", arr);
console.log("subsets", subsets);
