import React, {useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker';
import surahs_items from '../data2'
import pages from '../data3'

const QuestionScreen = () => {
    const [open,setOpen] = useState<boolean>(false);
    const[item, setItems] = useState<any[]>(surahs_items);
    const [value, setValue] = useState<ValueType | null>(null);
    const [surah, setSurah] = useState<ItemType | null>();

    const [open2,setOpen2] = useState<boolean>(false);
    const[item2, setItems2] = useState<any[]>(pages);
    const [value2, setValue2] = useState<ValueType | null>(null);
    const [page, setPages]  = useState<ItemType | null>();

    return (
        <View style={styles.container}>
            <View style={{marginTop: 30}}>
                <Text style={{color: "#FFFFFF", marginTop: 0, marginLeft: 20, fontWeight: 'bold'}}>From which surah would you like to start? </Text>
                <DropDownPicker onSelectItem={(item) => {setSurah(item)}}placeholder="Pick a surah" open={open} setOpen={setOpen} value={value} setValue={setValue} items={item} setItems={setItems} multiple={false}/>
            </View>
            <View style={{marginTop: 150}}>
                <Text style={{color: "#FFFFFF", marginLeft: 20, fontWeight: 'bold'}}>
                    How many pages would you like to read?
                </Text>
                <DropDownPicker onSelectItem={(item) => {setPages(item)}}placeholder="Pick a number of pages to complete" open={open2} setOpen={setOpen2} value={value2} setValue={setValue2} items={item2} setItems={setItems2} multiple={false}/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
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
        marginTop: 200,
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

