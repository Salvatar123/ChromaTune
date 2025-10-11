
import React, { CSSProperties, RefObject } from 'react';

interface VideoDisplayProps {
    videoRef: RefObject<HTMLVideoElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
    scanBoxStyle: CSSProperties;
    isVisible: boolean;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoRef, canvasRef, scanBoxStyle, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20 mb-6">
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="transform scale-x-[-1]" 
            ></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div 
                style={scanBoxStyle}
                className="absolute border-4 dashed border-transparent box-sizing transition-all duration-300 ease-in-out"
            ></div>
        </div>
    );
};

export default VideoDisplay;
