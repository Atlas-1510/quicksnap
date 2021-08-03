import React from "react";
import "./GlassBox.css";

function GlassBox({ children }) {
  return <div className="glassBox p-4">{children}</div>;
}

export default GlassBox;
