import React from 'react';
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
    Username: yup.string().required('Username is required'),
    Email : yup.string().email().required('Email is required'),
    Password : yup.string().max(10).required('Password is required'),
    ConfirmPassword : yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match')
});

const db = firebase.firestore();
const auth = firebase.auth();
export default function Signup({navigation}) {

    const handleSignup = (values) => {
        auth.createUserWithEmailAndPassword(values.Email,values.Password).then(cred => {
            db.collection('Users').add({
                UserID : cred.user.uid,
                Username : values.Username
            }).then(async()=>{
                await AsyncStorage.setItem('userID',cred.user.uid);
                navigation.navigate('App');
            })
        }).catch(error => {   
            switch(error.code) {
            case 'auth/email-already-in-use':
                    Alert.alert('Email already in use !');
                    break;
            }
        });
    }

    return (
        <Formik
                initialValues={{Username:'',Email:'',Password:'',ConfirmPassword:''}}
                validationSchema={ReviewForm}
                onSubmit={(values,actions) => {
                    handleSignup(values);
                    actions.resetForm();
                }}
            >
            {(props) => (
                <View style={styles.container}>
                    <StatusBar backgroundColor='#EEDEDB' barStyle="dark-content" />
                    <Text style={styles.logo}>HeyAPP</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Username..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Username')}
                            value={props.values.Username}
                        />
                    </View>
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
                    <View style={styles.inputView} >
                        <TextInput  
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Confirm Password..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('ConfirmPassword')}
                            value={props.values.ConfirmPassword}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={props.handleSubmit}>
                        <Text style={styles.loginText}>SIGNUP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                        <Text style={styles.loginText}>LOGIN</Text>
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