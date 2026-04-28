import React, { useState } from "react";
import SleekScrollbar, { ScrollbarSide } from "../src/index";

const LONG_CONTENT = Array.from({ length: 150 }, (_, i) => `Item ${i + 1}`);

export default function App() {
  const [side, setSide] = useState<"left" | "right">(ScrollbarSide.right);
  const [thumbMinHeight, setThumbMinHeight] = useState(20);
  const [thumbColor, setThumbColor] = useState("#d9d9d9");
  const [thumbHoverColor, setThumbHoverColor] = useState("#bfbfbf");
  const [trackColor, setTrackColor] = useState("#e8e8e8");
  const [width, setWidth] = useState(6);

  const cssVars = {
    "--react-scrollify-thumb": thumbColor,
    "--react-scrollify-thumb-hover": thumbHoverColor,
    "--react-scrollify-track": trackColor,
    "--react-scrollify-width": `${width}px`,
  } as React.CSSProperties;

  return (
    <div style={{ fontFamily: "sans-serif", padding: 32 }}>
      <h2>Sleek Scroll Demo</h2>

      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <label>
          Side:&nbsp;
          <select
            value={side}
            onChange={(e) => setSide(e.target.value as "left" | "right")}
          >
            <option value={ScrollbarSide.right}>right</option>
            <option value={ScrollbarSide.left}>left</option>
          </select>
        </label>

        <label>
          thumbMinHeight:&nbsp;
          <input
            type="number"
            value={thumbMinHeight}
            min={0}
            max={100}
            onChange={(e) => setThumbMinHeight(Number(e.target.value))}
            style={{ width: 60 }}
          />
          %
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Thumb:
          <input
            type="color"
            value={thumbColor}
            onChange={(e) => setThumbColor(e.target.value)}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Thumb hover:
          <input
            type="color"
            value={thumbHoverColor}
            onChange={(e) => setThumbHoverColor(e.target.value)}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Track:
          <input
            type="color"
            value={trackColor}
            onChange={(e) => setTrackColor(e.target.value)}
          />
        </label>

        <label>
          Width:&nbsp;
          <input
            type="number"
            value={width}
            min={1}
            max={40}
            onChange={(e) => setWidth(Number(e.target.value))}
            style={{ width: 50 }}
          />
          px
        </label>
      </div>

      <div
        style={{
          height: 300,
          width: 300,
          border: "1px solid #ccc",
          ...cssVars,
        }}
      >
        <SleekScrollbar side={side} thumbMinHeight={thumbMinHeight}>
          <div>
            {LONG_CONTENT.map((item) => (
              <div
                key={item}
                style={{ padding: "8px 16px", borderBottom: "1px solid #eee" }}
              >
                {item}
              </div>
            ))}
          </div>
        </SleekScrollbar>
      </div>
    </div>
  );
}
