import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Box(props){

    return(
        <View style={styles.box}>
            <View style={styles.boxContent}>
                {props.children}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    box: {
        borderRadius:10,
        elevation:5,
        backgroundColor: '#2b2b39',
        shadowOffset: {width:1,height:1},
        shadowColor: '#333',
        shadowOpacity:0.3,
        shadowOpacity:4,
        marginHorizontal:4,
        marginVertical:6,
    },
    boxContent: {
        marginHorizontal:20,
        marginVertical:15,
    }
});