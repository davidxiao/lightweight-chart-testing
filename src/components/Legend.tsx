import * as ReactDOM from "react-dom";
import { PortalData } from "./model";

export const Legend = (props: PortalData) => {
  const { meta, series, paneRef } = props;
  return ReactDOM.createPortal(
    <div>
      <div>Legend</div>
    </div>,
    paneRef
  );
};
