import {
  AreaSeriesPartialOptions,
  BarPrice,
  BarSeriesPartialOptions,
  BusinessDay,
  CandlestickSeriesPartialOptions,
  DeepPartial,
  HistogramSeriesPartialOptions,
  LineSeriesPartialOptions,
  OhlcData,
  SeriesOptionsCommon,
  SeriesType,
  UTCTimestamp,
} from "lightweight-charts";
import React from "react";
import { SubscriptionDatasource } from "./interfaces/datasource";

export interface MetadataDefinition {
  name: string;
  symbol: string;
}

export interface CrosshairState {
  time?: UTCTimestamp | BusinessDay | string;
  value?: BarPrice;
  prices?: Omit<OhlcData, "time">;
}

export interface LegendFormatterProps {
  metadata?: MetadataDefinition;
  value?: CrosshairState;

  datasource?: SubscriptionDatasource;
  // child data sources
  sources?: ReadonlyArray<SeriesDefinition>;
  values?: ReadonlyArray<CrosshairState>;
  title?: string;
}

export type LegendFormatter = React.FunctionComponent<LegendFormatterProps>;

export interface SourceBaseDefinition {
  type: SeriesType | "SeriesGroup";
  /**
   * title of the series group, to be placed in the legend
   */
  title?: string;
  legend?: LegendFormatter;

  datasource?: SubscriptionDatasource;
}

export interface SeriesDefinition
  extends SourceBaseDefinition,
    DeepPartial<SeriesOptionsCommon> {
  key: string;
  /**
   * title of the series
   */
  title?: string;
  color?: string;
  type: SeriesType;
  params?: Record<string, any>;
}

export interface SeriesGroupDefinition extends SourceBaseDefinition {
  type: "SeriesGroup";
  key?: string;
  sources?: ReadonlyArray<SeriesDefinition>;
}

export type SeriesOptions =
  | AreaSeriesPartialOptions
  | BarSeriesPartialOptions
  | CandlestickSeriesPartialOptions
  | HistogramSeriesPartialOptions
  | LineSeriesPartialOptions;
export type SourceDefinition =
  | (SeriesDefinition & SeriesOptions)
  | SeriesGroupDefinition;

export interface PaneDefinition {
  sources: ReadonlyArray<SourceDefinition>;
}

export type ChartLayout = ReadonlyArray<PaneDefinition>;

export interface ChartDefinition {
  metadata: MetadataDefinition;
  timeframe: "PT24H";
  layout: ChartLayout;
}
