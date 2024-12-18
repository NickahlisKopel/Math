import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { GestureHandlerRootView, NativeViewGestureHandler } from 'react-native-gesture-handler';
import RandomExpression from './RandomExpression';
import api from './api';

export default function Index() {
  const [score, setScore] = useState(0); // Use a number type for score
  const [guess, setGuess] = useState('');
  const [expression, setExpression] = useState([0,"+",0]); // Initialize with a random expression
  const [stats, setStats] = useState([0,0,0]);
  const [username, setUserName] = useState("Default User");
  const [numOfEquations, setNumOfEquations] = useState(0)

const updateStats = async (username:String, correctAnswers:Number, totalQuestions:Number, timeTaken:Number) => {
  try {
    const response = await api.post('/update-stats', {
      username,
      correctAnswers,
      totalQuestions,
      timeTaken,
    });
    console.log('Stats updated:', response.data);
  } catch (error) {
    console.error('Error updating stats:', error);
  }
};

const getLeaderboard = async () => {
  try {
    const response = await api.get('/leaderboard');
    console.log('Leaderboard:', response.data);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
};

const reset = () =>{
  setNumOfEquations(0)
  setScore(0);
}

const isDone = () => {
  if (numOfEquations == 25){
    updateStats(username,stats[1],stats[2],stats[3]);
    <View>
      <Text>{username},\n{stats[1]},\n{stats[2]},\n{stats[3]} </Text>
      <TouchableOpacity onPress={reset} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
    </View>

  }
  
}

  const handleButtonClick = () => {
    Calculate(guess);
  };

  const Calculate = (guess: string) => {
    
    const operator = expression[1].toString(); // Assuming the operator is always at index 1
    const number1 = Number(expression[0]);
    const number2 = Number(expression[2]);
   
    let total;
    

    switch (operator) {
      case '+':
        total = number1 + number2;
        break;
      case '-':
        total = (Math.max(number1, number2) - Math.min(number1,number2)); // Ensure non-negative difference
        break;
      case '*':
        total = number1 * number2;
        break;
      case '/':
        total = (Math.max(number1, number2) / Math.min(number1, number2));
        break;
      default:
        console.error('Unknown operator:', operator);
        return;
    }

    if (total == Number(guess)) {
      setScore((prevScore) => prevScore + 1);
      console.log("Correct!")
      setNumOfEquations(numOfEquations + 1)
      isDone();
      setExpression(RandomExpression()); // Generate a new expression
      setGuess('');
    } else {
      console.log(Number(guess))
      console.log(expression)
      console.log(total)
      console.log("number1:" + number1 + " number2:" + number2)
      console.log(expression)
      console.log('Incorrect guess. Try again.');
      setNumOfEquations(numOfEquations + 1)
      isDone();
      setExpression(RandomExpression()); 
      setGuess('');
      
    }
  };
  const handleGuessChange = useCallback((text:any) => {
    setGuess(text); // Minimal update
  }, []);

  return (
    <GestureHandlerRootView>
      <NativeViewGestureHandler>
        <View style={styles.container}>
          <Text style={styles.text}>Score: {score}/{numOfEquations}</Text>
          <View style={styles.border}></View>
          <Text style={styles.text}>{expression}</Text>
          <View style={styles.border}></View>
          <TouchableOpacity onPress={handleButtonClick} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>
          <TextInput
            keyboardType="numeric"
            placeholder="Answer"
            value={guess}
            onChangeText={handleGuessChange}
            style={styles.textInput}
          />
          
        </View>
      </NativeViewGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 50,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  border:{
    padding:10,
  },
});
