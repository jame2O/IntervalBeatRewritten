//Import requried libs
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, Easing} from "react-native-reanimated";
import { useFonts } from "expo-font";
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
//Import components
import VideoBackground from '../components/VideoBackground';
import LoginButton from "../components/LoginButton";
import { discovery } from "expo-auth-session/build/providers/Google";
import { useEffect } from "react";


export default function index() {
  
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
    clientId: 'cc256e16ace249129a34b80bbaaf3636',
    scopes: ['user-read-email', 'playlist-modify-public'],
    usePKCE: false,
    redirectUri: makeRedirectUri({
      native: 'IBRewritten://',
    })
  },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
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
    color: 'black',
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
