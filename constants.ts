import { ColorKey } from './types';

export const SPOTIFY_PLAYLISTS: Record<ColorKey, string> = {
    // Reds
    'Red':     '37i9dQZF1DWXRqgorJj26U', // Rock Classics
    'Pink':    '37i9dQZF1DX0MLFwJxDQ4T', // Pop Rising
    'Maroon':  '37i9dQZF1DX2Nc3B70hk4J', // Alternative Metal
    'Orange':  '37i9dQZF1DX7SKIjF5iUJ1', // Summer Party
    'Coral':   '37i9dQZF1DX4WYpdgoIcn6', // Beach Vibes
    
    // Greens
    'Green':   '37i9dQZF1DXaUDcU6KDCj4', // Chill Folk
    'Lime':    '37i9dQZF1DX1MUPbVKMgJE', // Dance Party
    'Olive':   '37i9dQZF1DWXmlLSKkfdAk', // Jazz Classics
    'Teal':    '37i9dQZF1DX4dyzvuaRJ0n', // Peaceful Piano
    'Mint':    '37i9dQZF1DX9uKNf5jGX6m', // Fresh Finds
    
    // Blues
    'Blue':    '37i9dQZF1DX4sWSpwq3LiO', // All-Out 80s
    'Navy':    '37i9dQZF1DXbITWG1ZJKYt', // Jazz Blues
    'SkyBlue': '37i9dQZF1DX6R7QUWePReF', // Dreamwave
    'Turquoise':'37i9dQZF1DX6VdMW310YC7', // Chill Electronic
    
    // Yellows
    'Yellow':  '37i9dQZF1DX0XUfTFmNBRM', // Bollywood Party
    'Gold':    '37i9dQZF1DWUa8ZRTfalHk', // Classic Road Trip
    'Cream':   '37i9dQZF1DX889U0CL85jj', // Coffee House
    
    // Purples
    'Purple':  '37i9dQZF1DXdLEN7aqioXM', // Synthwave From Space
    'Violet':  '37i9dQZF1DX0BcQWzuB7ZO', // Dream Pop
    'Lavender':'37i9dQZF1DWZd79rJ6a7lp', // Sleep
    'Magenta': '37i9dQZF1DX7ZUug1ANKRP', // Main Stage EDM
    
    // Browns
    'Brown':   '37i9dQZF1DWWQRwui0ExPn', // Lo-Fi
    'Beige':   '37i9dQZF1DWYoYGBbGKurt', // Acoustic Covers
    'Tan':     '37i9dQZF1DX4pbGJDhTXK3', // Country Hits
    
    // Neutral
    'Black':   '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar (Hip-Hop)
    'White':   '37i9dQZF1DWVFeEut75IAL', // Calming Classical
    'Gray':    '37i9dQZF1DX4WYpdgoIcn6', // Chill Hits
    'Silver':  '37i9dQZF1DX6ziVCJnEm59', // Minimal Tech
    
    'Default': '37i9dQZF1DX5q67Zp9r5zS'  // Lofi Beats
};

export const COLOR_DISPLAY_INFO: Record<ColorKey, { mood: string; color: string; textColor?: string }> = {
    // Reds
    'Red':     { mood: 'Energetic', color: '#ef4444' },
    'Pink':    { mood: 'Trendy', color: '#ec4899' },
    'Maroon':  { mood: 'Intense', color: '#7f1d1d' },
    'Orange':  { mood: 'Vibrant', color: '#f97316', textColor: '#1f2937' },
    'Coral':   { mood: 'Beach', color: '#ff6b6b', textColor: '#1f2937' },
    
    // Greens
    'Green':   { mood: 'Earthy', color: '#22c55e' },
    'Lime':    { mood: 'Fresh', color: '#84cc16', textColor: '#1f2937' },
    'Olive':   { mood: 'Classic', color: '#3d9970' },
    'Teal':    { mood: 'Peaceful', color: '#14b8a6' },
    'Mint':    { mood: 'Modern', color: '#10b981', textColor: '#1f2937' },
    
    // Blues
    'Blue':    { mood: 'Upbeat', color: '#3b82f6' },
    'Navy':    { mood: 'Smooth', color: '#1e3a8a' },
    'SkyBlue': { mood: 'Dreamy', color: '#0ea5e9', textColor: '#1f2937' },
    'Turquoise':{ mood: 'Electronic', color: '#06b6d4', textColor: '#1f2937' },
    
    // Yellows
    'Yellow':  { mood: 'Happy', color: '#eab308', textColor: '#1f2937' },
    'Gold':    { mood: 'Classic', color: '#f59e0b', textColor: '#1f2937' },
    'Cream':   { mood: 'Cozy', color: '#fef3c7', textColor: '#1f2937' },
    
    // Purples
    'Purple':  { mood: 'Futuristic', color: '#8b5cf6' },
    'Violet':  { mood: 'Ethereal', color: '#7c3aed' },
    'Lavender':{ mood: 'Relaxing', color: '#e0e7ff', textColor: '#1f2937' },
    'Magenta': { mood: 'Electric', color: '#db2777' },
    
    // Browns
    'Brown':   { mood: 'Rustic', color: '#78350f' },
    'Beige':   { mood: 'Acoustic', color: '#fdf4ff', textColor: '#1f2937' },
    'Tan':     { mood: 'Country', color: '#d4a373', textColor: '#1f2937' },
    
    // Neutral
    'Black':   { mood: 'Intense', color: '#1f2937' },
    'White':   { mood: 'Minimalist', color: '#f9fafb', textColor: '#1f2937' },
    'Gray':    { mood: 'Neutral', color: '#6b7280' },
    'Silver':  { mood: 'Modern', color: '#e5e7eb', textColor: '#1f2937' },
    
    'Default': { mood: 'Chill', color: '#4b5563' }
};