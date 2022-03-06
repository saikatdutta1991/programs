// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]


var generateParenthesis = function(n) {
  this.noOfParentheses = n;
  this.outputStack = [];
  this.output = [];tg
  recurse.bind(this)(0, 0);
  return this.output;
};

function recurse(noOfOpenedParentheses, noOfClosedParentheses) {
  
  if(noOfOpenedParentheses === this.noOfParentheses && noOfClosedParentheses === this.noOfParentheses) {
    return this.output.push(this.outputStack.join(''));
  }
  
  // Can open parentheses
  if(noOfOpenedParentheses < this.noOfParentheses) {
    this.outputStack.push('(');
    recurse(noOfOpenedParentheses + 1, noOfClosedParentheses);
    this.outputStack.pop();
  }
  
  // Can close parentheses
  if(noOfOpenedParentheses >  noOfClosedParentheses) {
    this.outputStack.push(')');
    recurse(noOfOpenedParentheses, noOfClosedParentheses + 1);
    this.outputStack.pop();
  }
}
