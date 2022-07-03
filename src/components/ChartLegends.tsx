import * as ReactDOM from "react-dom";
import { useChart } from "./ChartContext";
import { SeriesDefinition, CrosshairState } from "./interfaces";
export const ChartLegends: React.FunctionComponent<ChartLegendsProps> = (
  props
) => {
  const { crosshair, sources, paneRefs, def, data = {} } = useChart();

  const styles = useStyles();

  return (
    <>
      {def?.layout.flatMap((pane, paneIndex) => {
        if (!paneRefs[paneIndex]) {
          return null;
        }

        return ReactDOM.createPortal(
          <div className={styles.legend}>
            {pane.sources.map((sourceDef, index) => {
              const _sources: ReadonlyArray<SeriesDefinition> =
                sourceDef.type === "SeriesGroup"
                  ? sourceDef.sources
                  : [sourceDef];
              const values: CrosshairState[] = _sources.map((subSourceDef) =>
                getBar(
                  sources[subSourceDef.key],
                  crosshair,
                  getLastPrice(data[subSourceDef.key])
                )
              );

              let legend: React.ReactElement;
              switch (
                sourceDef.type
                // code to build the legend component
              ) {
              }

              return <p key={sourceDef.key}>{legend}</p>;
            })}
          </div>,
          paneRefs[paneIndex]
        );
      })}
    </>
  );
};
