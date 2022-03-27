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

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if(currentSurah != null) {
            if(currentSurah.label !== undefined)
            setUserData("Surah", currentSurah.label);
        }

        if(currentPage != null) {
            if(currentPage.label !== undefined)
            setUserData("Pages read", currentPage.label);
        } 

        if(currentStartPage != null) {
            if(currentStartPage.label !== undefined)
            setUserData("Start page", currentStartPage.label);
        }  

        const total = getData("Total pages");
        if(total === null) {
            setUserData("Total pages", currentPage as string);
        } else {
            var newTotal: string;
            //total.finally(() => (newTotal = total)) 
            //parseInt(pagesRead.label as string)
        }
    }, [])

    async function setUserData(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log(e);
        }
    }
    
    async function getData(key: string): Promise<string | null> {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            return value;
          } else {
              return null;
          }
        } catch(e) {
            return "Error";
        }
    }
    return (
        <View style={styles.container}>
            <View style={{marginTop: 30}}>
                <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}>YOO</Text>
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
        flexDirection: 'column'
    }, 
})