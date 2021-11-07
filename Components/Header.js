import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function Header({navigation}) {
    const logout = async()=>{
        await AsyncStorage.clear();
        navigation.navigate("Auth");
    }
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>myAPP</Text>
            <TouchableOpacity onPress={logout} style={styles.icon}>
                <MaterialIcons name="logout" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        height: '100%',
        width: '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: '#2b2b39',
    },
    headerText:{
        fontWeight : 'bold',
        fontSize : 20,
        color : 'white',
        letterSpacing : 1,
    },
    icon :{
        position : 'absolute',
        right : 16,
    }
});