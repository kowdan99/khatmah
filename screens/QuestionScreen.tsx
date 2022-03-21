import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const QuestionScreen = () => {
    const [surahs, updateSurahs] = useState<any>([]);
    const [value, setValue] = useState<any>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        requestSurahs();
    }, []);
    
    async function requestSurahs() {
         const res = await fetch(`https://api.quran.com/api/v4/chapters?language=en`);
    
         const json = await res.json();
         console.log(json);
    
         updateSurahs(json.name_simple);
    }

    return (
        <View style={styles.container}>
            <Text style={{color: "#FFFFFF", marginTop: 30, marginLeft: 20}}>From which surah and page would you like to start? </Text>
            <DropDownPicker min={0} open={open} setOpen={setOpen} value={value} setValue={setValue} items={surahs} setItems={surahs} multiple={true}/>
        </View>
    )
}
export default QuestionScreen

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#6667AB',
    }, 
    input: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius:10,
        marginTop:5,
    },
})

