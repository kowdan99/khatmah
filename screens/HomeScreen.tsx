import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import QuestionScreen from './QuestionScreen';
import { Image } from 'react-native';

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
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                    <TextInput placeholder='Password' value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText} >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText} >Register</Text>
                    </TouchableOpacity> 
                </View>
            </KeyboardAvoidingView>
        </View>
    )
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
    button: {
        backgroundColor: '#0782F9',
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
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
  });