//Import requried libs
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, Easing} from "react-native-reanimated";
import { useFonts } from "expo-font";
//Import components
import VideoBackground from '../components/VideoBackground';
import LoginButton from "../components/LoginButton";


export default function index() {
  
  //Setup hooks
  const [loaded, error] = useFonts({
    'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
    'Alumni-Sans': require('../assets/fonts/static/AlumniSans-Light.ttf'),
  })

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={StyleSheet.absoluteFillObject}>
        <VideoBackground/>
      </View>
      <View style={styles.foregroundContainer}>
        <Text style={styles.heading}>RUN TO THE BEAT. LITERALLY.</Text>
        <Text style={styles.subheading}>Welcome to the exercise music revolution.</Text>
        <LoginButton />
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
