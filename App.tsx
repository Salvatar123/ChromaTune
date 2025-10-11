import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import { AppState, ColorKey } from './types';
import { SPOTIFY_PLAYLISTS, COLOR_DISPLAY_INFO } from './constants';
import Loader from './components/Loader';
import VideoDisplay from './components/VideoDisplay';
import Controls from './components/Controls';
import StatusCard from './components/StatusCard';
import SpotifyPlayer from './components/SpotifyPlayer';

// Helper function to convert RGB to HSV
const rgbToHsv = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max !== min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s, v];
};

const getDominantColor = (data: Uint8ClampedArray): ColorKey => {
    const colorCounts: { [key in ColorKey]?: number } = { Red: 0, Green: 0, Blue: 0, Yellow: 0, Purple: 0, Black: 0, White: 0, Gray: 0 };
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];

        const [h, s, v] = rgbToHsv(r, g, b);

        if (v < 0.2) {
            colorCounts.Black!++;
        } else if (s < 0.15 && v > 0.9) {
            colorCounts.White!++;
        } else if (s < 0.1) {
            colorCounts.Gray!++;
        } else {
            if ((h >= 0 && h < 25) || (h >= 345 && h <= 360)) {
                colorCounts.Red!++;
            } else if (h >= 25 && h < 65) {
                colorCounts.Yellow!++;
            } else if (h >= 65 && h < 185) {
                colorCounts.Green!++;
            } else if (h >= 185 && h < 260) {
                colorCounts.Blue!++;
            } else if (h >= 260 && h < 345) {
                colorCounts.Purple!++;
            }
        }
    }

    let maxCount = 0;
    let dominantColor: ColorKey = 'Default';
    // Start with a small threshold to avoid returning a color from just a few stray pixels.
    const threshold = 100; 
    
    for (const color in colorCounts) {
        const key = color as ColorKey;
        const count = colorCounts[key]!;
        if (count > maxCount && count > threshold) {
            maxCount = count;
            dominantColor = key;
        }
    }
    
    return dominantColor;
};


const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.LOADING_APP);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [detectedColor, setDetectedColor] = useState<ColorKey>('Default');
    const [scanBoxStyle, setScanBoxStyle] = useState<CSSProperties>({});
    const [error, setError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAppState(AppState.IDLE);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleStartCamera = useCallback(() => {
        setError(null);
        setAppState(AppState.CAMERA_LOADING);
    }, []);
    
    useEffect(() => {
        if (appState === AppState.CAMERA_LOADING) {
            const startCamera = async () => {
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setStream(mediaStream);
                    
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                        videoRef.current.onloadedmetadata = () => {
                            if (videoRef.current && canvasRef.current) {
                                canvasRef.current.width = videoRef.current.videoWidth;
                                canvasRef.current.height = videoRef.current.videoHeight;
                                
                                const boxWidth = videoRef.current.videoWidth * 0.3;
                                const boxHeight = videoRef.current.videoHeight * 0.5;
                                setScanBoxStyle({
                                    width: `${boxWidth}px`,
                                    height: `${boxHeight}px`,
                                    left: `${(videoRef.current.videoWidth - boxWidth) / 2}px`,
                                    top: `${(videoRef.current.videoHeight - boxHeight) / 2}px`,
                                    borderColor: 'rgba(255, 255, 255, 0.7)',
                                });
                                setAppState(AppState.CAMERA_STARTED);
                            }
                        };
                    }
                } catch (err) {
                    console.error("Error accessing webcam:", err);
                    setError("Could not access the webcam. Please ensure you have given permission and try again.");
                    setAppState(AppState.IDLE);
                }
            };
            
            startCamera();
        }
    }, [appState]);

    const handleDetectVibe = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;

        setAppState(AppState.ANALYZING);

        setTimeout(() => {
            const context = canvasRef.current!.getContext('2d');
            if (!context) return;
            
            context.drawImage(videoRef.current!, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            
            const boxWidth = canvasRef.current!.width * 0.3;
            const boxHeight = canvasRef.current!.height * 0.5;
            const startX = (canvasRef.current!.width - boxWidth) / 2;
            const startY = (canvasRef.current!.height - boxHeight) / 2;
    
            const imageData = context.getImageData(startX, startY, boxWidth, boxHeight).data;
            const color = getDominantColor(imageData);
            
            setDetectedColor(color);
            setScanBoxStyle(prev => ({
                ...prev,
                borderColor: COLOR_DISPLAY_INFO[color].color,
            }));
            setAppState(AppState.RESULT_SHOWN);
        }, 1500); // Simulate analysis time
    }, []);

    const handleReset = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setStream(null);
        setDetectedColor('Default');
        setScanBoxStyle({});
        setError(null);
        setAppState(AppState.IDLE);
    }, [stream]);

    if (appState === AppState.LOADING_APP) {
        return <Loader message="Warming up the decks..." isLarge={true} />;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
            <div className="w-full max-w-3xl text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">ChromaTune</h1>
                <p className="mt-2 text-lg text-gray-400">Your AI Clothing Color DJ</p>
                {appState === AppState.IDLE && <p className="mt-4 text-gray-500">Turn on your camera, show your outfit, then click "Detect Vibe".</p>}
            </div>

            {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>}

            <VideoDisplay 
                videoRef={videoRef} 
                canvasRef={canvasRef} 
                scanBoxStyle={scanBoxStyle} 
                isVisible={appState >= AppState.CAMERA_LOADING}
            />

            <Controls 
                appState={appState}
                onStart={handleStartCamera}
                onDetect={handleDetectVibe}
                onReset={handleReset}
            />
            
            <StatusCard
                appState={appState}
                detectedColor={detectedColor}
            />
            
            <SpotifyPlayer
                playlistId={SPOTIFY_PLAYLISTS[detectedColor]}
                isVisible={appState === AppState.RESULT_SHOWN}
            />
        </main>
    );
};

export default App;