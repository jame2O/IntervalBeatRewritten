//Import requried libs
import { Text, View, StyleSheet, Button, Dimensions, Platform } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, Easing} from "react-native-reanimated";
import { processFontFamily, useFonts } from "expo-font";
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import * as SplashScreen from 'expo-splash-screen';
import { router} from 'expo-router';
//Import components, types & scripts
import VideoBackground from '../components/VideoBackground';
import LoginButton from "../components/LoginButton";
import { useEffect } from "react";
import { fetchProfile, fetchAccessToken } from "@/util/scripts/loginAuth";
import { userProfile } from "@/util/types/types";

const client_id = 'cc256e16ace249129a34b80bbaaf3636'
const redirect_uri = 'exp://192.168.1.75:8081'
const client_secret = 'ab54032ba4954cf2b6282a01933e05f1'

export default function Login({navigation}: any) {
  //Setup hooks
  const [loaded, error] = useFonts({
    'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
    'Alumni-Sans': require('../assets/fonts/static/AlumniSans-Light.ttf'),
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
      const fetchData = async () => {
        const authCode = response.params.code;
        const accessToken = await fetchAccessToken(authCode, client_id, client_secret, redirect_uri);
        console.log(accessToken)
        const userProfile = await fetchProfile(accessToken);
        router.setParams({profile: userProfile})
        
      }
      fetchData();
      router.replace('./Home')
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
    fontFamily: 'Alumni-Sans',
    fontSize: 30
  }
})
