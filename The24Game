enum Operator {
  ADDITION = '+',
  SUBSTRACTION = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',
  EMPTY = '',
}

type Digit = number;

type Index = number;

type MatchValue = number;

const MAX_INDEX = 5; // indexes: 1, 3, 5

class The24Game {
  private isKeyMatched: boolean;
  private keyMatchedExpression: string;

  private readonly expressionStack: [
    Digit,
    Operator,
    Digit,
    Operator,
    Digit,
    Operator,
    Digit
  ];

  constructor(a: Digit, b: Digit, c: Digit, d: Digit) {
    this.expressionStack = [
      a,
      Operator.EMPTY,
      b,
      Operator.EMPTY,
      c,
      Operator.EMPTY,
      d,
    ];
  }

  public play(key: MatchValue) {
    this.keyMatchedExpression = '';
    this.isKeyMatched = false;
    this.execute(1, key);
    console.log({
      keyMatchedExpression: this.keyMatchedExpression,
      keyMatched: this.isKeyMatched,
    });
  }

  private execute(operatorPosition: Index, key: MatchValue) {
    if (operatorPosition <= MAX_INDEX) {
      for (const operator of [
        Operator.ADDITION,
        Operator.SUBSTRACTION,
        Operator.MULTIPLICATION,
        Operator.DIVISION,
      ]) {
        this.expressionStack[operatorPosition] = operator;
        this.execute(operatorPosition + 2, key);
        this.expressionStack[operatorPosition] = Operator.EMPTY;
      }
    } else {
      if (eval(this.expressionStack.join('')) === key) {
        this.keyMatchedExpression = this.expressionStack.join('');
        this.isKeyMatched = true;
      }
    }
  }
}

new The24Game(5, 2, 7, 8).play(22);
