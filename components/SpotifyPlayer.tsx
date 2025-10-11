import React from 'react';

interface SpotifyPlayerProps {
    playlistId: string;
    isVisible: boolean;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ playlistId, isVisible }) => {
    const playerHeight = '352'; // Using the taller Spotify player for a better experience
    // The container height reserves space for the player and the helper text below it
    const containerHeight = `${parseInt(playerHeight, 10) + 32}px`;

    // The standard embed URL will always start the playlist from the first track.
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0&autoplay=1`;

    return (
        // This outer container prevents layout shifts by reserving the correct amount of space
        <div className="mt-6 w-full max-w-2xl" style={{ height: containerHeight }}>
            {/* This inner container handles the fade-in/out transition */}
            <div className={`w-full h-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* We only render the iframe when it's visible to enable autoplay and reduce resource usage */}
                {isVisible && (
                    <>
                        <iframe
                            key={playlistId} // This is crucial. It tells React to create a new iframe when the playlistId changes.
                            style={{ borderRadius: '12px' }}
                            src={embedUrl}
                            width="100%"
                            height={playerHeight}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title="Spotify Playlist Player"
                        ></iframe>
                         <p className="mt-2 text-center text-sm text-gray-500">If music doesn't start, please press play on the player above.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SpotifyPlayer;