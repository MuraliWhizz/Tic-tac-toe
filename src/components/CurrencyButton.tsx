//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';

type currencyButtonProps = PropsWithChildren<{
    name:string;
    flag:string;
}>
const currencyButton = (props: currencyButtonProps):JSX.Element =>{
    return(
        <View style = {styles.buttonContainer}>
            <Text style = {styles.country} >{props.name} </Text>
            <Text style = {styles.flag}>{props.flag} </Text>
        </View>
)}

const styles = StyleSheet.create({
    buttonContainer:{
        alignItems: 'center', 
    },  
    flag:{
        fontSize: 28,
        color:'#FFFFFF',
        marginBottom:4,
    },
    country:{
        fontSize: 14,
        color:'#3d3436',
        marginBottom:4,  
    },
})

export default currencyButton;