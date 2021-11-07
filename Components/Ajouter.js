import React from 'react';
import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity,  Alert,AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AddTodo from './Add/AddTodo';
import AddNote from './Add/AddNote';
import * as firebase from 'firebase';
import KeyApi from '../constants/keyApi';
import { LogBox } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();


export default function Ajouter() {
    const [modalNoteOpen,setmodalNoteOpen] = useState(false);
    const [modalTodoOpen,setmodalTodoOpen] = useState(false);

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var user = await AsyncStorage.getItem('userID');
        db.collection('Gallery')
        .add({ 
            UserID : user,
        }).then((doc)=>{
            firebase.storage().ref()
            .child("Gallery/"+user+"/"+doc.id)
            .put(blob).then(()=>{
                Alert.alert("Image est ajouté avec succes");
            });
        });
        
    }

    const Camera = async() => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status == 'granted') {
                let result = await ImagePicker.launchCameraAsync({
                })
                if (!result.cancelled) {
                    uploadImage(result.uri);
                }
            }
        }
    }
    const Telephone = async() => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status == 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                })
                if (!result.cancelled) {
                    uploadImage(result.uri);
                }
            }
        }
    }
    const pickImage = () => {
        Alert.alert(
            "CHOISIR UN IMAGE",
            "Choisir Par camera pour prendre une photo ou par telephone et choisir une photo",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "A partir de telephone", onPress: () => Telephone() },
              { text: "Par Camera", onPress: () => Camera() }
            ]
        );
        
    }
    
    return (
        <View style={styles.container}>
            <Modal visible={modalNoteOpen} animationType='slide'>
                <Ionicons name="close" size={34} color="black" onPress={() => setmodalNoteOpen(false)}/>
                <AddNote setmodal={setmodalNoteOpen}/>
            </Modal>
            <Modal visible={modalTodoOpen} animationType='slide'>
                <Ionicons name="close" size={34} color="black" onPress={() => setmodalTodoOpen(false)}/>
                <AddTodo setmodal={setmodalTodoOpen}/>
            </Modal>
            <View >
                <TouchableOpacity style={styles.Btn} onPress={() => setmodalNoteOpen(true)} >
                    <Text style={styles.Text}>Add a NoteBook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Btn} onPress={ () => setmodalTodoOpen(true) } >
                    <Text style={styles.Text}>Add a TODO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Btn} onPress={ () => pickImage() } >
                    <Text style={styles.Text}>Add a PHOTO</Text>
                </TouchableOpacity>
            </View> 
        </View>
        
  );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        padding : 30,
    },
    Btn:{
        backgroundColor:"#2b2b39",
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
});