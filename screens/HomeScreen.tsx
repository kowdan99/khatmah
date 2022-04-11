import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import QuestionScreen from './QuestionScreen';
import { Image } from 'react-native';
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

const HomeScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logo = require('../images/khatmahPic.png');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user.email);
            navigation.navigate('Questions')
            signOut(auth).then(() => {
                console.log("signed out")
              }).catch((error) => {
                console.log("Error:", error)
            });
        }
        })
        return () => unsubscribe();
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('registered with', user.email);
            })
            .catch((error) => alert(error.message));
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('logged in with', user.email);
        })
        .catch((error) => alert(error.message));
    }

    const navigate = () => {
        navigation.navigate('Questions');
    }
    
    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });
    const isDeviceWidth295_359 = useMediaQuery({
        query: "(min-device-width:400) and (max-device-height:900)",
    });
    const isDeviceWidth400_950 = useMediaQuery({
        query: "(min-device-width:400) and (max-device-height:950)",
    });
    const isDeviceWidth360_374 = useMediaQuery({
        query: "(min-device-width:375) and (max-device-width:767)",
    });

    if(isDeviceWidth295_359) {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logoMax}/>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.buttonContainerMax}>
                        <TouchableOpacity onPress={navigate} style={styles.button}>
                            <Text style={styles.buttonText}>Start here</Text>
                        </TouchableOpacity>  
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    } else if(isDeviceWidth360_374) {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logoMaxPro2}/>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.buttonContainerMax}>
                    <TouchableOpacity onPress={navigate} style={styles.button}>
                        <Text style={styles.buttonText}>Start here</Text>
                    </TouchableOpacity>  
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    } else if(isDeviceWidth400_950) {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logoMaxPro}/>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.buttonContainerMax}>
                        <TouchableOpacity onPress={navigate} style={styles.button}>
                            <Text style={styles.buttonText}>Start here</Text>
                        </TouchableOpacity>  
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo}/>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.buttonContainerMax}>
                        <TouchableOpacity onPress={navigate} style={styles.button}>
                            <Text style={styles.buttonText}>Start here</Text>
                        </TouchableOpacity>  
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default HomeScreen; 

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      display: 'flex',
      backgroundColor: '#6667AB',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }, 
    logo: {
        width: 200,
        height: 200,
        marginTop: 50
    },
    logoMax: {
        width: 200,
        height: 200,
        marginTop: 100
    },
    logoMaxPro: {
        width: 200,
        height: 200,
        marginTop: 110
    },
    logoMaxPro2: {
        width: 200,
        height: 200,
        marginTop: 100
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 70,
        paddingVertical: 10,
        borderRadius:10,
        marginTop:5,
    },
    inputContainer: {
        marginTop: 25,
        width: '80%'
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    buttonContainerMax: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    button: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        // alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonText: {
        color: "#6667AB",
        fontWeight: '700',
        fontSize: 16
    }
  });