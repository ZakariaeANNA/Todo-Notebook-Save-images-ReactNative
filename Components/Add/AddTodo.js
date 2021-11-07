import React, { useContext } from 'react';
import { useState } from 'react';
import { Button, TextInput, View, StyleSheet,Text, TouchableOpacity, Alert, ScrollView,AsyncStorage} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase';
import KeyApi from '../../constants/keyApi';
import { LogBox } from 'react-native';



const ReviewForm = yup.object({
    title : yup.string().required('Title is required'),
});
if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();

export default function AddTodo({setmodal}) {
    return (
            <Formik
                initialValues={{title:''}}
                validationSchema={ReviewForm}
                onSubmit={ async(values,actions) => {
                    var user = await AsyncStorage.getItem('userID');
                    var title = values.title;
                    var checked = 'false';
                    db.collection('Todo')
                    .add({
                        UserID : user,
                        Todo : title,
                        checked : checked,
                    }).then(()=>{
                        Alert.alert("Todo est ajouté avec succes.");
                        setmodal(false);
                    })
                }
                }
            >
            {(props) => (
            <View style={styles.form}>
                <ScrollView>
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Title..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />
                    </View>
                </ScrollView>
                <Text style={styles.label}>{props.touched.title && props.errors.title}</Text>
                <TouchableOpacity style={styles.Btn} onPress={props.handleSubmit}>
                    <Text style={styles.Text}>Add</Text>
                </TouchableOpacity>
            </View>
            )}
        </Formik>
    );
}
const styles = StyleSheet.create({
    form: {
        flex:1,
        justifyContent: 'center',
        padding : 40,
    },
    Btn:{
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
    Text:{
        color:"white"
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
        fontSize : 20,
        color:"black"
    },
    label:{
        fontSize : 20,
        color : "black",
        paddingBottom : 10,
    },
});