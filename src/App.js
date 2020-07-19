import React, { useState, useEffect } from "react";

// import device detection

import { isBrowser, isMobile } from 'react-device-detect';

// import styling
import { StyleMenu } from "./Components/Styles/StyleMenu";
import { StyleBody } from "./Components/Styles/StyleBody";

// import Components
import Game from "./Components/Game";
import Level from "./Components/Level";
import Flags from "./Components/Flags";
import Timer from "./Components/Timer";
import GameOver from "./Components/GameOver";
import BestTime from "./Components/BestTime";

const App = () => {
  const [level, setLevel] = useState(9);
  const [grid, setGrid] = useState([]);
  const [bombs, setBombs] = useState([]);
  let bombCount = level * 2;
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flagTotal, setFlagTotal] = useState(bombCount);
  const [isBombsAdded, setIsBombsAdded] = useState(false);
  const [revealMultiple, setRevealMultiple] = useState([]);
  const [showCells, setShowCells] = useState(false);
  const [bestTime, setBestTime] = useState(0);
  const [longPress, setLongPress] = useState(0);

  // retreive best time on page load
  useEffect(() => {
    if (localStorage.getItem("minesweeperBestTime")) {
      setBestTime(localStorage.getItem("minesweeperBestTime"));
    }
  }, []);

  // reset game when switching levels
  useEffect(() => {
    reset();
  }, [level]);

  // timer starts/ends when game starts/ends
  useEffect(() => {
    const countDown = setInterval(() => {
      // dont increment timer when player loses
      if (gameOver) {
        return;
      }
      // if player won don't increment timer and check best time
      else if (gameWon) {
        if (timer < bestTime || !localStorage.getItem("minesweeperBestTime")) {
          localStorage.setItem("minesweeperBestTime", timer);
        }
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
    setBestTime(localStorage.getItem("minesweeperBestTime"));
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

    // return if cell is already clicked or flagged or game over or game won
    if (grid[y][x].isClicked || grid[y][x].isFlagged || gameOver || gameWon)
      return;

    // set cell's click state to true
    let gridCopy = JSON.parse(JSON.stringify(grid));
    gridCopy[y][x].isClicked = true;
    setGrid(gridCopy);

    // increment click count;
    setClickCount((prev) => prev + 1);

    // check if bomb was activated
    if (checkGameOver(y, x)) return;

    // if cell has no neighbouring bombs display multiple cells
    if (grid[y][x].neighbourBombs === 0) {
      displayMultiple(y, x);
    }
  };

  const displayMultiple = (y, x) => {
    const yArr = [y - 1, y, y + 1];
    const xArr = [x - 1, x, x + 1];

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (
          yArr[j] < 0 ||
          xArr[i] < 0 ||
          yArr[j] > level - 1 ||
          xArr[i] > level - 1 ||
          (i === 1 && j === 1)
        ) {
          continue;
        } else if (
          !grid[yArr[j]][xArr[i]].isFlagged &&
          !grid[yArr[j]][xArr[i]].isClicked
        ) {
          setClickCount((prev) => prev + 1);
          setRevealMultiple((prev) => [...prev, [yArr[j], xArr[i]]]);
        }
      }
    }
    setShowCells(true);
  };

  useEffect(() => {
    if (!showCells) return;

    // set neighbouring cells with no bombs to clicked
    let gridCopy = JSON.parse(JSON.stringify(grid));
    [...revealMultiple].forEach((a) => {
      gridCopy[a[0]][a[1]].isClicked = true;
    });
    setGrid(gridCopy);
    setRevealMultiple([]);
    setShowCells(false);
  }, [showCells]);

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
        gridCopy[y][x].neighbourBombs = numBombs;
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
        if (grid[y][x].isFlagged) return;

        if (
          yArr[j] < 0 ||
          xArr[i] < 0 ||
          yArr[j] > level - 1 ||
          xArr[i] > level - 1 ||
          (i === 1 && j === 1)
        ) {
          continue;
        } else if (grid[yArr[j]][xArr[i]].isBomb) {
          numBombs++;
        }
      }
    }
    return numBombs;
  };

  // record time when user presses on screen
  const touchStart = () => {
    let time = new Date().getTime();
    setLongPress(time)
  };

  // add flag if its a long press else run single click function
  const touchEnd = (y, x) => {
    let timeDiff = new Date().getTime() - longPress;
    if (timeDiff < 400) {
      singleClick(y, x)
    } else {
      addFlag(y, x)
    }
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
          grid={grid}
          level={level}
          bombs={bombs}
          singleClick={singleClick}
          gameOver={gameOver}
          rightClick={rightClick}
          touchStart={touchStart}
          touchEnd={touchEnd}
        />
        <GameOver gameOver={gameOver} gameWon={gameWon} reset={reset} />
        <StyleMenu>
          <BestTime bestTime={bestTime} />
        </StyleMenu>
      </StyleBody>
    </>
  );
};

export default App;
