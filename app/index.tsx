//Import requried libs
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, Easing} from "react-native-reanimated";
import { useFonts } from "expo-font";
//Import components
import VideoBackground from '../components/VideoBackground';


export default function index() {
  
  //Setup hooks
  const [loaded, error] = useFonts({
    'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf')
  })

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={StyleSheet.absoluteFillObject}>
        <VideoBackground/>
      </View>
      <View style={styles.foregroundContainer}>
        <Text style={styles.heading}>Run to the beat. Literally.</Text>
      </View>
    </View>
    
      
  );
}
const styles = StyleSheet.create({
  foregroundContainer: {
    backgroundColor: 'transparent',
    paddingLeft: 25,
    bottom: -350
  },
  heading: {
    color: 'black',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 60,
  }
})
