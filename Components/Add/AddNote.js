import React from 'react';
import { useEffect } from 'react';
import { Button, TextInput, View, StyleSheet,Text, TouchableOpacity, Alert , ScrollView,AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase';
import KeyApi from '../../constants/keyApi';
import { LogBox } from 'react-native';



if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();
 
const ReviewForm = yup.object({
    title : yup.string().required('Title is required'),
    Content : yup.string().required('Content is required'),
});

export default function AddNote({setmodal}) {

    return (    
            <Formik
                initialValues={{title:'',Content:''}}
                validationSchema={ReviewForm}
                onSubmit={async(values,actions) => {
                    var title = values.title;
                    var body = values.Content;
                    var user = await AsyncStorage.getItem('userID');
                    db.collection('Notebook')
                    .add({
                        UserID : user,
                        Title : title,
                        Contenu : body,
                    }).then(()=>{
                        Alert.alert("La note est ajouté avec succes.");
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
                        <Text style={styles.error}>{props.touched.title && props.errors.title}</Text>
                        <View style={styles.inputView} >
                            <TextInput  
                                multiline
                                style={styles.inputText}
                                placeholder="Content..." 
                                placeholderTextColor="#003f5c"
                                onChangeText={props.handleChange('Content')}
                                value={props.values.Content}
                            />
                            
                        </View>
                        <Text style={styles.error}>{props.touched.Content && props.errors.Content}</Text>
                    </ScrollView>
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
    error:{
        fontSize : 20,
        color : "black",
        paddingBottom : 10,
    },
});