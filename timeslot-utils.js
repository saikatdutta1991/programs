function getCalculatedIntervals(startTime, endTime, durationMinutes) {
  const MINUTE_TO_MILLISEC_MULTIPLIER = 60 * 1000;
  const DURATION_MILLIS = durationMinutes * MINUTE_TO_MILLISEC_MULTIPLIER;
  const ONE_MILLI = 1;
  const intervals = [];
  let start = startTime.getTime();
  const end = endTime.getTime();
  while (start < end) {
    intervals.push({
      startTime: new Date(start),
      endTime: new Date(start + DURATION_MILLIS - ONE_MILLI),
    });
    start = start + DURATION_MILLIS;
  }
  return intervals;
}
function isIntervalsOverlapped(i1, i2) {
  return i1.startTime < i2.endTime && i1.endTime >= i2.startTime;
}
function extractNonOverlappingIntervals(intervalList1, intervalList2) {
  return intervalList1.filter(
    (interval1) =>
      !intervalList2.find((interval2) =>
        isIntervalsOverlapped(interval1, interval2)
      )
  );
}

const DAY = "1970-01-01";
const DAY_START = `${DAY}T00:00:00Z`;
const DAY_END = `${DAY}T23:59:59Z`;
const INTERVAL_DURATION_MINUTES = 30;

function parseIntervalsAsString(intervalsStrings) {
  return intervalsStrings.map((interval) => ({
    startTime: new Date(`${DAY}T${interval.startTime}Z`),
    endTime: new Date(`${DAY}T${interval.endTime}Z`),
  }));
}

// Use this while fetching from and API and redering
function extactAvaiableIntervalsFromBlockedIntervals(rawBlockedIntervals) {
  const intervalList1 = getCalculatedIntervals(
    new Date(DAY_START),
    new Date(DAY_END),
    INTERVAL_DURATION_MINUTES
  );
  const intervalList2 = parseIntervalsAsString(rawBlockedIntervals);
  return extractNonOverlappingIntervals(intervalList1, intervalList2);
}

// Use this while saving blocked intervals
function extactBlockedIntervalsFromAvailableIntervals(rawAvailableIntervals) {
  const intervals = getCalculatedIntervals(
    new Date(DAY_START),
    new Date(DAY_END),
    30
  );
  const availableIntervals = parseIntervalsAsString(rawAvailableIntervals);

  intervals.forEach((interval) => {
    interval.isAvailable = !!availableIntervals.find((availableInterval) =>
      isIntervalsOverlapped(interval, availableInterval)
    );
  });

  const chunks = [];
  let chunk = [];
  intervals.forEach((interval, index) => {
    if (!interval.isAvailable) {
      chunk.push(interval);
    }

    if (
      (interval.isAvailable && chunk.length) ||
      index + 1 === intervals.length
    ) {
      chunks.push(chunk);
      chunk = [];
    }
  });

  const blockedIntervals = chunks.map((chunk) => ({
    startTime: chunk[0].startTime,
    endTime: chunk[chunk.length - 1].endTime,
  }));

  return blockedIntervals;
}

console.time("timeTaken");
console.log(
  extactAvaiableIntervalsFromBlockedIntervals([
    { startTime: "09:00:00", endTime: "13:59:59" },
    { startTime: "17:00:00", endTime: "19:59:59" },
  ]).map((interval) => {
    return {
      startTime: interval.startTime.toISOString(),
      endTime: interval.endTime.toISOString(),
    };
  })
);

console.log(
  extactBlockedIntervalsFromAvailableIntervals([
    { startTime: "00:00:00", endTime: "01:59:59" },
    { startTime: "09:00:00", endTime: "13:59:59" },
    { startTime: "17:00:00", endTime: "19:59:59" },
  ]).map((interval) => {
    return Object.assign(interval, {
      startTime: interval.startTime.toISOString(),
      endTime: interval.endTime.toISOString(),
    });
  })
);
console.timeEnd("timeTaken");
