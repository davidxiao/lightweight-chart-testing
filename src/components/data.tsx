import { UTCTimestamp } from "lightweight-charts";
export function generateLineData(
  minValue: number,
  maxValue: number,
  maxDailyGainLoss = 1000
) {
  var res = [];
  var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
  for (var i = 0; i < 1500; ++i) {
    var previous: any = res.length > 0 ? res[res.length - 1] : { value: 0 };
    var newValue: any =
      previous.value +
      (Math.random() * maxDailyGainLoss * 2 - maxDailyGainLoss);

    res.push({
      time: (time.getTime() / 1000) as UTCTimestamp,
      value: Math.max(minValue, Math.min(maxValue, newValue)),
    });

    time.setUTCDate(time.getUTCDate() + 1);
  }

  return res;
}

export function generateHistogramData(minValue: number, maxValue: number) {
  var res = [];
  var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
  for (var i = 0; i < 1500; ++i) {
    res.push({
      time: (time.getTime() / 1000) as UTCTimestamp,
      value: minValue + Math.random() * (maxValue - minValue),
    });

    time.setUTCDate(time.getUTCDate() + 1);
  }

  return res;
}
