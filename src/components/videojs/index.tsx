import React from 'react';
import videojs, { VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';

interface Props { 
    options: {
        autoplay: boolean
        sources: VideoJsPlayerOptions
    }
    onReady: (arg: any) => void 
}

const initialOptions = {
    controls: true,
    fluid: true,
    controlBar: {
        volumePanel: {
            inline: false
        }
    }
}

const VideoJs = ({ options }: Props) => {
    const videoRef = React.useRef<HTMLVideoElement | null>();
    const playerRef = React.useRef<videojs.Player | null>();

    React.useEffect(() => {
        playerRef.current = videojs(videoRef.current, {
            ...initialOptions,
            ...options
        })

        return () => {
            if(playerRef.current) {
                playerRef.current.dispose();
            }
        }
    }, [options])

    return (
        <video ref={videoRef} className="video-js" />
    )
}

export default VideoJs;