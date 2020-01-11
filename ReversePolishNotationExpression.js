<script>
/** 
 * The expression is given as a list of numbers and operands. 
 * For example: [5, 3, '+'] should return 5 + 3 = 8.
 * For example, [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'] 
 * should return 5, since it is equivalent to ((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1)) = 5.
 */

function isOperator(operator) {
    return [ '+', '-', '*', '/' ].includes(operator);
}

/**
 * reutrns a function based on operator symbol,
 * returned function takes right and left operand and reutrns result value
 */
function operator(opt) {

    if('+' === opt) {
        return function(rightOperand, leftOperand) {
            return leftOperand + rightOperand;
        }
    } else if('-' === opt) {
        return function(rightOperand, leftOperand) {
            return leftOperand - rightOperand;
        }
    } else if('*' === opt) {
        return function(rightOperand, leftOperand) {
            return leftOperand * rightOperand;
        }
    } else if('/' === opt) {
        return function(rightOperand, leftOperand) {
            return leftOperand / rightOperand;
        }
    }

}


function evaluateExpression(exp) {

    let stack = []; // take a stack

    /** Check each elements in expression,
     * if element is opeator(+, - etc.) pop from stack two times, and evalute
     * and push the result in stack back
     * if element is not operator, push element to stack simple, do't do anything
     */
    exp.forEach( e => {

        if(isOperator(e)) {
            e = operator(e)(stack.pop(), stack.pop());
        }

        stack.push(e);

    });

    // result will be stored in stack, and is the last element in stack left.
    return stack.pop(); 

}


let expression = [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'];
let result = evaluateExpression(expression);
console.log('result', result);

</script>
