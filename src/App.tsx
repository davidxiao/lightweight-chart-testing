import React from "react";
import {
  SeriesType,
  SeriesMarker,
  Time,
  SeriesMarkerPosition,
  SeriesMarkerShape,
} from "lightweight-charts";
import "./App.css";
import { Demo } from "./components/Demo";
import { generateLineData, generateHistogramData } from "./components/data";

const line1 = generateLineData(20000, 30000, 100);
const histogram = generateHistogramData(1000, 9000);

const markers: SeriesMarker<Time>[] = [];
line1.forEach((line) => {
  const { time, value } = line;
  const id = time.toString();
  const sellOptions = {
    position: "aboveBar" as SeriesMarkerPosition,
    color: "#f68410",
    shape: "circle" as SeriesMarkerShape,
    text: "S",
  };
  const buyOptions = {
    position: "belowBar" as SeriesMarkerPosition,
    color: "#2196F3",
    shape: "circle" as SeriesMarkerShape,
    text: "B",
  };

  if (value > 21000) {
    markers.push({
      id,
      time,
      ...sellOptions,
    });
  }
  // if (value < 20100) {
  //   markers.push({
  //     time,
  //     ...buyOptions,
  //   });
  // }
});

const line2 = generateLineData(0, 100, 20);
const line3 = generateLineData(0, 100, 20);
const line4 = generateLineData(0, 100, 20);
const chartOptions = {
  // width: 400,
  // height: 600,
};
const panes = [
  {
    meta: {
      title: "test",
    },
    series: [
      {
        data: line1,
        markers,
        options: {
          type: "Line" as SeriesType,
          title: "primary",
          priceFormat: {
            minMove: 1,
            precision: 0,
          },
        },
      },
    ],
  },
  {
    meta: {
      title: "test",
    },
    series: [
      {
        data: histogram,
        options: {
          type: "Histogram" as SeriesType,
          secondary: "volume",
          priceScaleId: "",
        },
      },
    ],
  },
  {
    meta: {
      title: "test",
    },
    series: [
      {
        data: line2,
        options: {
          type: "Line" as SeriesType,
          title: "second",
          priceFormat: {
            minMove: 1,
            precision: 0,
          },
          color: "#ff0000",
        },
      },
      {
        data: line3,
        options: {
          type: "Line" as SeriesType,
          title: "second",
          priceFormat: {
            minMove: 1,
            precision: 0,
          },
          color: "#00ff00",
        },
      },
    ],
  },
  {
    meta: {
      title: "test",
    },
    series: [
      {
        data: line4,
        options: {
          type: "Line" as SeriesType,
          title: "third",
          priceFormat: {
            minMove: 1,
            precision: 0,
          },
        },
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      {/* <Simple
        colors={{
          backgroundColor: "white",
          lineColor: "#2962FF",
          textColor: "black",
          areaTopColor: "#2962FF",
          areaBottomColor: "rgba(41, 98, 255, 0.28)",
        }}
      ></Simple> */}
      {/* <Demo
        colors={{
          backgroundColor: "white",
          lineColor: "#2962FF",
          textColor: "black",
        }}
      ></Demo> */}
      <Demo chartOptions={chartOptions} panes={panes}></Demo>
    </div>
  );
}

export default App;
