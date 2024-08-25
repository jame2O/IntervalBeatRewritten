import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { welcomeQuotes } from "@/util/misc/welcomeQuotes";
import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";


let quote = welcomeQuotes[Math.floor(Math.random()*welcomeQuotes.length)]


//Home Page 
export default function home() {
    const [loaded, error] = useFonts({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
        'Alumni-Sans-Bold': require('../assets/fonts/static/AlumniSans-Bold.ttf'),
        'Alumni-Sans': require('../assets/fonts/static/AlumniSans-Light.ttf'),
      });
    const [isPedometerAvailable,setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);

    const subscribe = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
            const sampleStart = new Date();
            const sampleEnd = new Date();
            sampleStart.setDate(sampleEnd.getDate() - 1)

            const pastStepCountResult = await Pedometer.getStepCountAsync(sampleStart, sampleEnd);
            if (pastStepCountResult) {
                setPastStepCount(pastStepCountResult.steps);
            }
        }
        return Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps)
        })
    };

    useEffect(() => {
        const returnFunc = async () => {
            const subscription = await subscribe();
            return () => subscription && subscription.remove();
        }
        returnFunc();
    }, []);
    return (
        <View>
            <View style={styles.titleBarContainer}>
                <Text style={styles.title}>{quote}</Text>
            </View>
            <View>
                <Text>Pedometer Status: {isPedometerAvailable}</Text>
                <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
                <Text>Current Steps: {currentStepCount}</Text>
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