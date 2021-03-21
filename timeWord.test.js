const { timeWord } = require("./timeWord");

describe("#timeword", () => {
  test("it is a function", () => {
    expect(typeof timeWord).toBe("function");
  });
  test("works: noon and midnight", () => {
    const noon = timeWord("12:00");
    expect(noon).toEqual("noon");
    const midnight = timeWord("00:00");
    expect(midnight).toEqual("midnight");
  });
  test("works: AM", () => {
    const time1 = timeWord("01:00");
    expect(time1).toEqual("one o'clock AM");
    const time2 = timeWord("09:35");
    expect(time2).toEqual("nine thirty-five AM");
  });
  test("works: PM", () => {
    const time1 = timeWord("13:00");
    expect(time1).toEqual("one o'clock PM");
    const time2 = timeWord("21:15");
    expect(time2).toEqual("nine fifteen PM");
  });
});
