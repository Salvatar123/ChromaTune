
import React from 'react';
import { AppState, ColorKey } from '../types';
import { COLOR_DISPLAY_INFO } from '../constants';

interface StatusCardProps {
    appState: AppState;
    detectedColor: ColorKey;
}

const StatusCard: React.FC<StatusCardProps> = ({ appState, detectedColor }) => {
    const isVisible = appState === AppState.ANALYZING || appState === AppState.RESULT_SHOWN;
    const displayInfo = COLOR_DISPLAY_INFO[detectedColor] || COLOR_DISPLAY_INFO['Default'];
    
    return (
        <div className={`p-6 rounded-xl bg-white/10 backdrop-blur-md -webkit-backdrop-filter-blur-md text-center w-full max-w-md transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {appState === AppState.ANALYZING && (
                <div className="flex justify-center items-center gap-3">
                    <div className="music-loader">
                        <div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div>
                    </div>
                    <span className="text-gray-400">Finding the perfect vibe...</span>
                </div>
            )}
            
            {appState === AppState.RESULT_SHOWN && (
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Detected Vibe</h3>
                    <div className="mt-3 text-2xl font-bold">
                        <span 
                            className="px-3 py-1 rounded-md transition-colors duration-300"
                            style={{ 
                                backgroundColor: displayInfo.color, 
                                color: displayInfo.textColor || '#fff' 
                            }}
                        >
                            {detectedColor}
                        </span>
                    </div>
                    <div className="mt-2 text-lg text-gray-300">
                        Playing a <span className="font-semibold">{displayInfo.mood}</span> playlist.
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusCard;
