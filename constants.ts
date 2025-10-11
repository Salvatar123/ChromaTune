import { ColorKey } from './types';

export const SPOTIFY_PLAYLISTS: Record<ColorKey, string> = {
    'Red':    '37i9dQZF1DWXRqgorJj26U', // Rock Classics (Updated)
    'Green':  '37i9dQZF1DXaUDcU6KDCj4', // Chill Folk
    'Blue':   '37i9dQZF1DX4sWSpwq3LiO', // All-Out 80s (Pop)
    'Yellow': '37i9dQZF1DX0XUfTFmNBRM', // Bollywood Party
    'Purple': '37i9dQZF1DXdLEN7aqioXM', // Synthwave From Space
    'Black':  '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar (Hip-Hop)
    'White':  '37i9dQZF1DXcBWIGoYBM5M', // Today's Top Hits
    'Gray':   '37i9dQZF1DX4WYpdgoIcn6', // Chill Hits
    'Default':'37i9dQZF1DX5q67Zp9r5zS'  // Lofi Beats as default
};

export const COLOR_DISPLAY_INFO: Record<ColorKey, { mood: string; color: string; textColor?: string }> = {
    'Red':    { mood: 'Energetic', color: '#ef4444' },
    'Green':  { mood: 'Earthy', color: '#22c55e' },
    'Blue':   { mood: 'Upbeat', color: '#3b82f6' },
    'Yellow': { mood: 'Happy', color: '#eab308', textColor: '#1f2937' },
    'Purple': { mood: 'Futuristic', color: '#8b5cf6' },
    'Black':  { mood: 'Intense', color: '#1f2937' },
    'White':  { mood: 'Trending', color: '#f9fafb', textColor: '#1f2937' },
    'Gray':   { mood: 'Neutral', color: '#6b7280' },
    'Default':{ mood: 'Chill', color: '#4b5563' }
};