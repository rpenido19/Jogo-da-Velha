import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import "./styles.css";

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
        alert(`${playerOne} venceu!`);
        restart();
        return;
      } else if (isLineFilledWithSymbol(row, "O")) {
        alert(`${playerTwo} venceu!`);
        restart();
        return;
      }
    }

    // Verificar colunas
    for (let i = 0; i < size; i++) {
      const col = board.filter((_, index) => index % size === i);

      if (isLineFilledWithSymbol(col, "X")) {
        alert(`${playerOne} venceu!`);
        restart();
        return;
      } else if (isLineFilledWithSymbol(col, "O")) {
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
      alert(`${playerOne} venceu!`);
      restart();
      return;
    } else if (isLineFilledWithSymbol(diagonal1, "O")) {
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
      alert(`${playerOne} venceu!`);
      restart();
      return;
    } else if (isLineFilledWithSymbol(diagonal2, "O")) {
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
    if (board.every((cell) => cell !== null)) {
      setTimeout(() => {
        checkResult();
      }, 500);
    }
    // eslint-disable-next-line
  }, [board]);

  const handleClickBoard = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = turn ? "X" : "O";
      setBoard(newBoard);
      checkResult();
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
