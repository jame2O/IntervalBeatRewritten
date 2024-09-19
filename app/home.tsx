import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFonts } from "expo-font";
import { buildQuote } from "@/util/misc/welcomeQuotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";
import { userProfile } from "@/util/types/types";
import { getSongTitlesApi } from "@/util/scripts/api";
import * as SecureStore from 'expo-secure-store';

async function secureRetrieve(key:string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        console.warn("No value was found in SecureStore with the queried key.")
    }
}
export default function Home() {
    const userProfile = useRef<userProfile | null>(null);
    const [quote, setQuote] = useState<string | null>("")
    const [topSongs, setTopSongs] = useState<string[]>([])
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
                    userProfile.current = JSON.parse(json);
                    //Ensure that profile ref is not null
                    if (userProfile.current) {
                        const quote = buildQuote(userProfile.current.display_name);
                        setQuote(quote)
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        getUserProfile();
    }, []);
    useEffect(() => {
        const getSongTitles = async () => {
            if (userProfile.current) {
                //Retrieve access token
                const accessToken = await secureRetrieve("access_token");
                if (accessToken) {
                    const songs = await getSongTitlesApi(accessToken, userProfile.current.profileData.topSongs)
                    if (songs) {
                        setTopSongs(songs)
                    }
                }
            }
        }
        getSongTitles()
    }, [userProfile.current])

    return (
        <View>
            <View style={styles.titleBarContainer}>
                <Text style={styles.title}>{quote}</Text>
                <Text>Your Top 10 Songs: </Text>
                <FlatList
                    data={topSongs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text>{item}</Text>}
                />
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