import React from 'react';
import { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Button, TouchableOpacity, ScrollView,AsyncStorage} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import KeyApi from '../constants/keyApi';
import { LogBox } from 'react-native';

if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);
const db = firebase.firestore();

export default function Todo() {
    const [todo,setTodo] = useState([]);
    var items=[];
    const deleteTodo = async(id) =>{
        db.collection('Todo').doc(id)
        .delete()
        .then(()=>{
            Alert.alert("Todo est supprimé avec succes");
        })
    };
    const check = (id) => {
        
        const newtodo = todo.map(async (item)  => {
            var user = await AsyncStorage.getItem('userID');
            if(item.id==id){
                db.collection('Todo').doc(id)
                .set({
                    UserID : user,
                    Todo : item.Todo,
                    Checked : 'true',
                });
            } 
        })
    };

    const renderData = (doc) => {
        items.push({  id : doc.id , 
                      Todo : doc.data().Todo,
                      Checked : doc.data().Checked,
                  });
    }
    const get = async() => {
        var user = await AsyncStorage.getItem('userID');
        db.collection('Todo')
        .where("UserID","==",user)
        .onSnapshot((snapshot)=>{
            snapshot.docs.forEach(doc =>{
                renderData(doc);
            });
            setTodo(items);
            items = [];
        });
    }
    useEffect(()=> {
        get();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {todo.map(item =>
                    (
                        <View key={item.id} style={styles.list}>
                            <RadioButton
                                value="false"
                                status={ item.Checked === 'true' ? 'checked' : 'unchecked' }
                                color='white'
                                uncheckedColor='white'
                                onPress={()=>check(item.id)}
                                style={styles.radio}
                            />
                            <Text style={styles.item}>{item.Todo}</Text>
                            <TouchableOpacity onPress={()=>deleteTodo(item.id)}>
                                <AntDesign name="delete" size={24} color="white" /> 
                            </TouchableOpacity>
                        </View>
                    )
                )}
            </ScrollView>
        </View>  
  );
}
const styles = StyleSheet.create({
    container: {
        flex :1,
        padding : 10,
        backgroundColor: '#fff',
    },
    list:{
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
        
    },
    item:{
        flex :1,
        fontSize:24,
        borderRadius:30,
        color:"white",
    },
});