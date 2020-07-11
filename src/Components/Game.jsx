import React from "react";

import { StyleGame } from "./Styles/StyleGame";

import Cell from "./Cell";

const Game = ({ grid, level, clickHandler, gameOver }) => {
  return (
    <StyleGame level={level}>
      {grid.map((row) =>
        row.map((col) => (
          <Cell
            key={col.index}
            index={col.index}
            isBomb={col.isBomb}
            isClicked={col.isClicked}
            level={level}
            clickHandler={clickHandler}
            gameOver={gameOver}
          />
        ))
      )}
    </StyleGame>
  );
};

export default Game;
