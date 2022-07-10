import React, { useEffect, useRef, useState } from "react";

import { createChart, IChartApi } from "lightweight-charts";

import { Props } from "./model";

import { Legend } from "./Legend";
import { ToolTip } from "./ToolTip";

export const Demo = (props: Props) => {
  const { chartOptions, panes } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi>();
  const [paneRefs, setPaneRefs] = useState<HTMLElement[]>();
  useEffect(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }
    // create chart with chart options
    const chart = createChart(containerRef.current, chartOptions);
    setChart(chart);

    return () => {
      setChart(undefined);
      chart?.remove();
    };
  }, [chartOptions, panes]);
  useEffect(() => {
    const resizeHandler = () => {
      if (!containerRef || !containerRef.current) {
        return;
      }
      chart?.resize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [chart]);

  useEffect(() => {
    panes.forEach((pane, paneIdx) => {
      pane.series.forEach((series) => {
        if (!chart) return;
        const { markers } = series;
        const { type, ...options } = {
          ...series.options,
          pane: paneIdx,
        };
        let _series;
        switch (type) {
          case "Bar":
            _series = chart.addBarSeries(options);
            _series.setData(series.data);
            break;
          case "Candlestick":
            _series = chart.addCandlestickSeries(options);
            _series.setData(series.data);
            break;
          case "Area":
            _series = chart.addAreaSeries(options);
            _series.setData(series.data);
            break;
          case "Line":
            _series = chart.addLineSeries(options);
            _series.setData(series.data);
            if (markers) _series.setMarkers(markers);
            break;
          case "Histogram":
            _series = chart.addHistogramSeries(options);
            _series.setData(series.data);
            break;
          default:
        }
      });
    });

    if (!chart) return;
    setPaneRefs(chart.getPaneElements());
  }, [chart, panes]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: 250 + 200 * (panes.length - 1),
      }}
    >
      {paneRefs?.map((ref, idx) => {
        return (
          <Legend
            key={`legend-${panes[idx].meta.title}-${idx}`}
            paneRef={ref}
            meta={panes[idx].meta}
            series={panes[idx].series}
          ></Legend>
        );
      })}
      {paneRefs?.map((ref, idx) => {
        return (
          <ToolTip
            key={`tooltip-${panes[idx].meta.title}-${idx}`}
            paneRef={ref}
            meta={panes[idx].meta}
            series={panes[idx].series}
          ></ToolTip>
        );
      })}
    </div>
  );
};
