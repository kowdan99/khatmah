import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {ItemType} from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRootParamList } from '../navTypes';
type Props = NativeStackScreenProps<AppRootParamList, 'Log'>;
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

//({surah, pagesRead, startPage} : AppProps): JSX.Element => 
const LogScreen = ({route, navigation} : Props): JSX.Element => {
    const { currentSurah, currentPage, currentStartPage } = route.params;
    //console.log("Routes: ", currentSurah, currentPage, currentStartPage);

    const [totalPages, setTotalPages] = useState("");
    const[newTotalPages, setNewTotalPages] = useState(0);
    const [currentEndPage, setCurrentEndPage] = useState(0); 
    //const [date, setDate] = useState(0);
    const [diff, setDiff] = useState(0);
    const[pagesReadToday, setPagesReadToday] = useState(0);


    useEffect(() => {

        if(currentStartPage?.label !== undefined) {
            setCurrentEndPage(parseInt(currentStartPage?.label));
        }

        const date1 = new Date('05/02/2022');
        const date2 = new Date();

        const diff = Math.abs(date1.getTime() - date2.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 

        //const date2s = JSON.stringify(date2.getDay);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        const date2s = mm + '/' + dd + '/' + yyyy;
        console.log("****DATE****", typeof date2s);

        pagesreadtoday(date2s);
        setDiff(diffDays);
    }, [])

    const pagesreadtoday = (date: string) => {
        getData(date)
        .then((todayPages) => {
            if(currentStartPage?.label !== null && currentStartPage?.label !== undefined) {
                if(todayPages === null) {
                    const newEndPage = currentStartPage.label.toString();
                    setUserData(date, newEndPage);
                    const newEndPageS = parseInt(newEndPage);
                    setPagesReadToday(newEndPageS);
                } else {
                    const pageDiff = parseInt(currentStartPage.label) - parseInt(todayPages);
                    setPagesReadToday(pageDiff);
                }
            }
        })
    }
    
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
                <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Total Pages Read</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 140, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{604 - currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Pages Left To Finish The Quran</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 140, marginLeft: 78, marginRight: 75,fontWeight: 'bold'}}> You will need to finish {Math.floor((604 - currentEndPage)/diff)} pages a day to finish the Quran before Ramadan.</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 140, marginLeft: 20, fontWeight: 'bold', fontSize:15}}> You have read {pagesReadToday} pages today!</Text>
                </View>
            </View>
        ) 
    } else if(isDeviceWidth400_950) {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Total Pages Read</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 170, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{604 - currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Pages Left To Finish The Quran</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 170, marginLeft: 78, marginRight: 75,fontWeight: 'bold'}}> You will need to finish {Math.floor((604 - currentEndPage)/diff)} pages a day to finish the Quran before Ramadan.</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 170, marginLeft: 20, fontWeight: 'bold', fontSize:15}}> You have read {pagesReadToday} pages today!</Text>
                </View>
            </View>
        ) 
    } else if(isDeviceWidth360_374) {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Total Pages Read</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 75, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{604 - currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Pages Left To Finish The Quran</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 75, marginLeft: 78, marginRight: 75,fontWeight: 'bold'}}> You will need to finish {Math.floor((604 - currentEndPage)/diff)} pages a day to finish the Quran before Ramadan.</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 75, marginLeft: 20, fontWeight: 'bold', fontSize:15}}> You have read {pagesReadToday} pages today!</Text>
                </View>
            </View>
        ) 
    } else {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Total Pages Read</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 70, marginLeft: 20, fontWeight: 'bold', fontSize: 50}}>{604 - currentEndPage}</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}> Pages Left To Finish The Quran</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 70, marginLeft: 20, fontWeight: 'bold'}}> You will need to finish {Math.floor((604 - currentEndPage)/diff)} pages a day to finish the Quran before Ramadan.</Text>
                    <Text style={{color: "#FFFFFF", marginTop: 70, marginLeft: 20, fontWeight: 'bold', fontSize:15}}> You have read {pagesReadToday} pages today!</Text>
                </View>
            </View>
        ) 
    }
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