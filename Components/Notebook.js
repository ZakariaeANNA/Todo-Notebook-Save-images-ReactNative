import React,{useState , useEffect } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Modal, Alert,AsyncStorage } from 'react-native';
import Box from '../shared/box';
import PlayNote from '../shared/PlayNote';
import { Ionicons } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import KeyApi from '../constants/keyApi';
import { LogBox } from 'react-native';


if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();

export default function Notebook() {

    const [notebook,setNotebook] = useState([]);
    const [isRender,setisRender] = useState(false);
    const [modalNote,setmodalNote] = useState(false);
    const [titleNote,setTitleNote] = useState();
    const [bodyNote,setBodyNote] = useState();
    const [idNote,setIdNote] = useState();

    const showModal = (t,b,i) => {
      setmodalNote(true);
      setTitleNote(t);
      setBodyNote(b);
      setIdNote(i);
    }

    var items = [];
    const onPressSaveEdit = (idItem,titleItem,bodyItem,setmodal) => {
      const newNotes = notebook.map(async(item)  => {
        var user = await AsyncStorage.getItem('userID');
        if(item.id==idItem){
          item.Title=titleItem;
          item.Contenu=bodyItem;
          db.collection('Notebook').doc(item.id).set({
            UserID : user,
            Contenu : bodyItem,
            Title : titleItem,
          }).then(()=>{
            Alert.alert("Modification est effectué avec succes.");
          })
        } 
      setisRender(!isRender);
      setmodal(false);
    })
  }
    const renderData = (doc) => {
              items.push({  id : doc.id , 
                            Contenu : doc.data().Contenu,
                            Title : doc.data().Title,
                        });
    }

    const get = async() => {
      var user = await AsyncStorage.getItem('userID');
      db.collection('Notebook')
      .where("UserID","==",user)
      .onSnapshot((snapshot)=>{
          snapshot.docs.forEach(doc =>{
              renderData(doc);
          });
          setNotebook(items);
          items = [];
      });
    }
    useEffect(()=>{
        get();
    }, []);

    return (
        <View style={styles.container}>
              <Modal visible={modalNote} animationType='slide'>
                <Ionicons name="close" size={34} color="black" onPress={() => setmodalNote(false)}/>
                <PlayNote title={titleNote} body={bodyNote} id={idNote} modal={setmodalNote} onPressSaveEdit={onPressSaveEdit}/>
              </Modal>
            <FlatList
               data={notebook}
               keyExtractor={(item) => item.id}
               extraData={isRender}
               renderItem={({item}) => (
                 <TouchableOpacity onPress={() => {  
                    showModal(item.Title,item.Contenu,item.id)
                 }}>
                   <Box>
                     <Text style={styles.titleText}>{item.Title}</Text> 
                   </Box>
                 </TouchableOpacity>
               )}
            /> 
        </View>
        
  );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        padding: 10,
        width : '100%',
    },
    titleText: {
        fontWeight:'bold',
        fontSize: 30,
        color: 'white',
    }
});