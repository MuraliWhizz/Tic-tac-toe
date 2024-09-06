// Import necessary components and libraries
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, Image, Pressable} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Import dice images
import one from './src/one.png'
import Two from './src/two.png'
import Three from './src/three.png'
import four from './src/four.png'
import five from './src/five.png'
import six from './src/six.png'

// Define DiceProps type
type DiceProps = PropsWithChildren<{
  imageUrl:ImageSourcePropType
}>

// Define options for haptic feedback
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

// Define Dice component
const Dice = ({imageUrl}:DiceProps):JSX.Element =>{
  return(
    <Image style= {styles.diceImage} source={imageUrl} />
  )
}

// Define App component
export default function App():JSX.Element{
  // State variable for the current dice image
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(one)
  // Function to roll the dice
  const rollDiceTap = () => {
    // Generate a random number between 1 and 6
    let randomNumber = Math.floor(Math.random() * 6) + 1; 
    // Update the dice image based on the random number
    switch(randomNumber){
      case 1:
        setDiceImage(one)
        break;
      case 2:
        setDiceImage(Two)
        break;
      case 3:
        setDiceImage(Three)
        break;
      case 4:
        setDiceImage(four)
        break;
      case 5:
        setDiceImage(five)
        break;
      case 6:
        setDiceImage(six)
        break;
      default:
      break;
    }
    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
  }
  // Return the app component
  return (
    <View style={styles.container}>
      {/* Display the current dice image */}
      <Dice imageUrl={diceImage} />
      {/* Button to roll the dice */}
      <Pressable onPress={rollDiceTap} >
        <Text style = {styles.rollDiceBtnText}>Roll Dice</Text>
      </Pressable>
    </View>
  )
 
}

// Define styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  diceContainer:{
    margin:12,
  },
  diceImage:{
    width:200,
    height:200,
    borderRadius:20,
  },
  rollDiceBtnText:{
    paddingVertical:10,
    paddingHorizontal:40,
    borderWidth:2,
    borderRadius:8,
    borderColor:'#E5E0FF',
    fontSize:16,
    color: '#8EA7E9',
    fontWeight:'700',
    textTransform:'uppercase',
    marginVertical:10,
  }
});
