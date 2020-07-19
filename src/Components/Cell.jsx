import React from "react";

import { isBrowser } from 'react-device-detect';

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
  touchStart, 
  touchEnd, 
}) => {
  return (
    <StyleCell
      level={level}
      isClicked={isClicked}
      onTouchStart={touchStart}
      onTouchEnd={() => touchEnd(y, x)}
      // onContextMenu={(e) => isBrowser ? rightClick(e, y, x) : ''}
      index={index}
      onClick={() => singleClick(y, x)}
      neighbourBombs={neighbourBombs}
    >
      {console.log("cell load")}
      <div>
        {isBomb && gameOver
          ? "💣"
          : isFlagged
          ? "🚩"
          : neighbourBombs !== 0 && isClicked
          ? neighbourBombs
          : ""}
      </div>
    </StyleCell>
  );
};

export default React.memo(Cell);
