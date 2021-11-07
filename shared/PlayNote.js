import React,{useState} from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';


export default function PlayNote({title,body,id,onPressSaveEdit,modal}){
    
  const [titleM,setTitleM] = useState(title);
  const [bodyM,setBodyM] = useState(body);

    return(
        <View style={styles.container}>
          <View style={styles.inputView}>
          <TextInput
              style={styles.inputText}
              placeholder="ADD TITLE..."
              value={titleM}
              onChangeText={(text) => setTitleM(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                underlineColorAndroid="transparent"
                placeholder="ADD DESCRIPTION..."
                value={bodyM}
                onChangeText={(text) => setBodyM(text)}
                multiline={true} 
            />
          </View>
          <TouchableOpacity style={styles.Btn} onPress={() => onPressSaveEdit(id,titleM,bodyM,modal)}>
            <Text style={styles.Text}>Edit Note</Text>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    inputView:{
      borderColor:"#465881",
      borderRadius:45,
      borderWidth : 2,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
  inputText:{
      fontSize : 30,
      color:"black",
  },
  Btn:{
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  Text:{
    color:"white",
    fontSize : 20,
  },
});