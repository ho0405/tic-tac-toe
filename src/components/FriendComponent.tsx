import { View, Text } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import GameComponent from './GameComponent'

const FriendComponent = () => {

    const [squares, setSquares] = useState<string[]>(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState({
        O: 0,
        X: 0
    });


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
    
        return null; // Move this line outside of the loop
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

export default FriendComponent;