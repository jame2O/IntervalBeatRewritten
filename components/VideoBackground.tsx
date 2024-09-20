import { Video, ResizeMode } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button, Dimensions } from 'react-native';

export default function VideoScreen() {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Video
                    ref={video}
                    style={styles.video}
                    source={require('../assets/videos/runningbg.mp4')}
                    resizeMode={ResizeMode.COVER}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    isLooping
                    shouldPlay={true}
                />
            
        </View>
    );

}
const styles = StyleSheet.create({
    video: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        opacity: 0.5,
    },
});
