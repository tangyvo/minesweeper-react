import React from "react";

import { StyleGame } from "./Styles/StyleGame";

import Cell from "./Cell";

const Game = ({ grid, level, clickHandler, gameOver, addFlag }) => {
  return (
    <StyleGame level={level}>
      {grid.map((row) =>
        row.map((col) => (
          <Cell
            key={col.index}
            index={col.index}
            isBomb={col.isBomb}
            isFlagged={col.isFlagged}
            neighbourBombs={col.neighbourBombs}
            x={col.x}
            y={col.y}
            isClicked={col.isClicked}
            level={level}
            clickHandler={clickHandler}
            gameOver={gameOver}
            addFlag={addFlag}
          />
        ))
      )}
    </StyleGame>
  );
};

export default Game;
