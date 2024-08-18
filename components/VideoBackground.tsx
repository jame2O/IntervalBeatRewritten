import { useVideoPlayer, VideoView} from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button, Dimensions } from 'react-native';

const videoSource = require('../assets/videos/runningbg.mp4');

export default function VideoScreen() {
    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    useEffect(() => {
        const subscription = player.addListener('playingChange', isPlaying => {
            setIsPlaying(isPlaying);
        });

        return () => {
            subscription.remove();

        };
    }, [player]);

    return (
        <View style={styles.contentContainer}>
            <VideoView
                ref={ref}
                style={[styles.video, {
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width}
                    ]}
                player={player}
            />
        </View>
    );

}
const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: 1080,
        height: 1920,
        opacity: 0.5
    },
})
