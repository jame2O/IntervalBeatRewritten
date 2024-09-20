//Import requried libs
import { Text, View, StyleSheet, Button, Dimensions, Platform } from "react-native";
import { useFonts } from "expo-font";
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useEffect } from "react";
import { fetchProfile, fetchAccessToken } from "@/util/scripts/loginAuth";
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'
//Import components, types & scripts
import VideoBackground from '../components/VideoBackground';
import LoginButton from "../components/LoginButton";

//Prevent splash screen from hiding automatically, wait for fonts to finish loading
SplashScreen.preventAutoHideAsync();

const client_id = 'cc256e16ace249129a34b80bbaaf3636'
//Needs replacing time everytime device is switched.
const redirect_uri = 'exp://172.22.46.185:8081' // Laptop: exp://172.22.46.185, PC: exp://co7elmm-james2o-8081.exp.direct
const client_secret = 'ab54032ba4954cf2b6282a01933e05f1'

//Save to secure storage base function.
async function secureSave(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export default function Login({navigation}: any) {
  secureSave("client_id", client_id);
  secureSave("client_secret", client_secret);
  secureSave("redirect_uri", redirect_uri)
  //Setup hooks
  const [loaded, error] = useFonts({
    'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
    'InriaSans-Regular': require('../assets/fonts/InriaSans-Regular.ttf')
  })
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  }
  const [request, response, promptAsync] = useAuthRequest(
    {
    clientId: client_id,
    scopes: ['user-read-email', 'user-read-private', 'user-top-read'],
    usePKCE: false,
    redirectUri: makeRedirectUri({
      native: redirect_uri
    })
  },
    discovery
  );
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }), [loaded, error]

  useEffect(() => {
    if (response?.type === 'success') {
      console.log("Login Successful")
      //Fetches access token and profile info, including top songs and artists,
      //then saves profile info to storage.
      const fetchData = async () => {
        console.log("Fetching data...")
        const authCode = response.params.code;
        const accessToken = await fetchAccessToken(authCode, client_id, client_secret, redirect_uri);
        const userProfile = await fetchProfile(accessToken);
        
        try {
          //Save auth code and access code to secure location.
          secureSave("auth_code", authCode);
          secureSave("access_token", accessToken)
          await AsyncStorage.setItem("user-profile", JSON.stringify(userProfile))
          console.log("User profile successfully saved")
          router.replace('./home')
        } catch (e) {
          console.error(e)
        }
      }
      fetchData();
      

    } else if (response?.type === "error"){
      alert("Login Failed. Please Try Again")

    }
  }, [response]);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={StyleSheet.absoluteFillObject}>
        <VideoBackground/>
      </View>
      <View style={styles.foregroundContainer}>
        <Text style={styles.heading}>RUN TO THE BEAT. LITERALLY.</Text>
        <Text style={styles.subheading}>Welcome to the exercise music revolution.</Text>
          <LoginButton onPress={() => {
            promptAsync();
            }}
          disabled={!request}/>
      </View>
    </View>
    
      
  );
}
const styles = StyleSheet.create({
  foregroundContainer: {
    backgroundColor: 'transparent',
    paddingLeft: 25,
    bottom: -600
  },
  heading: {
    fontFamily: 'Alumni-Sans-Italic',
    color: 'white',
    fontSize: 60,
    lineHeight: 60,
  },
  subheading: {
    color: 'white',
    fontFamily: 'InriaSans-Regular',
    fontSize: 25
  }
})
