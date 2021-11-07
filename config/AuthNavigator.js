import React,{Component} from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from '../Components/Authentification/Login';
import Signup from '../Components/Authentification/Signup';

export default AuthStack = createStackNavigator(
    {
        Login : Login,
        Signup : Signup,
    },
    {
        initialRouteName : 'Login',
        defaultNavigationOptions :{
            headerShown : false
        }
    }
)

