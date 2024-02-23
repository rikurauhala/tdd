function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function diceHandValue(roll1 = diceRoll, roll2 = diceRoll) {
  const die1 = roll1();
  const die2 = roll2();
  if (die1 === die2) {
    return 100 + die1;
  } else {
    return Math.max(die1, die2);
  }
}
