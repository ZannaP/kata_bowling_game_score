import { scoreBowlingGame, convertScore, prepareData } from "../src/calc_score";
describe("test scoreBowlingGame function", () => {
  test("test case with ONLY NUMBERS in the string - just summarise", () => {
    // Arrange
    const rolls = "222";
    const expectedResult = 6;

    // Act
    const act = scoreBowlingGame(rolls);

    // Assert
    expect(act).toBe(expectedResult);
  });

  // '/' - spare case - add next throw (and bonus throw if it is the last roll)
  // I added optional parameter framesCount (by default is 10) to make testing process easier
  test("test '/' - SPARE case add 10 points for a throw + next throw)", () => {
    expect(scoreBowlingGame("2/35", 2)).toBe(21);
  });
  test("test '/' - SPARE case in the LAST ROLL add 10 points for the roll + points from 1 bonus roll", () => {
    expect(scoreBowlingGame("113/5", 2)).toBe(17);
  });

  // '-' cases - no pins knocked down
  test("ZERO points", () => {
    expect(scoreBowlingGame("------", 3)).toBe(0);
  });
  test("'-/' - add 10 points", () => {
    expect(scoreBowlingGame("-/----", 3)).toBe(10);
  });

  // 'x' - strike. The score for the frame is 10 + the simple total of the pins knocked down in his next two rolls.
  test("add 10 points for the STRIKE", () => {
    expect(scoreBowlingGame("X11", 2)).toBe(14);
  });
  test("add 10 points for the STRIKE in the LAST ROLL + 2 bonus rolls (not strikes)", () => {
    expect(scoreBowlingGame("11X22", 2)).toBe(16);
  });
  test("add 10 points for the STRIKE in the LAST ROLL + 1 bonus roll (strikes)", () => {
    expect(scoreBowlingGame("11XX", 2)).toBe(22);
  });
  test("add 10 points for the STRIKE in the LAST ROLL + 2 bonus roll (spare)", () => {
    expect(scoreBowlingGame("11X5/", 2)).toBe(22);
  });
  test("add 10 points for the STRIKE in the LAST ROLL + 2 bonus roll (first with no points, second - 10 points)", () => {
    expect(scoreBowlingGame("11X-/", 2)).toBe(22);
  });
  test("add 10 points for the STRIKE in the LAST ROLL + 2 bonus roll (last with no points)", () => {
    expect(scoreBowlingGame("11X5-", 2)).toBe(17);
  });
  test("add 10 points for the STRIKE in the LAST ROLL + 2 bonus roll (first with no points)", () => {
    expect(scoreBowlingGame("11X-5", 2)).toBe(17);
  });

  // Suggested Test Cases
  test("Suggested Test Cases 1", () => {
    expect(scoreBowlingGame("X X X X X X X X X X X X")).toBe(300);
  });
  test("Suggested Test Cases 2", () => {
    expect(scoreBowlingGame("9- 9- 9- 9- 9- 9- 9- 9- 9- 9- ")).toBe(90);
  });
  test("Suggested Test Cases 3", () => {
    expect(scoreBowlingGame("5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5")).toBe(150);
  });
});

describe("test convertScore function", () => {
  test("return 10 if argument is X", () => {
    expect(convertScore("X")).toBe(10);
  });
  test("return 0 if argument is not X", () => {
    expect(convertScore("-")).toBe(0);
  });
  test("return 8 if argument is '/' and previous == '2'", () => {
    expect(convertScore("/", "2")).toBe(8);
  });
  test("return 10 if argument is '/' and previous == '-'", () => {
    expect(convertScore("/", "-")).toBe(10);
  });
});

describe("test prepareData function", () => {
  test("test data preparation - UpperCase", () => {
    expect(prepareData("xxx")).toBe("XXX");
  });
  test("test data preparation - UpperCase and remove spaces", () => {
    expect(prepareData("x x x 5- 5/")).toBe("XXX5-5/");
  });
});
