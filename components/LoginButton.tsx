//Import libs
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, Easing} from "react-native-reanimated";
import { useFonts } from "expo-font";

export default function LoginButton() {
    //Setup hooks
    const [loaded, error] = useFonts({
        'Alumni-Sans-Italic': require('../assets/fonts/static/AlumniSans-BoldItalic.ttf'),
    })
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.button}
                onPress={() => alert("This does nothing... yet!")}
            >
                <FontAwesomeIcon icon={faSpotify} />
                <Text style={styles.buttonText}>Login With Spotify</Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 20,
        width: '70%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
    },
    button: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'black',
        width: '100%',
        height: '100%',
        backgroundColor: '#1DB954',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'Alumni-Sans-Italic',
        paddingLeft: 10,
    },
});