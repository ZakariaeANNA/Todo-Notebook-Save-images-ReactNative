import React , {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,StatusBar, Alert,AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import KeyApi from '../../constants/keyApi';
import { LogBox } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const ReviewForm = yup.object({
    Email : yup.string().email().required('Email is required'),
    Password : yup.string().max(10).required('Password is required'),
});

const db = firebase.firestore();
const auth = firebase.auth();

export default function Login({navigation}) {

    const handleLogin = (values) => {
        auth.signInWithEmailAndPassword(values.Email,values.Password).then(async(cred) => {
            await AsyncStorage.setItem('userID',cred.user.uid);
            navigation.navigate('App');
        }).catch(error => {   
            Alert.alert(error.code);
        });
    }
    
    return (
        <Formik
                initialValues={{Email:'',Password:''}}
                validationSchema={ReviewForm}
                onSubmit={(values,actions) => {
                    handleLogin(values);
                    actions.resetForm();
                }}
            >
            {(props) => (
                <View style={styles.container}>
                    <StatusBar backgroundColor='#EEDEDB' barStyle="dark-content" />
                    <Text style={styles.logo}>myAPP</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Email..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Email')}
                            value={props.values.Email}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput  
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Password')}
                            value={props.values.Password}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginBtn}  onPress={props.handleSubmit}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                        <Text style={styles.loginText}>SIGNUP</Text>
                    </TouchableOpacity>
                </View>
            )}
            </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#EEDEDB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#465881",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
        borderColor:"#465881",
        borderWidth : 2,
    },
    inputText:{
        height:50,
        color:"white",
        fontSize : 20,
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white",
        fontSize : 20,
    }
});