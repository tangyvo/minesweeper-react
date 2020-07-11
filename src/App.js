import React, { useState, useEffect } from "react";

// import styling
import { StyleMenu } from "./Components/Styles/StyleMenu";
import { StyleBody } from "./Components/Styles/StyleBody";

// import Components
import Game from "./Components/Game";
import Level from "./Components/Level";
import Flags from "./Components/Flags";
import Timer from "./Components/Timer";
import GameOver from "./Components/GameOver";

const App = () => {
  const [level, setLevel] = useState(9);
  const [grid, setGrid] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // reset game when switching levels
  useEffect(() => {
    reset();
  }, [level]);

  const reset = () => {
    setBombs([]);
    setClicked([]);
    setGameOver(false);
    calcBomb();
    updateGrid();
  };

  const levelChange = (e) => {
    setLevel(e.target.value);
  };

  const calcBomb = () => {
    const bombArr = [];
    const totalBlocks = level * level;
    while (bombArr.length < level * 1.5) {
      let randIndex = Math.floor(Math.random() * totalBlocks);
      if (!bombArr.includes(randIndex)) {
        bombArr.push(randIndex);
      }
    }
    setBombs(bombArr);
  };

  const updateGrid = () => {
    let gridCopy = [];
    for (let y = 0; y < level; y++) {
      gridCopy.push([]);
      for (let x = 0; x < level; x++) {
        gridCopy[y].push({
          index: y * level + x,
          y: y,
          x: x,
          isBomb: bombs.includes(y * level + x) ? true : false,
          isClicked: clicked.includes(y * level + x) ? true : false,
          neighbourBombs: calcNeighbourBombs(y, x),
        });
      }
    }
    setGrid(gridCopy);
  };

  const clickHandler = (e, index) => {
    e.preventDefault();
    console.log(e.button);
    e.persist();
    if (e.button === 0) {
      if (clicked.includes(index)) return;
      setClicked((prev) => [...prev, index]);
    } else if (e.button === 2) {
      e.preventDefault();
    }
  };

  const checkGameOver = () => {
    if (bombs.includes(clicked[clicked.length - 1])) {
      setGameOver(true);
    }
  };

  const calcNeighbourBombs = (y, x) => {
    let numBombs = 0;
    const yArr = [y - 1, y, y + 1];
    const xArr = [x - 1, x, x + 1];

    yArr.forEach((row, col) => {
      if (row < 0 || col < 0 || grid[row][xArr[col]] === undefined) return;
      console.log(row, col);
      if (grid[row][xArr[col]].isBomb) {
        numBombs++;
      }
    });

    return numBombs;
  };

  useEffect(() => {
    if (gameOver) return;
    updateGrid();
    checkGameOver();
    calcNeighbourBombs();
    console.log(grid);
  }, [bombs, clicked]);

  return (
    <>
      <StyleBody>
        <StyleMenu>
          <Level levelChange={levelChange} level={level} />
          <Flags />
          <Timer />
        </StyleMenu>
        <Game
          grid={grid}
          level={level}
          bombs={bombs}
          clickHandler={clickHandler}
          gameOver={gameOver}
        />
        <GameOver gameOver={gameOver} reset={reset} />
      </StyleBody>
    </>
  );
};

export default App;
