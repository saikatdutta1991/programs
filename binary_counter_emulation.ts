type Binary = number;
const HIGH: Binary = 1;
const LOW: Binary = 0;

// It's difficult to simulate clock pulse as it is analog
// The work around is to think clock pulse as sequence of LOW-HIGH-LOW
// This Toggle Flip-Flop change it's state on the falling edge of a clock signal
// Means this will toggle when singal changes from HIGH > LOW
interface ToggleFlipFlop {
  reset(): void;
  set(input: Binary): ToggleFlipFlop;

  // Returns the current state, its basically output.
  // it's difficult to simlate analog current flow
  // So we need to call this to get the ouptput at that instant.
  get(): Binary;
}

class ToggleFF implements ToggleFlipFlop {
  private QBit: Binary;
  private lastClockSignal: Binary;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.QBit = LOW;
    this.lastClockSignal = LOW;
  }

  public set(input: Binary): ToggleFlipFlop {
    if (this.lastClockSignal === HIGH && input === LOW) {
      this.toggleQBit();
    }

    this.lastClockSignal = input;

    return this;
  }

  private toggleQBit(): void {
    this.QBit = HIGH + LOW - this.QBit;
  }

  public get(): Binary {
    return this.QBit;
  }

  public toString() {
    return this.QBit ? 'HIGH' : 'LOW';
  }
}

class BinaryCounter {
  // index starts from MSB to LSB
  private ffs: ToggleFlipFlop[] = [];

  constructor(numberOfBits: number = 0) {
    if (numberOfBits < 1) {
      throw new Error('Minimum 1 bit is required');
    }
    this.initFFs(numberOfBits);
    this.reset();
  }

  private initFFs(numberOfBits: number) {
    for (let i = 0; i < numberOfBits; i += 1) {
      this.ffs.push(new ToggleFF());
    }
  }

  public reset() {
    this.ffs.forEach((ff) => ff.reset());
  }

  public clockPulse(): void {
    const ffs = [...this.ffs].reverse(); // index start with LSB now

    let prevFFOutput = ffs[0].set(LOW).set(HIGH).set(LOW).get();

    for (let i = 1; i < ffs.length; i++) {
      prevFFOutput = ffs[i].set(prevFFOutput).get();
    }
  }

  private getBinaryString() {
    return this.ffs.map((ff) => ff.get()).join('');
  }

  public getDecinalValue() {
    return parseInt(this.getBinaryString(), 2);
  }

  public toString() {
    const decimalValue = parseInt(this.getBinaryString(), 2);
    return (
      this.ffs.map((ff) => ff.toString()).join(':') + ` --> ${decimalValue}`
    );
  }
}

console.log('Simulation starts....');
const numberOfBits = 15;
const counter = new BinaryCounter(numberOfBits);

const ONE_SECOND = 1000;

let secondsPassed = 0;

setInterval(() => {
  counter.reset();
  for (let c = 1; c < Math.pow(2, numberOfBits); c += 1) {
    counter.clockPulse();
  }

  if (counter.getDecinalValue() === Math.pow(2, numberOfBits) - 1) {
    secondsPassed;
  }

  console.log(
    'counter.getDecinalValue()',
    counter.getDecinalValue(),
    'secondsPassed',
    secondsPassed++
  );
}, ONE_SECOND);
