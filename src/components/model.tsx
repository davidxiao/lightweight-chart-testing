import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { UTCTimestamp } from "lightweight-charts";

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
  AreaSeriesOptions,
  BarSeriesOptions,
  BaselineSeriesOptions,
  CandlestickSeriesOptions,
  HistogramSeriesOptions,
  LineSeriesOptions,
  SeriesMarker,
  Time,
  SeriesMarkerPosition,
  SeriesMarkerShape,
} from "lightweight-charts";

export interface Meta {
  title: string;
}

export interface Mark {
  time: UTCTimestamp;
  position: SeriesMarkerPosition;
  color: string;
  shape: SeriesMarkerShape;
  text: string;
}

export type SeriesOptions = { type: SeriesType } & (
  | AreaSeriesOptions
  | BarSeriesOptions
  | BaselineSeriesOptions
  | CandlestickSeriesOptions
  | HistogramSeriesOptions
  | LineSeriesOptions
);

export type Data = LineData | BarData;
export interface Series {
  data: Data[];
  markers?: SeriesMarker<Time>[];
  options: DeepPartial<SeriesOptions> & { groupID?: string };
}

export interface Pane {
  meta: Meta;
  series: Series[];
}
export interface Props {
  chartOptions: DeepPartial<ChartOptions>;
  panes: Pane[];
}

export interface PortalData {
  meta: Meta;
  series: Series[];
  marks?: Mark[];
  paneRef: HTMLElement;
}
