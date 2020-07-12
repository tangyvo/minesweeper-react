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
}) => {


  return (
    <StyleCell
      level={level}
      isClicked={isClicked}
      index={index}
      onClick={(e) => clickHandler(e, y, x)}
    >
      <div>{isBomb ? "💣" : neighbourBombs !== 0 ? neighbourBombs : ""}</div>
    </StyleCell>
  );
};

export default Cell;
