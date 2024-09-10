import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { welcomeQuotes } from "@/util/misc/welcomeQuotes";
import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import { useLocalSearchParams } from "expo-router";
import getSensors from "@/components/SensorConfig";
import SensorConfig from "@/components/SensorConfig";

let quote = welcomeQuotes[Math.floor(Math.random()*welcomeQuotes.length)]
const globalParams = useLocalSearchParams();

//Home Page 
export default function Home({navigation}: any) {
    const [loaded, error] = useFonts({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
        'Alumni-Sans-Bold': require('../assets/fonts/static/AlumniSans-Bold.ttf'),
        'Alumni-Sans': require('../assets/fonts/static/AlumniSans-Light.ttf'),
      });
    return (
        <View>
            <View style={styles.titleBarContainer}>
                <Text style={styles.title}>{quote}</Text>
            </View>
            <View>
                <Text>{globalParams.profile}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    titleBarContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Alumni-Sans',
        fontSize: 45,

    }
})