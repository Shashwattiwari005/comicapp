import React from "react";
import { useAppContext } from "../context/context";

export default function ScriptLines() {
  const { scriptLines } = useAppContext();

  return (
    <div>
      {scriptLines.map((line, index) => (
        <p key={index} style={{ margin: "10px" }}>
          {index + 1}.{line}.
        </p>
      ))}
    </div>
  );
}
