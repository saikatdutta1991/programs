    function calculateIntervalsForOneDay(durationMinutes) {
        const MINUTE_TO_MILLISEC_MULTIPLIER = 60 * 1000;
        const DURATION_MILLIS = durationMinutes * MINUTE_TO_MILLISEC_MULTIPLIER;
        const ONE_MILLI = 1;

        const DAY = "1970-01-01";
        const startTime = new Date(`${DAY}T00:00:00Z`);
        const endTime = new Date(`${DAY}T23:59:59Z`);

        const intervals = [];
        let start = startTime.getTime();
        const end = endTime.getTime();
        while (start < end) {
            intervals.push({
                startTime: extractTimePartFromDate(new Date(start)),
                endTime: extractTimePartFromDate(new Date(start + DURATION_MILLIS - ONE_MILLI)),
            });
            start = start + DURATION_MILLIS;
        }
        return intervals;
    }

    function extractTimePartFromDate(date) {
        return date.toISOString().split('T')[1].split('.')[0];
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

    const INTERVAL_DURATION_MINUTES = 30;

    // Use this while fetching from and API and redering
    function extactAvaiableIntervalsFromBlockedIntervals(rawBlockedIntervals) {
        const intervalList1 = calculateIntervalsForOneDay(INTERVAL_DURATION_MINUTES);
        return extractNonOverlappingIntervals(intervalList1, rawBlockedIntervals);
    }

    // Use this while saving blocked intervals
    function extactBlockedIntervalsFromAvailableIntervals(availableIntervals) {
        const intervals = calculateIntervalsForOneDay(INTERVAL_DURATION_MINUTES);
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
        ])
    );

    console.log(
        extactBlockedIntervalsFromAvailableIntervals([
            { startTime: "00:00:00", endTime: "01:59:59" },
            { startTime: "09:00:00", endTime: "13:59:59" },
            { startTime: "17:00:00", endTime: "19:59:59" },
        ])
    );
    console.timeEnd("timeTaken");
