"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

type Player = "X" | "O" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | "Draw">(null);

  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every((square) => square !== null) ? "Draw" : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  // Computer move
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      return;
    }

    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null) as number[];

        if (emptyIndices.length > 0) {
          const randomIndex =
            emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randomIndex] = "O";
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-background/10 backdrop-blur-sm rounded-2xl p-4">
      <div className="mb-4 text-xl font-bold text-background">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `${winner === "X" ? "You" : "CPU"} Won!`
          : `Turn: ${isXNext ? "You (X)" : "CPU (O)"}`}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((square, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 bg-background/20 rounded-lg text-3xl font-bold flex items-center justify-center text-background transition-colors hover:bg-background/30",
              square === "X" && "text-blue-300",
              square === "O" && "text-red-300"
            )}
            onClick={() => handleClick(index)}
            disabled={!!square || !!winner || !isXNext}
          >
            {square}
          </motion.button>
        ))}
      </div>
      <Button
        onClick={resetGame}
        variant="outline"
        size="sm"
        className="gap-2 bg-background/20 border-none text-background hover:bg-background/40 hover:text-background"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Game
      </Button>
    </div>
  );
}
