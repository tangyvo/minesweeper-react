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
  let bombCount = level;
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flagTotal, setFlagTotal] = useState(bombCount);
  const [isBombsAdded, setIsBombsAdded] = useState(false);
  const [revealMultiple, setRevealMultiple] = useState([]);
  const [showCells, setShowCells] = useState(false);
  const [cellsToCheck, setCellsToCheck] = useState([]);

  // reset game when switching levels
  useEffect(() => {
    reset();
  }, [level]);

  // timer starts/ends when game starts/ends
  useEffect(() => {
    const countDown = setInterval(() => {
      // dont increment timer when player wins or loses
      if (gameOver || gameWon) {
        return;
      }
      // increment second if game is in play
      else if (isPlaying) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    // clean up timer when restarting game
    return () => clearInterval(countDown);
  }, [isPlaying]);

  // update grid once bombs have been re-calculated
  useEffect(() => {
    updateGrid();
  }, [bombs]);

  useEffect(() => {
    if (isBombsAdded) {
      addNeighourBombCount();
    }
  }, [isBombsAdded]);

  // funct that resets everything
  const reset = () => {
    setGameOver(false);
    setGameWon(false);
    setIsPlaying(false);
    setFlagTotal(bombCount);
    setClickCount(0);
    setTimer(0);
    calcBomb();
    updateGrid();
    setIsBombsAdded(false);
  };

  // set level state
  const levelChange = (e) => {
    setLevel(e.target.value);
  };

  // randomly generate x number of bombs depending on level and add to bomb array
  const calcBomb = () => {
    const bombArr = [];
    const totalBlocks = level * level;
    while (bombArr.length < bombCount) {
      let randIndex = Math.floor(Math.random() * totalBlocks);
      if (!bombArr.includes(randIndex)) {
        bombArr.push(randIndex);
      }
    }
    setBombs(bombArr);
  };

  // update grid array and cell object
  const updateGrid = () => {
    if (bombs.length !== bombCount) return;
    let gridCopy = [];
    for (let y = 0; y < level; y++) {
      gridCopy.push([]);
      for (let x = 0; x < level; x++) {
        gridCopy[y].push({
          index: y * level + x,
          y: y,
          x: x,
          isBomb: bombs.includes(y * level + x) ? true : false,
          isClicked: false,
          neighbourBombs: 0,
          isFlagged: false,
        });
      }
    }
    setGrid([...gridCopy]);
    setIsBombsAdded(true);
  };

  // add and remove flag from grid object
  const rightClick = (e, y, x) => {
    e.persist();
    if (e.button !== 2) return;
    e.preventDefault();
    addFlag(y, x);
  };

  // adds flag to a cell
  const addFlag = (y, x) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));

    if (grid[y][x].isFlagged) {
      gridCopy[y][x].isFlagged = false;
      setFlagTotal((prev) => prev + 1);
    } else if (grid[y][x].isClicked === false) {
      gridCopy[y][x].isFlagged = true;
      setFlagTotal((prev) => prev - 1);
    }

    setGrid(gridCopy);
  };

  // runs when player clicks on a cell
  const singleClick = (y, x) => {
    // on first turn set playing to true (to start timer)
    if (!isPlaying) {
      setIsPlaying(true);
    }
    // set cell's click state to true
    let gridCopy = JSON.parse(JSON.stringify(grid));
    gridCopy[y][x].isClicked = true;
    setGrid(gridCopy);

    // check if bomb was activated
    if (checkGameOver(y, x)) return;

    // increment click count;
    setClickCount((prev) => prev + 1);

    // if cell has no neighbouring bombs display multiple cells
    if (grid[y][x].neighbourBombs === 0) {
      displayMultiple(y, x);
    }
  };

  const displayMultiple = (y, x) => {
    setCellsToCheck([]);

    const yArr = [y - 1, y, y + 1];
    const xArr = [x - 1, x, x + 1];

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (
          yArr[j] < 0 ||
          xArr[i] < 0 ||
          yArr[j] > level - 1 ||
          xArr[i] > level - 1
        ) {
          continue;
        } else if (!grid[yArr[j]][xArr[i]].isFlagged) {
          setRevealMultiple((prev) => [...prev, [yArr[j], xArr[i]]]);

          // check if neighbouring cells also contain blanks
          if (
            grid[yArr[j]][xArr[i]].neighbourBombs === 0 &&
            (j !== 1 || i !== 1) &&
            !grid[yArr[j]][xArr[i]].isClicked
          ) {
            console.log(grid[yArr[j]][xArr[i]]);
            setCellsToCheck((prev) => [...prev, [yArr[j], xArr[i]]]);
          }
        }
      }
    }
    if (cellsToCheck.length > 0) {
      let array = [...setCellsToCheck];
      array.forEach((cell) => {
        displayMultiple(cell[0], cell[1]);
        console.log("display multiple");
      });

    }
    setShowCells(true);
  };

  useEffect(() => {
    if (!showCells) return;
    reveal();
    setRevealMultiple([]);
    setShowCells(false);
  }, [showCells]);

  const reveal = () => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    [...revealMultiple].forEach((a) => {
      gridCopy[a[0]][a[1]].isClicked = true;
    });

    setGrid(gridCopy);
  };

  // check if player has won or lost
  const checkGameOver = (y, x) => {
    let notClickedCount = level * level - bombCount - 1;
    if (grid[y][x].isBomb) {
      setGameOver(true);
      setIsPlaying(false);
    } else if (clickCount === notClickedCount) {
      setGameWon(true);
      setIsPlaying(false);
    }

    if (grid[y][x].isBomb) return true;
  };

  const addNeighourBombCount = () => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    let numBombs = 0;
    for (let y = 0; y < level; y++) {
      for (let x = 0; x < level; x++) {
        numBombs = calcNeighbourBombs(y, x);
        gridCopy[x][y].neighbourBombs = numBombs;
      }
    }
    setGrid([...gridCopy]);
  };

  const calcNeighbourBombs = (y, x) => {
    let numBombs = 0;
    // arrays to determine x and y values above and below current cell
    const yArr = [y - 1, y, y + 1];
    const xArr = [x - 1, x, x + 1];

    // loop through neighbouring cells and count how many contains bombs
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (grid[x][y].isFlagged) return;

        if (
          yArr[j] < 0 ||
          xArr[i] < 0 ||
          yArr[j] > level - 1 ||
          xArr[i] > level - 1 ||
          (i === 1 && j === 1)
        ) {
          continue;
        } else if (grid[xArr[i]][yArr[j]].isBomb) {
          numBombs++;
        }
      }
    }
    return numBombs;
  };

  return (
    <>
      <StyleBody>
        <StyleMenu>
          <Level levelChange={levelChange} level={level} />
          <Flags flagTotal={flagTotal} />
          <Timer timer={timer} />
        </StyleMenu>
        <Game
          role="button"
          tabIndex="0"
          grid={grid}
          level={level}
          bombs={bombs}
          singleClick={singleClick}
          gameOver={gameOver}
          rightClick={rightClick}
        />
        <GameOver gameOver={gameOver} gameWon={gameWon} reset={reset} />
      </StyleBody>
    </>
  );
};

export default App;
