//Import requried libs
import { Text, View, StyleSheet, Button, Dimensions, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, Easing} from "react-native-reanimated";
import { useFonts } from "expo-font";
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import * as SplashScreen from 'expo-splash-screen';
//Import components & scripts
import VideoBackground from '../components/VideoBackground';
import LoginButton from "../components/LoginButton";
import { useEffect } from "react";
import { fetchProfile, fetchAccessToken } from "@/util/scripts/loginAuth";

const client_id = 'cc256e16ace249129a34b80bbaaf3636'
const redirect_uri = 'exp://192.168.1.75:8081'
const client_secret = 'ab54032ba4954cf2b6282a01933e05f1'

export default function index() {
  //Setup hooks
  const router = useRoute();
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
    scopes: ['user-read-email', 'user-read-private'],
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
      }
      fetchData();
      navigation('/home', {id: 5});
    } else {
      console.log(response?.type)
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
    bottom: -475
  },
  heading: {
    fontFamily: 'Alumni-Sans-Italic',
    fontSize: 60,
    lineHeight: 60,
  },
  subheading: {
    color: 'black',
    fontFamily: 'Alumni-Sans',
    fontSize: 30
  }
})
