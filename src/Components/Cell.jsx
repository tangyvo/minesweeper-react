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
  rightClick,
  isFlagged,
}) => {

  return (
    <StyleCell
      level={level}
      isClicked={isClicked}
      onContextMenu={(e) => rightClick(e, y, x)}
      index={index}
      onClick={() => clickHandler(y, x)}
      // onDoubleClick={(e) => clickHandler(e, y, x)}
    >
      <div>
        {isBomb && gameOver
          ? "💣"
          : isFlagged
          ? "🚩"
          : neighbourBombs !== 0
          ? neighbourBombs
          : ""}
      </div>
    </StyleCell>
  );
};

export default Cell;
