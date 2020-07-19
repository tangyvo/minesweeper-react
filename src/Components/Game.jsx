import React from "react";

import { StyleGame } from "./Styles/StyleGame";

import Cell from "./Cell";

const Game = ({ grid, level, singleClick, gameOver, rightClick, touchStart, touchEnd }) => {
  return (
    <StyleGame level={level}>
    {/* { console.log('load game') } */}
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
            singleClick={singleClick}
            gameOver={gameOver}
            rightClick={rightClick}
            touchStart={touchStart}
            touchEnd={touchEnd}
          />
        ))
      )}
    </StyleGame>
  );
};

export default React.memo(Game);
