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
      neighbourBombs={neighbourBombs}
    >
      <div>
        {
          isBomb && gameOver
          ? "💣"
          : isFlagged 
          ? "🚩"
          : neighbourBombs !== 0 && isClicked
          ? neighbourBombs
          : ''
        }

      </div>
    </StyleCell>
  );
};

export default Cell;
