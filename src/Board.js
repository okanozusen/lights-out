import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function restartGame() {
    setBoard(createBoard());
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x);
      flipCell(y - 1, x);
      flipCell(y + 1, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);

      return boardCopy;
    });
  }

  if (hasWon()) {
    return (
      <div className="Board">
        <div>You Won!</div>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    );
  }

  let tblBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <div>
      <button onClick={restartGame}>Restart Game</button>
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    </div>
  );
}

export default Board;
