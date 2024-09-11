import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { buildQuote } from "@/util/misc/welcomeQuotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function Home() {
    const [quote, setQuote] = useState("")
    const [loaded, error] = useFonts({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
        'Alumni-Sans-Bold': require('../assets/fonts/static/AlumniSans-Bold.ttf'),
        'Alumni-Sans': require('../assets/fonts/static/AlumniSans-Light.ttf'),
      });

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const json = await AsyncStorage.getItem("user-profile");
                
                if (json != null) {
                    const profile = JSON.parse(json);
                    const quote = buildQuote(profile.display_name)
                    setQuote(quote)
                }
            } catch (e) {
                console.error(e);
            }
        }
        getUserProfile()
    }, [quote]);

    return (
        <View>
            <View style={styles.titleBarContainer}>
                <Text style={styles.title}>{quote}</Text>
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
        fontFamily: 'Alumni-Sans-Italic',
        fontSize: 45,

    }
})