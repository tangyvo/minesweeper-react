import React from "react";

import { StyleCell } from "./Styles/StyleCell";

const Cell = ({
  index,
  isBomb,
  level,
  isClicked,
  clickHandler,
  gameOver,
  x,
  y,
  neighbourBombs,
  addFlag,
  isFlagged

}) => {
  return (
    <StyleCell
      level={level}
      isClicked={isClicked}
      onContextMenu={(e) => addFlag(e, y, x)}
      index={index}
      onClick={() => clickHandler(y, x, index)}
    >
      <div>
        {isBomb && gameOver
          ? "💣"
          : isFlagged 
          ? '🚩'
          : neighbourBombs !== 0
          ? neighbourBombs
          : ""}
      </div>
    </StyleCell>
  );
};

export default Cell;
