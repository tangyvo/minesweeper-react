import React from "react";

import { StyleCell } from "./Styles/StyleCell";

const Cell = ({
  index,
  isBomb,
  level,
  isClicked,
  singleClick,
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
      onClick={() => singleClick(y, x)}
    >
      <div>
        {
          isBomb 
          ? "💣"
          : isFlagged 
          ? "🚩"
          : neighbourBombs
        }

      </div>
    </StyleCell>
  );
};

export default Cell;
