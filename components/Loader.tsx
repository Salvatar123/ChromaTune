
import React from 'react';

interface LoaderProps {
    message: string;
    isLarge?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ message, isLarge = false }) => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900 z-50">
            <div className={`music-loader ${isLarge ? 'large' : ''}`}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <p className={`mt-6 text-gray-400 ${isLarge ? 'text-lg' : ''}`}>{message}</p>
        </div>
    );
};

export default Loader;
