import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
    squares: string[];
    handlePress: (index: number) => void;
    handleReset: () => void;
    scoreText?: boolean;
    finish: {
        gameOver: boolean;
        text: string;
    };
    score: {
        O: number;
        X: number;
    };
};

const GameComponent: React.FC<Props> = (props) => {
    const { finish, handlePress, handleReset, score, squares, scoreText } = props;

    return (
        <React.Fragment>
            <View style={[styles.container]}>
                {/* ---------------------reset--------------------- */}
                <View>
                    <TouchableOpacity onPress={handleReset}>
                        <View style={[styles.resetBtn]}>
                            <Icon name="retweet" size={30} color="#ddd" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* ---------------------board--------------------- */}
                <View style={styles.boardContainer}>
                    <View style={[styles.board]}>
                        {squares.map((square: string, index: number) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.cell}
                                onPress={() => handlePress(index)}
                                disabled={square !== null}
                            >
                                <Text
                                    style={[
                                        styles.cellText,
                                        square === 'X' ? { color: '#f2b237' } : null,
                                    ]}
                                >
                                    {square}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
{/* ---------------------Score Box--------------------- */}
<View style = {styles.scoreContainer}>
    <View style= {[styles.jcsb,styles.fdr]}>
        <View style={styles.scoreBoxMe}>
            <Text>
                {`${scoreText ? "X (YOU)" : "X"}`}
            </Text>
        </View>
        <View style={styles.scoreBox}>
            <Text>
                {`${scoreText ? "O (CPU)" : "OX"}`}
            </Text>
            <Text>{score.X}</Text>
        </View>
    </View>
</View>




            {/* ---------------------Game over Model--------------------- */}
        {finish.gameOver && (
            <View style = {styles.gameOver}>
                <Text style={styles.gameOverText}>
                    {finish.text}
                </Text>
                <TouchableOpacity style ={styles.button} onPress={handleReset}>
                    <Text style = {styles.buttonText}>New Game</Text>

                </TouchableOpacity>
            </View>
        )}
        </React.Fragment>
    );
};

export default GameComponent;
