import { useEffect, useRef } from "react";

const VideoPlayer = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            id="video"
            style={{ width: '100%', maxWidth: '400px', maxHeight: '400px' }}
        />
    );
};

export default VideoPlayer;