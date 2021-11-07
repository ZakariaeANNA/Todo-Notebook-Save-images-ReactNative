import React, { useContext }  from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Button, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { RadioButton } from 'react-native-paper';
import {TodoContext} from '../provider/Todoprovider';

export default function Todo({item}) {
    const {todo,setTodo} = useContext(TodoContext);

    return(
        <View style={styles.container}>
            <RadioButton
                value="false"
                status={ item.checked === 'true' ? 'checked' : 'unchecked' }
                style={styles.radio}
            />
            <Text> {item.checked}</Text>
            <TouchableOpacity onPress={delete(item.title)}>
                <AntDesign name="delete" size={24} color="white" /> 
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        marginTop : 24,
        padding:30,
        fontSize:24,
        backgroundColor:'#2b2b39',
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
    },
    radio:{
        flex:1,
        color:"white",
    },
    item:{
        flex :1,
        fontSize:24,
        borderRadius:30,
        color:"white",
    },
});