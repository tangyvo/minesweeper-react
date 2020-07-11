import React from "react";

import { StyleCell } from "./Styles/StyleCell";

const Cell = ({ index, isBomb, level, isClicked, clickHandler, gameOver }) => {
  return (
    <StyleCell
      level={level}
      isClicked={isClicked}
      index={index}
      onClick={(e) => clickHandler(e, index)}
    >
      <div>{isBomb && gameOver ? "💣" : ""}</div>
    </StyleCell>
  );
};

export default Cell;
