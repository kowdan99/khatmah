import { useNavigation } from '@react-navigation/native';
import React, {Key, useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker';
import surahs_items from '../data2'
import pages from '../data3'
import LogScreen from './LogScreen';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuestionScreen = () => {
    //First picker data
    const [open,setOpen] = useState<boolean>(false);
    const[item, setItems] = useState<any[]>(surahs_items);
    const [value, setValue] = useState<ValueType | null>(null);

    //Once a chapter/surah is selected
    const [surah, setSurah] = useState<ItemType | null>();

    //Second picker data
    const [open2,setOpen2] = useState<boolean>(false);
    const[item2, setItems2] = useState<any[]>(pages);
    const [value2, setValue2] = useState<ValueType | null>(null);

    //third picker data
     const [open3,setOpen3] = useState<boolean>(false);
     const[item3, setItems3] = useState<any[]>([]);
     const [value3, setValue3] = useState<ValueType | null>(null);

    // Data for how many pages is being read
    const [page, setPages]  = useState<ItemType | null>();

    // Hooks to grab all of the chapters
    // then match each chapter's name with the one requested
    //then populate those pages of that chapter to the surahPage
    const[surahs, setSurahs] = useState<any[]>([]);

    // what page user is starting from
    const[startPage, setStartPage] = useState<ItemType | null>();

    const navigation = useNavigation();

    useEffect(()=> {
        getSurahData();
    }, [surah])

    async function getSurahData() {
        const res = await fetch(`https://api.quran.com/api/v4/chapters?language=en`);

        const json = await res.json();
        console.log("SURAH HAS BEEN SELECTED");

        setSurahs(json.chapters);
        surahs.map((surah_api) => {
            if(surah !== null) {
                if(surah_api.name_simple === surah?.label) {
                    //setSurahPage(surah_api.pages);
                    var pages = [];
                    for(var i = surah_api.pages[0]; i <= surah_api.pages[1]; i++) {
                        pages.push({
                            label: i,
                            value: i
                        })
                    }
                    setItems3(pages);
                    console.log(pages);
                }
            }
        })
    }

    const isFocused = useIsFocused();
    const[lastSurah, setLastSurah] = useState("");
    const[lastPage, setLastPage] = useState("");
    useEffect(()=> {
        if(isFocused) {
            pagesread();
            prevStartPage();
            //getSurahBasedOnPage(pagesRead, previousStartPage);
        }
    }, [isFocused])

    const pagesread = () => {
        getData("Previous surah read")
        .then((lastsurah) => {
            if(lastsurah !== null) {
                setLastSurah(lastsurah);
            }
        })
    }

    const prevStartPage = () => {
        getData("Previous end page")
        .then((endpage) => {
            if(endpage !== null) {
                setLastPage(endpage);
            }
        })
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

    async function setUserData(key: string, value: string) {
        try {
            console.log("setUserData is called");
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log(e);
        }
    }

    const navigate = () => {
        if(surah?.label !== null && surah?.label !== undefined) {
            const newSurah = surah.label?.toString();
            setUserData("Previous surah read", newSurah);
        }

        if(startPage?.label !== null && startPage?.label !== undefined) {
            const newStartP = startPage.label?.toString()
            setUserData("Previous end page", newStartP);
        }
        navigation.navigate('Log', {currentSurah: surah, currentPage: page, currentStartPage: startPage});
    }
    
    return (
        <View style={styles.container}>
            <View style={{marginTop: 30}}>
                <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}>What surah did you stop at?</Text>
                <DropDownPicker onSelectItem={(item) => {setSurah(item)}}placeholder="Pick a surah" open={open} setOpen={setOpen} value={value} setValue={setValue} items={item} setItems={setItems} multiple={false}/>
                {lastSurah == "" && lastPage == "" ? null : <Text style={{color: "#FFFFFF", marginLeft: 20, fontWeight: 'normal', fontStyle:'italic'}}> You stopped last at surah: {lastSurah}, on page {lastPage}</Text>}
            </View>
            {/* <View style={{marginTop: 80}}>
                <Text style={{color: "#FFFFFF", marginLeft: 20, fontWeight: 'bold'}}>
                    How many pages would you like to read?
                </Text>
                <DropDownPicker onSelectItem={(item) => {setPages(item)}}placeholder="Pick a number of pages to complete" open={open2} setOpen={setOpen2} value={value2} setValue={setValue2} items={item2} setItems={setItems2} multiple={false}/>
            </View> */}
            <View style={{marginTop: 180}}>
                <Text style={{color: "#FFFFFF", marginLeft: 20, fontWeight: 'bold'}}>
                    What page did you stop at?
                </Text>
                <DropDownPicker onSelectItem={(item) => {setStartPage(item)}} placeholder="Pick a page number" open={open3} setOpen={setOpen3} value={value3} setValue={setValue3} items={item3} setItems={setItems3} multiple={false}/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={navigate} style={styles.button}>
                    <Text style={styles.buttonText}>Start counting ✨</Text>
                </TouchableOpacity>  
            </View>
        </View>
    )
    
}
export default QuestionScreen

const styles = StyleSheet.create({
    container: { 
        display: 'flex',
        flex: 1,
        backgroundColor: '#6667AB',
        flexDirection: 'column'
    }, 
    input: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius:10,
        marginTop:5,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 180,
        marginLeft: 30
    },
    button: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        // alignItems: 'center',
    },
    buttonText: {
        color: "#6667AB",
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 50
    }
})

