import { View, Pressable, Image, Text, StyleSheet } from 'react-native'

const logoPng = require('../assets/images/logo.png')

export default function TitleBar({props}: any) {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Pressable>
                        <Image>
                            
                        </Image>
                    </Pressable>
                    <Image style={styles.logo} source={logoPng}></Image>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderBottomWidth: 2,
        borderColor: 'black'
    },
    settingsContainer: {
        alignItems: 'center',
        padding: 5,

    },
    logoContainer: {
        alignItems: 'center',
        padding: 5
    },
    logo: {
        width: 60,
        height: 60
    }
})