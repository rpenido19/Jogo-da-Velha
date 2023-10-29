import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import "./styles.css";

const saveScore = (winner, loser) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("pt-BR");
  const existingData = localStorage.getItem("gameData");

  if (existingData) {
    const data = JSON.parse(existingData);
    data.push({ winner, loser, date: formattedDate });
    localStorage.setItem("gameData", JSON.stringify(data));
  } else {
    const data = [{ winner, loser, date: formattedDate }];
    localStorage.setItem("gameData", JSON.stringify(data));
  }
};

const Play = () => {
  const params = new URLSearchParams(window.location.search);
  const size = parseInt(params.get("size"));
  const vsBot = params.get("vsBot");
  const playerOne = params.get("playerOne")
    ? params.get("playerOne")
    : "Jogador 1";
  const playerTwo = params.get("playerTwo")
    ? params.get("playerTwo")
    : "Jogador 2";
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(
    Array.from({ length: size * size }, () => null)
  );

  useEffect(() => {
    if (vsBot === "true" && !turn) {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          setTimeout(() => {
            handleClickBoard(i);
          }, 500);
          break;
        }
      }
    }
    // eslint-disable-next-line
  }, [turn]);

  const checkResult = () => {
    // Função auxiliar para verificar se uma linha é preenchida com o mesmo símbolo
    const isLineFilledWithSymbol = (line, symbol) => {
      return line.every((cell) => cell === symbol);
    };

    // Verificar linhas
    for (let i = 0; i < size; i++) {
      const startIndex = i * size;
      const row = board.slice(startIndex, startIndex + size);

      if (isLineFilledWithSymbol(row, "X")) {
        saveScore(playerOne, playerTwo);
        alert(`${playerOne} venceu!`);
        restart();
        return;
      } else if (isLineFilledWithSymbol(row, "O")) {
        saveScore(playerTwo, playerOne);
        alert(`${playerTwo} venceu!`);
        restart();
        return;
      }
    }

    // Verificar colunas
    for (let i = 0; i < size; i++) {
      const col = board.filter((_, index) => index % size === i);

      if (isLineFilledWithSymbol(col, "X")) {
        saveScore(playerOne, playerTwo);
        alert(`${playerOne} venceu!`);
        restart();
        return;
      } else if (isLineFilledWithSymbol(col, "O")) {
        saveScore(playerTwo, playerOne);
        alert(`${playerTwo} venceu!`);
        restart();
        return;
      }
    }

    // Verificar diagonal principal
    const diagonal1 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(board[i * size + i]);
    }

    if (isLineFilledWithSymbol(diagonal1, "X")) {
      saveScore(playerOne, playerTwo);
      alert(`${playerOne} venceu!`);
      restart();
      return;
    } else if (isLineFilledWithSymbol(diagonal1, "O")) {
      saveScore(playerTwo, playerOne);
      alert(`${playerTwo} venceu!`);
      restart();
      return;
    }

    // Verificar diagonal secundária
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal2.push(board[i * size + (size - 1 - i)]);
    }

    if (isLineFilledWithSymbol(diagonal2, "X")) {
      saveScore(playerOne, playerTwo);
      alert(`${playerOne} venceu!`);
      restart();
      return;
    } else if (isLineFilledWithSymbol(diagonal2, "O")) {
      saveScore(playerTwo, playerOne);
      alert(`${playerTwo} venceu!`);
      restart();
      return;
    }

    // Verificar empate (Deu velha)
    if (board.every((cell) => cell !== null)) {
      alert("Deu velha!");
      restart();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkResult();
    }, 500);
    // eslint-disable-next-line
  }, [board, turn]);

  const handleClickBoard = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = turn ? "X" : "O";
      setBoard(newBoard);
      setTurn(!turn);
    }
  };

  const renderBoard = () => {
    return board.map((cell, index) => (
      <div
        key={index}
        className={`row${cell === "X" ? " player-one" : ""}${
          cell === "O" ? " player-two" : ""
        }`}
      >
        <button key={index} onClick={() => handleClickBoard(index)} />
      </div>
    ));
  };

  const restart = () => {
    const newBoard = Array.from({ length: size * size }, () => null);
    setBoard(newBoard);
    setTurn(true);
  };

  return (
    <div className="play">
      <h2>Vez do jogador</h2>
      <h2 style={{ color: turn ? "#0d6efd" : "#dc3545" }}>
        {turn ? playerOne : playerTwo}
      </h2>
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {renderBoard()}
      </div>
      <div className="new-game">
        <button onClick={restart}>Novo Jogo</button>
      </div>
      <BackButton />
    </div>
  );
};

export default Play;
