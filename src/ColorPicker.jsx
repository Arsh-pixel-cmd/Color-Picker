import React, { useState } from "react";

function ColorPicker() {
  const [color, setColor] = useState("#cf7da0");
  const [copied, setCopied] = useState(false);

  function handleColorChange(event) {
    setColor(event.target.value);
    setCopied(false);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // Helper: Decide if text should be white or black
  function getTextColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "#000" : "#fff";
  }

  return (
    <div className="color-picker-container">
      <h1>🎨 Color Picker</h1>

      <div
        className="color-display tooltip"
        style={{ backgroundColor: color }}
        onClick={copyToClipboard}
      >
        <p style={{ color: getTextColor(color) }}>
          Selected Color: <span>{color}</span>
        </p>

        {/* ✅ Adaptive toast */}
        {copied && (
          <div
            className="toast"
            style={{
              background: getTextColor(color) === "#000" ? "#333" : "#fff",
              color: getTextColor(color) === "#000" ? "#fff" : "#000",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <span className="checkmark">✔</span>✅ Copied!
          </div>
        )}

        <span className="tooltip-text">Click to copy</span>
      </div>

      <button className="copy-btn" onClick={copyToClipboard}>
        📋 Copy Color
      </button>

      <label>
        Pick a Color
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
    </div>
  );
}

export default ColorPicker;
