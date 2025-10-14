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

// ML-based color classifier using k-NN (for demo, hardcoded centroids)
const COLOR_CENTROIDS: Record<ColorKey, [number, number, number]> = {
    // Reds
    Red: [220, 40, 40],
    Pink: [236, 72, 153],
    Maroon: [127, 29, 29],
    Orange: [249, 115, 22],
    Coral: [255, 107, 107],
    
    // Greens
    Green: [34, 197, 94],
    Lime: [132, 204, 22],
    Olive: [61, 153, 112],
    Teal: [20, 184, 166],
    Mint: [16, 185, 129],
    
    // Blues
    Blue: [59, 130, 246],
    Navy: [30, 58, 138],
    SkyBlue: [14, 165, 233],
    Turquoise: [6, 182, 212],
    
    // Yellows
    Yellow: [234, 179, 8],
    Gold: [245, 158, 11],
    Cream: [254, 243, 199],
    
    // Purples
    Purple: [139, 92, 246],
    Violet: [124, 58, 237],
    Lavender: [224, 231, 255],
    Magenta: [219, 39, 119],
    
    // Browns
    Brown: [120, 53, 15],
    Beige: [253, 244, 255],
    Tan: [212, 163, 115],
    
    // Neutral
    Black: [31, 41, 55],
    White: [249, 250, 251],
    Gray: [107, 114, 128],
    Silver: [229, 231, 235],
    
    Default: [75, 85, 99],
};

function euclideanDistance(a: [number, number, number], b: [number, number, number]) {
    return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
}

const getDominantColors = (data: Uint8ClampedArray): { color: ColorKey; votes: number }[] => {
    // Helper function to check if a pixel is likely noise
    const isNoise = (rgb: [number, number, number], hsv: [number, number, number]): boolean => {
        // Check if pixel is too dark or too light
        if (hsv[2] < 0.15 || hsv[2] > 0.95) return true;
        
        // Check if pixel has too low saturation (greyish)
        if (hsv[1] < 0.20) return true;
        
        // Check if RGB values are too similar (indicating greyish colors)
        const [r, g, b] = rgb;
        const avg = (r + g + b) / 3;
        const variation = Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
        if (variation < 30) return true; // Low color variation threshold
        
        return false;
    };

    // Sample 500 pixels randomly for better accuracy
    const samples: [number, number, number][] = [];
    for (let i = 0; i < 500 && i*4 < data.length; i++) {
        const idx = Math.floor(Math.random() * (data.length / 4)) * 4;
        const rgb: [number, number, number] = [data[idx], data[idx+1], data[idx+2]];
        const hsv = rgbToHsv(rgb[0], rgb[1], rgb[2]);
        // Only add non-noise pixels
        if (!isNoise(rgb, hsv)) {
            samples.push(rgb);
        }
    }
    // Predict color for each sample and count votes
    const votes: Record<ColorKey, number> = {
        // Reds
        Red: 0, Pink: 0, Maroon: 0, Orange: 0, Coral: 0,
        // Greens
        Green: 0, Lime: 0, Olive: 0, Teal: 0, Mint: 0,
        // Blues
        Blue: 0, Navy: 0, SkyBlue: 0, Turquoise: 0,
        // Yellows
        Yellow: 0, Gold: 0, Cream: 0,
        // Purples
        Purple: 0, Violet: 0, Lavender: 0, Magenta: 0,
        // Browns
        Brown: 0, Beige: 0, Tan: 0,
        // Neutral
        Black: 0, White: 0, Gray: 0, Silver: 0,
        // Default
        Default: 0
    };
    for (const rgb of samples) {
        let minDist = Infinity;
        let bestColor: ColorKey = 'Default';
        for (const key in COLOR_CENTROIDS) {
            const dist = euclideanDistance(rgb, COLOR_CENTROIDS[key as ColorKey]);
            if (dist < minDist) {
                minDist = dist;
                bestColor = key as ColorKey;
            }
        }
        votes[bestColor]!++;
    }
    // Get top 3 colors with their vote counts
    const sortedColors = Object.entries(votes)
        .map(([color, count]) => ({ color: color as ColorKey, votes: count }))
        .filter(({color, votes}) => votes > 0 && color !== 'Default')
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 3);

    // If no colors detected, return array with default
    return sortedColors.length > 0 ? sortedColors : [{ color: 'Default', votes: 1 }];
};


const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.LOADING_APP);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [detectedColors, setDetectedColors] = useState<{ color: ColorKey; votes: number }[]>([]);
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

    // Continuous color detection interval
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (appState === AppState.CAMERA_STARTED || appState === AppState.RESULT_SHOWN) {
            intervalId = setInterval(() => {
                if (!videoRef.current || !canvasRef.current) return;
                const context = canvasRef.current.getContext('2d');
                if (!context) return;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const boxWidth = canvasRef.current.width * 0.3;
                const boxHeight = canvasRef.current.height * 0.5;
                const startX = (canvasRef.current.width - boxWidth) / 2;
                const startY = (canvasRef.current.height - boxHeight) / 2;
                const imageData = context.getImageData(startX, startY, boxWidth, boxHeight).data;
                const colors = getDominantColors(imageData);
                setDetectedColors(colors);
                if (colors.length > 0) {
                    setScanBoxStyle(prev => ({
                        ...prev,
                        borderColor: COLOR_DISPLAY_INFO[colors[0].color].color,
                    }));
                    if (appState !== AppState.RESULT_SHOWN) {
                        setAppState(AppState.RESULT_SHOWN);
                    }
                }
            }, 5000); // Detect every 2 seconds
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [appState, videoRef, canvasRef]);

    const handleReset = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setStream(null);
        setDetectedColors([{ color: 'Default', votes: 1 }]);
        setScanBoxStyle({});
        setError(null);
        setAppState(AppState.IDLE);
    }, [stream]);

    if (appState === AppState.LOADING_APP) {
        return <Loader message="Warming up the decks..." isLarge={true} />;
    }

    return (
        <main className="min-h-screen p-4 font-sans bg-gray-950">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">ChromaTune</h1>
                    <p className="mt-2 text-lg text-gray-400">Your AI Clothing Color DJ</p>
                    {appState === AppState.IDLE && <p className="mt-4 text-gray-500">Turn on your camera, show your outfit, then click "Detect Vibe".</p>}
                </div>
                {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left: Camera & Controls */}
                    <div className="flex flex-col items-center">
                        <VideoDisplay 
                            videoRef={videoRef} 
                            canvasRef={canvasRef} 
                            scanBoxStyle={scanBoxStyle} 
                            isVisible={appState >= AppState.CAMERA_LOADING}
                        />
                        <div className="mt-6 w-full flex justify-center">
                            <Controls 
                                appState={appState}
                                onStart={handleStartCamera}
                                onDetect={undefined} // Disable manual detection
                                onReset={handleReset}
                            />
                        </div>
                    </div>
                    {/* Right: Output */}
                    <div className="flex flex-col items-center w-full">
                        <StatusCard
                            appState={appState}
                            detectedColors={detectedColors}
                        />
                        <div className="mt-6 w-full flex justify-center">
                            <SpotifyPlayer
                                playlistId={SPOTIFY_PLAYLISTS[detectedColors[0]?.color || 'Default']}
                                isVisible={appState === AppState.RESULT_SHOWN}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default App;