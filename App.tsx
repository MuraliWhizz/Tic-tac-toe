// Import necessary modules and components
import React, { useState } from 'react';
import { FlatList, Pressable, StatusBar, StyleSheet, Text,TextInput,View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Import constants
import { currencyByRupee } from './src/constants';
//Component
import CurrencyButton from './src/components/CurrencyButton';
import Snackbar from 'react-native-snackbar';

// Define haptic feedback options
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

// Define the App component
export default function App(): JSX.Element{
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')

  // Function to handle button press
  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }

    // Parse input value to float
    const inputAmount = parseFloat(inputValue)
    // Check if input value is a valid number
    if (!isNaN(inputAmount)) {
      // Calculate converted value
      const convertedValue = inputAmount * targetValue.value
      // Format result string
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)  }`
      // Update result value and target currency state
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    } else {
      // Show snackbar if input value is not a valid number
      return Snackbar.show({
        text: "NOt a valid number to convert",
        backgroundColor: "#F4BE2C",
        textColor: "#000000"
      })
    }
  }
  // Render the App component
  return (
    <>
      <StatusBar/>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
            maxLength={14}
            value={inputValue}
            clearButtonMode='always' //only for iOS
            onChangeText={setInputValue}
            keyboardType='number-pad'
            placeholder='Enter amount in Rupees'
            />
          </View>
          {resultValue && (
            <Text style={styles.resultTxt} >
              {resultValue}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Pressable
            style={[
              styles.button, 
              targetCurrency === item.name && styles.selected
            ]}
            onPress={() => { buttonPressed(item);
            ReactNativeHapticFeedback.trigger('impactHeavy', options);
             }}
            >
              <CurrencyButton {...item} />
            </Pressable>
          )}
          />
        </View>
      </View>
    </>
  );
}

// Define styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});