import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BarData,
  ChartOptions,
  createChart,
  CrosshairMode,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  LineData,
  SeriesType,
} from "lightweight-charts";
import { ChartContextProvider } from "./ChartContext";
import { ChartLegends } from "./ChartLegends";
import { ChartDefinition, SeriesDefinition, SeriesOptions } from "./interfaces";

interface SimpleChartProps extends DeepPartial<ChartOptions> {
  className?: string;
  children?: ReactNode;
  def?: ChartDefinition;
  data?: Record<string, LineData[] | BarData[]>;
}

interface ChartState {
  chart: IChartApi | null;
  sources: Record<string, ISeriesApi<SeriesType>>;
}

export const ChartRenderer: React.FunctionComponent<SimpleChartProps> = (
  props
) => {
  const { className, children, data = {}, ...options } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<ChartState>({ chart: null, sources: {} });

  const [paneRefs, setPaneRefs] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }
    const _chart = createChart(containerRef.current, {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      grid: {
        vertLines: {
          color: "rgba(213,213,213,0.5)",
        },
        horzLines: {
          color: "rgba(213,213,213,0.5)",
        },
      },
      timeScale: {
        rightOffset: 10,
        barSpacing: 15,
        // fixLeftEdge: true,
        // fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        visible: true,
        timeVisible: true,
        secondsVisible: true,
        // tickMarkFormatter: (time, tickMarkType, locale) => {
        //     console.log(time, tickMarkType, locale);
        //     const year = isBusinessDay(time) ? time.year : new Date(time * 1000).getUTCFullYear();
        //     return String(year);
        // },
      },
      overlayPriceScales: {
        scaleMargins: {
          top: 0.6,
          bottom: 0,
        },
      },
      rightPriceScale: {
        autoScale: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.08,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    setState({ chart: _chart, sources: {} });
    return () => {
      setState({ chart: null, sources: {} });
      _chart?.remove();
    };
  }, []);

  // FIX IT
  // useEffect(() => {
  //     state.chart?.applyOptions(options);
  // }, [state.chart, options]);

  useEffect(() => {
    const resizeHandler = () => {
      if (!containerRef || !containerRef.current) {
        return;
      }
      state.chart?.resize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [state.chart]);

  const addSeries: (
    options: SeriesDefinition & SeriesOptions,
    paneIndex: number
  ) => [string, ISeriesApi<SeriesType> | undefined] = useCallback(
    (options: SeriesDefinition & SeriesOptions, paneIndex: number) => {
      const key = options.key;
      const chart = state.chart;
      const seriesOptions = {
        ...options,
        pane: paneIndex,
      };

      if (!chart) return [key, undefined];
      let series;
      switch (options.type) {
        case "Bar":
          series = chart.addBarSeries(seriesOptions);
          break;
        case "Candlestick":
          series = chart.addCandlestickSeries(seriesOptions);
          break;
        case "Area":
          series = chart.addAreaSeries(seriesOptions);
          break;
        case "Line":
          series = chart.addLineSeries(seriesOptions);
          break;
        case "Histogram":
          series = chart.addHistogramSeries(seriesOptions);
          break;
        default:
      }

      return [key, series];
    },
    [state.chart]
  );

  useEffect(() => {
    setState((prev) => {
      const nextState = {
        ...prev,
        sources: { ...prev.sources },
      };

      const sources = nextState.sources || {};
      props.def?.layout.forEach((pane, paneIndex) => {
        pane.sources.forEach((source, sourceIndex) => {
          if (source.type === "SeriesGroup") {
            source.sources?.forEach((source, sourceIndex) => {
              const seriesOptions = {
                ...source,
                pane: paneIndex,
              };
              if (!sources[source.key]) {
                const [key, series] = addSeries(seriesOptions, paneIndex);
                if (!series) return;
                sources[key] = series;
              }
            });
          } else {
            const seriesOptions = {
              ...source,
              pane: paneIndex,
            };
            if (!sources[source.key]) {
              const [key, series] = addSeries(seriesOptions, paneIndex);
              if (!series) return;
              sources[key] = series;
            }
          }
        });
      });

      return nextState;
    });
  }, [state.chart, props.def]);

  useEffect(() => {
    setPaneRefs(state.chart!.getPaneElements());
  }, [state.chart, state.sources]);

  useEffect(() => {
    Object.entries(data).forEach(([key, data]) => {
      if (state.sources[key] && data) {
        state.sources[key].setData(data);
      }
    });
  }, [state.sources, data]);

  return (
    <div
      className={props.className}
      ref={containerRef}
      style={{
        position: "relative",
        height: 250 + 160 * (props.def!.layout.length - 1),
      }}
    >
      {state.chart && (
        <ChartContextProvider
          chart={state.chart}
          def={props.def}
          data={props.data}
          sources={state.sources}
          paneRefs={paneRefs}
        >
          <ChartLegends />
          {props.children}
        </ChartContextProvider>
      )}
    </div>
  );
};
