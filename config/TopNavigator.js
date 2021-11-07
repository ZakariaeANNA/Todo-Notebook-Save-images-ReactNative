import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons'; 
import Notebook from '../Components/Notebook';
import Todo from '../Components/Todo';
import Ajouter from '../Components/Ajouter';
import React from 'react';
import Header from '../Components/Header';
import Image from '../Components/Image';


const TabNavigator = createMaterialTopTabNavigator(
    {
        Image : {
          screen : Image,
          navigationOptions: {
              tabBarLabel: ({tintColor}) => (
                <View style={styles.iconCOntainer}>
                  <Ionicons name="image" size={24} color="white" />
                  <Text style={{color: tintColor}}>Gallery</Text>
                </View>
              ),
            },
        },
        Notebook : {
            screen : Notebook,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                  <View style={styles.iconCOntainer}>
                    <Ionicons name="book" size={24} color="white" />
                    <Text style={{color: tintColor}}>Notebook</Text>
                  </View>
                ),
              },
        },
        Add : {
            screen : Ajouter,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                  <View style={styles.iconCOntainer}>
                    <Ionicons name="add-circle" size={24} color="white" />
                    <Text style={{color: tintColor}}>Add</Text>
                  </View>
                ),
              },
        },
        TODO : {
            screen : Todo,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                  <View style={styles.iconCOntainer}>
                    <Ionicons name="calendar" size={24} color="white" />
                    <Text style={{color: tintColor}}>TODO</Text>
                  </View>
                ),
              },
        }
    },
    {
        initialRouteName : 'Add',
        lazyLoad: true,
        tabBarPosition: 'top',
        swipeEnabled: true,
        tabBarOptions: {
            style: {
                height: 70,
                backgroundColor: '#40404c',
                paddingBottom: 3,
                paddingTop: 3,
            },
            indicatorStyle: {
                backgroundColor: '#fff',
                elevation: 10,
            },
            activeTintColor: '#fff',
            inactiveTintColor: 'gray',
        },
    },
);

export default MainScreenNavigator = createStackNavigator({
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: ({navigation}) => {
          return {
            headerTitle: () => <Header navigation={navigation}/>,
            headerStyle: {
              backgroundColor: '#2b2b39',
            },
          }
      },
    },
});

const styles = StyleSheet.create({
    iconCOntainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
});

