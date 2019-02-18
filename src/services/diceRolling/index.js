/**
 *
 * @param {number} numberOfDice
 * @param {number} sides
 */
export const randomDiceRoll = (numberOfDice, sides) => {
  let i = 0;
  const results = [];
  for (i = 0; i < numberOfDice; i++) {
    const r = getRandomNumber(sides) + 1;
    results.push(r);
  }
  return results;
};

export const coinFlip = numberOfDice => {
  let i = 0;
  const results = [];
  for (i = 0; i < numberOfDice; i++) {
    const r = getRandomNumber(2);
    if (r === 0) {
      results.push("H");
    } else {
      results.push("T");
    }
  }
  return results;
};

const percentOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

export const percentRoll = numberOfDice => {
  let i = 0;
  const results = [];
  for (i = 0; i < numberOfDice; i++) {
    const r = getRandomNumber(percentOptions.length);
    results.push(percentOptions[r]);
  }
  return results;
};

const getRandomNumber = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
