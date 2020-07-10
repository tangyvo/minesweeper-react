import React from "react";

import { StyleGame } from "./Styles/StyleGame";

import Cell from "./Cell";

const Game = ({ grid, level }) => {
  return (
    <StyleGame level={level}>
      {grid.map((row) =>
        row.map((col) => (
          <Cell key={col.index} index={col.index} isBomb={col.isBomb} level={level}/>
        ))
      )}
    </StyleGame>
  );
};

export default Game;
