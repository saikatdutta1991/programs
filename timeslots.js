 _intervalChunks(start, end, step) {
    start = Moment(start);
    end = Moment(end);
    const range = Moment.range(start, end);
    return _.map(Array.from(range.by("minutes", { step })), time => {
      return time.format("YYYY-MM-DDTHH:mm:ss");
    });
  }
