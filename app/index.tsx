import { Text, View, StyleSheet, Button } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, Easing} from "react-native-reanimated";


export default function index() {
  //Setup animation and gesture vars
  const expandWidth = useSharedValue(100);
  const animConfig = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1)
  };
  const animStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(expandWidth.value, animConfig),
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interval Beat is being rewritten!</Text>
      <Animated.View style={[styles.box, animStyle]}>
        <Button
          title="toggle"
          onPress={() => {
            expandWidth.value = Math.random() * 350
          }}
          />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424'
  },
  title: {
    fontSize: 36,
    color: '#FAFAFA'
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: 'white',
    margin: 30,
  }
})
