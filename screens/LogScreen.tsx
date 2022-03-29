import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {ItemType} from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRootParamList } from '../navTypes';
type Props = NativeStackScreenProps<AppRootParamList, 'Log'>;

//({surah, pagesRead, startPage} : AppProps): JSX.Element => 
const LogScreen = ({route, navigation} : Props): JSX.Element => {
    const { currentSurah, currentPage, currentStartPage } = route.params;
    //console.log("Routes: ", currentSurah, currentPage, currentStartPage);

    const [totalPages, setTotalPages] = useState("");
    const[newTotalPages, setNewTotalPages] = useState(0);
    
    // console.log(typeof currentSurah?.label);
    // console.log(typeof currentPage?.label);
    useEffect(() => {
        if(currentSurah != null) {
            if(currentSurah.label !== undefined)
            setUserData("Surah", currentSurah.label);
            console.log("currentSurah is recorded in storage");
            console.log("currentSurah type is", typeof currentSurah.label);
        }

        if(currentPage != null) {
            if(currentPage.label !== undefined)
            setUserData("Pages read", currentPage.label);
            console.log("currentPage is recorded in storage");
            console.log("currentPage type is", typeof currentPage.label);
        } 

        if(currentStartPage != null) {
            if(currentStartPage.label !== undefined)
            setUserData("Start page", (currentStartPage.label + ""));
            console.log(typeof currentStartPage.label + "");
            console.log("currentStartPage is recorded in storage");
            console.log("currentStartPage type is", typeof (currentStartPage.label + ""));
        }  

        const total = () => { 
            getData("Total pages")
            .then((previousTotal) => {
                if(previousTotal === null) {
                    console.log("Previous total is null");
                    console.log(typeof currentPage?.label as string);
                    setUserData("Total pages", currentPage?.label as string);
                    if(currentPage?.label != undefined) {
                        setNewTotalPages(parseInt(currentPage?.label as string));
                    }
                } else {
                    console.log("Previous total is not null");
                    console.log("Current page label is ", currentPage?.label);
                    var newTotal;
                    if(Number.isNaN(parseInt(currentPage?.label as string))) {
                        newTotal = parseInt(previousTotal);
                    } else {
                        newTotal = parseInt(previousTotal) + parseInt(currentPage?.label as string);
                    }
                    console.log(previousTotal);
                    console.log("yooooo", newTotal);
                    setUserData("Total pages", (newTotal + ""));
                    setNewTotalPages(newTotal);
                }
            }).catch((error) => alert(error.message))
        }

        total();
    }, [])

    async function setUserData(key: string, value: string) {
        try {
            console.log("setUserData is called");
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log(e);
        }
    }
    
    async function getData(key: string): Promise<string | null> {
        try {
          const value = await AsyncStorage.getItem(key)
          if(value !== null) {
            return value;
          } else {
              return null;
          }
        } catch(e) {
            return "Error";
        }
    }

    const navigate = () => {
        navigation.navigate('Questions');
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={navigate}style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>  
            </View>
            <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}>TOTAL PAGES: {newTotalPages}</Text>
            </View>
        </View>
    ) 
}

export default LogScreen;

const styles = StyleSheet.create({
    container: { 
        display: 'flex',
        flex: 1,
        backgroundColor: '#6667AB',
        flexDirection: 'column',
        // alignItems: 'center', 
        // justifyContent: 'center'
    }, 
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    button: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        paddingHorizontal: 0,
        borderRadius: 10,
        // alignItems: 'center',
    },
    buttonText: {
        color: '#6667AB',
        fontWeight: '700',
        fontSize: 16,
    }
})