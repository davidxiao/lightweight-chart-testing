import React, { useEffect, useRef, useState } from "react";

import { createChart, IChartApi } from "lightweight-charts";

import { Props } from "./model";

import { Legend } from "./Legend";

export const Demo = (props: Props) => {
  const { chartOptions, panes } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi>();
  const [seriesReady, setSeriesReady] = useState(false);
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
        console.log(`marker len=${markers?.length}`);
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
    setSeriesReady(true);
  }, [chart, panes]);
  useEffect(() => {
    if (!chart) return;
    console.log(`chart.getPaneElements:=${chart.getPaneElements().length}`);
    setPaneRefs(chart.getPaneElements());
  }, [chart, seriesReady]);

  useEffect(() => {
    console.log("try to subscribeCrosshairMove");
    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    const toolTip = document.createElement("div");
    toolTip.className = "floating-tooltip-2";
    const container = containerRef.current;
    if (!container) return;
    container.appendChild(toolTip);

    chart?.subscribeCrosshairMove(function (param) {
      console.log(`param:${JSON.stringify(param)}`);
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
        console.log("don't display");
      } else {
        console.log("display");
        const dateStr = new Date().toString();
        toolTip.style.display = "block";
        const price = 1200;
        toolTip.innerHTML =
          '<div style="color: #009688">Apple Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: #21384d">' +
          Math.round(100 * price) / 100 +
          '</div><div style="color: #21384d">' +
          dateStr +
          "</div>";

        const seriesData = param.seriesData;
        // console.log(`seriesData:`);
        // console.log(seriesData);
        const series = param.hoveredSeries;
        // console.log(`series:`);
        // console.log(series);
        const coordinate = series?.priceToCoordinate(price) || 100;
        // console.log(`param.hoveredMarkerId=${param.hoveredMarkerId}`);
        // console.log(`param.paneIndex=${param.paneIndex}`);
        // console.log(`########## .  ###### coordinate=${coordinate}`);
        var shiftedCoordinate = param.point.x - 50;

        if (!coordinate) {
          return;
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate)
        );
        const coordinateY =
          coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(
                0,
                Math.min(
                  container.clientHeight - toolTipHeight - toolTipMargin,
                  coordinate + toolTipMargin
                )
              );
        toolTip.style.left = shiftedCoordinate + "px";
        toolTip.style.top = (param.paneIndex || 0) * 200 + coordinateY + "px";
      }
    });
  }, [chart]);

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
    </div>
  );
};
