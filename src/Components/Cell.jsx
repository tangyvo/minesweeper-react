import React from "react";

import { StyleCell } from "./Styles/StyleCell";

const Cell = ({ index, isBomb, level }) => {
  return (
    <StyleCell level={level} index={index}>
      <div>{isBomb ? "💣" : index}</div>
    </StyleCell>
  );
};

export default Cell;
