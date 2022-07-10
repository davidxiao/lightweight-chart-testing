import * as ReactDOM from "react-dom";
import { PortalData } from "./model";

export const ToolTip = (props: PortalData) => {
  const { meta, marks, series, paneRef } = props;
  return ReactDOM.createPortal(
    <div>
      <div>Tooltip</div>
    </div>,
    paneRef
  );
};
