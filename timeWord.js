/* Given a valid string, time,
 * with a two-digit hour 00-23 and a two-digit minute 00-59
 * e.g., "10:23", "21:15",
 * returns the time based in a 12hr AM/PM system expressed in words,
 * e.g., "ten twenty-three AM", "nine fifteen PM".
 **/

function timeWord(time) {
  const splitTime = time.split(":");
  let hrMin = {};
  hrMin.hour = parseInt(splitTime[0]);
  hrMin.minute = parseInt(splitTime[1]);
  // First check if it's noon or midnight
  if (hrMin.hour === 0 && hrMin.minute === 0) {
    return "midnight";
  } else if (hrMin.hour === 12 && hrMin.minute === 0) {
    return "noon";
  }
  // Determine the hour
  const hours = [
    "twelve",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
  ];
  if (hrMin.hour < 12) {
    hrMin.hour = hours[hrMin.hour];
    hrMin.amPm = "AM";
  } else if (hrMin.hour >= 12) {
    hrMin.hour = hours[hrMin.hour - 12];
    hrMin.amPm = "PM";
  }
  // Determine the minute
  if (hrMin.minute === 0) {
    hrMin.minute = "o'clock";
    // console.log(`${hrMin.hour} ${hrMin.minute} ${hrMin.amPm}`);
    return `${hrMin.hour} ${hrMin.minute} ${hrMin.amPm}`;
  }
  const aughts = hours.slice(1, 10);
  if (hrMin.minute > 0 && hrMin.minute < 10) {
    hrMin.minute = `oh ${aughts[hrMin.minute - 1]}`;
  } else if (hrMin.minute >= 10) {
    if (hrMin.minute % 10 === 0) {
      const div10s = {
        10: "ten",
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
      };
      hrMin.minute = div10s[hrMin.minute];
    } else if (hrMin.minute < 20) {
      const teens = {
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
      };
      hrMin.minute = teens[hrMin.minute];
    } else if (hrMin.minute < 30) {
      hrMin.minute = `twenty-${aughts[hrMin.minute - 21]}`;
    } else if (hrMin.minute < 40) {
      hrMin.minute = `thirty-${aughts[hrMin.minute - 31]}`;
    } else if (hrMin.minute < 50) {
      hrMin.minute = `forty-${aughts[hrMin.minute - 41]}`;
    } else if (hrMin.minute < 60) {
      hrMin.mintute = `fifty-${aughts[hrMin.minute - 51]}`;
    }
  }
  //   console.log(`${hrMin.hour} ${hrMin.minute} ${hrMin.amPm}`);
  return `${hrMin.hour} ${hrMin.minute} ${hrMin.amPm}`;
}

// timeWord("13:10");
// timeWord("12:12");
// timeWord("6:00");
// timeWord("23:29");

module.exports = { timeWord };
