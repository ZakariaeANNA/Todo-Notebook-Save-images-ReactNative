import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Image, Alert , Dimensions, Modal,AsyncStorage} from 'react-native';
import { useState } from 'react';
import KeyApi from '../constants/keyApi';
import { LogBox } from 'react-native';
import * as firebase from 'firebase';


if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();
const storage = firebase.storage();

export default function Notebook() {
    const [image,setImage] = useState([]);
    const [modalimage,setmodalImage] = useState();
    const [idimage,setidImage] = useState();
    const [visible,setVisible] = useState(false);
    const [refresh,setRefresh] = useState(false);
    var items=[];
    const renderData = (doc,url) => {
        items.push({ 
                    id : doc.id , 
                    Image : url
                });
    }

    const getimage = async()=>{
        var user = await AsyncStorage.getItem('userID');
        db.collection("Gallery")
        .where("UserID","==",user)
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc =>{
                storage.ref().child('Gallery/'+user+"/"+doc.id)
                    .getDownloadURL().then((url)=>{
                        renderData(doc,url);
                    });
            });  
        });
        setRefresh(false);
        setTimeout(() => setImage(items), 3000);
        items =[];
    }

    const Delete = async() =>{
        var user = await AsyncStorage.getItem('userID');
        console.log(idimage);
        
        storage.ref('Gallery/'+user+"/"+idimage).delete().then(()=>{
            db.collection("Gallery").doc(idimage)
            .delete()
            .then(()=>{
            
            Alert.alert("Image est supprimé avec succes");
            getimage();
            setVisible(false);
        });
        });    
    }

    const handleRefresh = () =>{
        setRefresh(true);
        getimage();
    } 

    useEffect(() =>{
            getimage();       
    }, []);

    return(
        <View style={styles.container}>
            <Modal style={styles.modal} animationType={'fade'} Transparent={true} 
                visible={visible} >
                    <View style={styles.modal}>
                        <View style={styles.textview}>
                        <Text style={styles.text} onPress={()=> setVisible(false) }>Close</Text>
                        <Text style={[styles.text ,{textAlign:'right'}]} onPress={Delete}>Delete</Text>
                        </View>
                        <Image
                            source={{
                                uri : modalimage
                            }}
                            resizeMode={'center'}
                            style={styles.imagemodal}
                        ></Image> 
                    </View>
            </Modal>
            <FlatList
               data={image}
               numColumns={2}
               keyExtractor={(item) => item.id}
               refreshing={refresh}
               onRefresh={handleRefresh}
               renderItem={({item}) => (
                    <TouchableOpacity onPress={()=>{ setmodalImage(item.Image); setVisible(true); setidImage(item.id);}}>
                        <Image
                            style={styles.stretch}
                            source={{
                                uri : item.Image
                            }}
                            style={styles.image}
                        ></Image>   
                    </TouchableOpacity>                   
               )}
            /> 
        </View>
    );
}
const ratio = 882 / 1233;

const styles = StyleSheet.create({
    container: {
         flexDirection:'row',
        flexWrap : 'wrap',
    },
    image :{
        width:(Dimensions.get('window').width/2) - 4,
        height: (Dimensions.get('window').height/3) - 32,
        margin : 2,
        padding : 2,
    },
    imagemodal :{
        width : Dimensions.get('window').width,
        height: Dimensions.get('window').width * ratio,
        padding : 50,
    },
    modal:{
        flex:1,
        padding:40,
        backgroundColor:"rgba(0,0,0,0.9)",
        alignItems : 'center',
        justifyContent : "center",
    },
    textview:{
        flexDirection:"row"
    },
    text:{
        fontSize: 25,
        color:'white', 
        flex:1
    }
});