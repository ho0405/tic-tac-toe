import { View, Text } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import GameComponent from './GameComponent'

const SingleComponent = () => {

    const [squares, setSquares] = useState<string[]>(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState({
        O: 0,
        X: 0
    });


    useEffect(() => {
        if (xIsNext) {
            const computerMove = getCompuerMove(squares);
            handleClick(computerMove as any);
        }
    }, [xIsNext, squares]);


    //------------------on use press ---------------------

    const handleClick = useMemo(
        () => (index: number) => {
            const newSquares = squares.slice();
            newSquares[index] = xIsNext ? "X" : "O";
            setSquares(newSquares);
            setXIsNext(!xIsNext);
        },
        [squares]
    );
    // <------------calculate the winnerr----------->
    const calculateWinner = (squares: string[]) => {
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
          if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
          ) {
            return squares[a];
          }
        }
      
        return null; // Moved this line outside the loop
      }
      

      const getCompuerMove = (squares: string[]) => {
        let bestScore = -Infinity;
        let move: number | null = null; // Use a union type to allow both number and null
      
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
            const newSquares = [...squares]; // Create a copy of the squares array
            newSquares[i] = "O"; // Simulate a move for the computer
            const score = miniMax(newSquares, false);
            
            if (score > bestScore) {
              bestScore = score;
              move = i;
            }
          }
        }
      
        return move;
      };
      
      

    const miniMax = (squares: any[], isMaxmizing: boolean) => {
        const winner = calculateWinner(squares)

        if (winner === "O") {
            return 1;
        }


        if (winner === "X") {
            return -1;
        }


        if (squares.every(e => e !== null)) {
            return 0;
        }
        if (isMaxmizing) {
            let bestScore = -Infinity;

            for (let i = 0; i < squares.length; i++) {
                if (squares[i] === null) {
                    squares[i] = "O";
                    const score = miniMax(squares, false);
                    squares[i] = null;

                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore
        }
        else {
            let bestScore = Infinity;
            for (let i = 0; i < squares.length; i++) {
                if (squares[i] === null) {
                    squares[i] = "X";
                    const score = miniMax(squares, true);
                    squares[i] = null;

                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    useEffect(() => {
        const winner = calculateWinner(squares);
        if (winner) {
            setGameOver(true)
            setScore((pre) => {
                return {
                    ...pre,
                    X: winner === "X" ? pre.X++ : pre.X,
                    O: winner === "O" ? pre.O++ : pre.O,
                }

            })
        }
        else if (squares.every(e => e !== null)) {
            setGameOver(true)
        }
    }, [squares]);

    //<----------------------reset game----------------->>
    const resetGame = () => {
        setSquares(Array(9).fill(null))
        setGameOver(false)
        setXIsNext(true)
    }

    return (
        <React.Fragment>
            <GameComponent
                squares={squares}
                handlePress={handleClick}
                handleReset={resetGame}
                score={score}
                finish={{
                    gameOver,
                    text: calculateWinner(squares) ? `Winner ${calculateWinner
                        (squares)}` : squares.every(e => e !== null) ? "Draw" : ""
                }} />
        </React.Fragment>
    );
};

export default SingleComponent;