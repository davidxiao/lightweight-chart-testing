import React from "react";
import "./App.css";
import { TradingView } from "./components/tradingview";
import { Demo } from "./components/Demo";
import { Simple } from "./components/Simple";

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
      <Demo
        colors={{
          backgroundColor: "white",
          lineColor: "#2962FF",
          textColor: "black",
        }}
      ></Demo>
    </div>
  );
}

export default App;
