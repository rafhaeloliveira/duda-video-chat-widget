import React, { LegacyRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Props { 
    options: videojs.PlayerOptions
}

const initialOptions: videojs.PlayerOptions = {
    autoplay: true,
    muted: true,
    controls: true,    
    fluid: true,
    controlBar: {
        volumePanel: {
            inline: false
        }
    }
}

const VideoJs = ({ options }: Props) => {
    const videoRef = React.useRef<HTMLVideoElement>();
    const playerRef = React.useRef<videojs.Player>();

    React.useEffect(() => {
        playerRef.current = videojs(videoRef.current as Element, {
            ...initialOptions,
            ...options
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        }).ready(() => {
            const videoElement = document.getElementById("vjs_video_3");
        })

        return () => {
            if(playerRef.current) {
                playerRef.current.dispose();
            }
        }
    }, [options])

    return (
        <video 
            ref={videoRef as LegacyRef<HTMLVideoElement>}
            style={{ maxHeight: '700px' }}
            className="video-js vjs-big-play-centered vjs-16-9 vjs-fill"
        />
    )
}

export default VideoJs;