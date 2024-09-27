//Import Required Libraries

import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFonts } from "expo-font";
import {buildQuote} from "@/util/misc/welcomeQuotes"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";
import { userProfile } from "@/util/types/types";
import { getSongTitles, getArtistTitles } from "@/util/scripts/api";
import * as SecureStore from 'expo-secure-store';

//Import Components

import TitleBar from '../components/TitleBar'


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
    const [quote, setQuote] = useState<string | null>("");
    const [topSongs, setTopSongs] = useState<string[]>([]);
    const [topArtists, setTopArtists] = useState<string[]>([]);
    const [loaded, error] = useFonts({
        'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
        'InriaSans-Regular': require('../assets/fonts/InriaSans-Regular.ttf'),
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
        const getSongArtistTitlesAsync = async () => {
            if (userProfile.current) {
                //Retrieve access token
                const accessToken = await secureRetrieve("access_token");
                if (accessToken) {
                    const songs = await getSongTitles(accessToken, userProfile.current.profileData.topSongs)
                    if (songs) {
                        setTopSongs(songs)
                    }
                    const artists = await getArtistTitles(accessToken, userProfile.current.profileData.topArtists)
                    if (artists) {
                        setTopArtists(artists)
                    }
                }
            }
        }
        getSongArtistTitlesAsync()
    }, [userProfile.current])

    return (
        <View>
            <View>
                <TitleBar/>
            </View>
            <View>
                <Text style={styles.welcomeQuote}>{quote}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    titleBarContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    welcomeQuote: {
        fontFamily: 'Alumni-Sans-Italic',
        fontSize: 45,
        padding: 15,

    },
})