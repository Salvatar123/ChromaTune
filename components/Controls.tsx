import React from 'react';
import { AppState } from '../types';
import ResetIcon from './icons/ResetIcon';

interface ControlsProps {
    appState: AppState;
    onStart: () => void;
    onDetect: () => void;
    onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ appState, onStart, onDetect, onReset }) => {
    return (
        <div className="h-16 flex flex-wrap justify-center items-center gap-4 mb-6">
            {appState === AppState.IDLE && (
                <button 
                    onClick={onStart}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
                >
                    Start Camera
                </button>
            )}

            {appState === AppState.CAMERA_LOADING && (
                 <button 
                    disabled
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md cursor-not-allowed flex items-center gap-2"
                >
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Starting...
                </button>
            )}

            {/* Detect Vibe button removed for continuous detection */}

            {appState >= AppState.CAMERA_LOADING && (
                 <button 
                    onClick={onReset}
                    className="p-3 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 hover:scale-110 transform transition-all duration-300"
                    aria-label="Reset"
                >
                    <ResetIcon />
                </button>
            )}
        </div>
    );
};

export default Controls;