import { View, Pressable, Image, Text, StyleSheet } from 'react-native'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons';

const logoPng = require('../assets/images/logo.png')

export default function TitleBar({onPress}: any) {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.settingsContainer}>
                    <Pressable
                        onPress={onPress}>
                        <FontAwesome6 name="gear" size={35} />
                    </Pressable>
                </View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logoPng}></Image>
                </View>
                <View style={styles.themeContainer}>
                    <Ionicons name="moon" size={35} color="black" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    settingsContainer: {
        alignItems: 'center',
        padding: 10
    },
    logoContainer: {
        alignItems: 'center',
        padding: 5
    },
    logo: {
        width: 80,
        height: 60,
    },
    themeContainer: {
        alignItems: 'center',
        padding: 10,

    }
})