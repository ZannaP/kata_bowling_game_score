export function scoreBowlingGame(rolls: string, framesCount = 10) {
  let move = 0;
  const score = prepareData(rolls)
    .split("")
    .reduce((sum, currentThrow, id, rolls) => {
      console.log("id= " + id, rolls[id]);

      if (move < framesCount * 2) {
        if (Number(currentThrow)) {
          sum += parseInt(currentThrow);
        } else {
          switch (currentThrow) {
            case "/":
              Number(rolls[id - 1])
                ? (sum += 10 - parseInt(rolls[id - 1]))
                : (sum += 10); // previous roll is '-'
              Number(rolls[id + 1])
                ? (sum += parseInt(rolls[id + 1]))
                : (sum += convertScore(rolls[id + 1]));
              break;
            case "X":
              sum += 10;
              Number(rolls[id + 1])
                ? (sum += parseInt(rolls[id + 1]))
                : (sum += convertScore(rolls[id + 1]));
              Number(rolls[id + 2])
                ? (sum += parseInt(rolls[id + 2]))
                : (sum += convertScore(rolls[id + 2], rolls[id + 1]));
              ++move;
              break;
          }
        }
      }
      console.log("move ", move, " sum=", sum);
      ++move;
      return sum;
    }, 0);
  return score;
}

export function convertScore(char: string, previous = "") {
  let score: number;
  switch (char) {
    case "X":
      score = 10;
      break;
    case "/":
      if (Number(previous)) {
        score = 10 - parseInt(previous);
      } else {
        if (previous === "-") {
          score = 10;
        }
      }
      break;
    default:
      score = 0;
  }
  return score;
}

export function prepareData(str: string) {
  return str.toUpperCase().replaceAll(" ", "");
}
