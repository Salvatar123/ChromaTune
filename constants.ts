import { ColorKey } from './types';

export const SPOTIFY_PLAYLISTS: Record<ColorKey, string> = {
    // Reds
    'Red':     '37i9dQZF1DX3oM42VWuXV0', // Rock This: Energetic Rock Hits
    'Pink':    '37i9dQZF1DX4JAvHpjipBk', // New Music Friday
    'Maroon':  '37i9dQZF1DWTcqUzwhNmKv', // Metal Essentials
    'Orange':  '37i9dQZF1DXdPec7aLTmlC', // Happy Hits
    'Coral':   '37i9dQZF1DX0MLFwJ8Ys4j', // Summer Hits
    
    // Greens
    'Green':   '37i9dQZF1DWW1YcGwGQpR4', // Acoustic Nature
    'Lime':    '37i9dQZF1DX1usGHVf7XiS', // Energetic EDM
    'Olive':   '37i9dQZF1DX5IDTimEWoTd', // Indie Folk
    'Teal':    '37i9dQZF1DX5trt9i14X7j', // Coding Mode
    'Mint':    '37i9dQZF1DX4dyzvuaRJ0n', // Mint Condition
    
    // Blues
    'Blue':    '37i9dQZF1DX4o1oenSJRJd', // All Out 2000s
    'Navy':    '37i9dQZF1DWV7EzJMK2FUI', // Coffee Table Jazz
    'SkyBlue': '37i9dQZF1DX1s9knjP51Oa', // Calm Vibes
    'Turquoise': '37i9dQZF1DX6VdMW310YC7', // Beach Vibes
    
    // Yellows
    'Yellow':  '37i9dQZF1DX0XUfTFmNBRM', // Bollywood Butter
    'Gold':    '37i9dQZF1DX6QMBzUjo52E', // Golden Age Classics
    'Cream':   '37i9dQZF1DWV7EzJMK2FUI', // Coffee Table Jazz
    
    // Purples
    'Purple':  '37i9dQZF1DX6GJXiuZRisr', // Dance Room
    'Violet':  '37i9dQZF1DX0jgyAiPl8Af', // All Out 90s
    'Lavender': '37i9dQZF1DWZd79rJ6a7lp', // Sleep
    'Magenta': '37i9dQZF1DX64Y3du11rR1', // Power Pop
    
    // Browns
    'Brown':   '37i9dQZF1DWWQRwui0ExPn', // Lofi Beats
    'Beige':   '37i9dQZF1DWWQRwui0ExPn', // Peaceful Piano
    'Tan':     '37i9dQZF1DX4sWSpwq3LiO', // Acoustic Covers
    
    // Neutral
    'Black':   '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
    'White':   '37i9dQZF1DWWQRwui0ExPn', // Peaceful Piano
    'Gray':    '37i9dQZF1DWTwnEm1IYyoj', // Soft Pop Hits
    'Silver':  '37i9dQZF1DX6J5NfMJS675'  // 80s Hits
};

export const COLOR_DISPLAY_INFO: Record<ColorKey, { mood: string; color: string; textColor?: string }> = {
    // Reds
    'Red':     { mood: 'Rock', color: '#dc2626', textColor: '#ffffff' },
    'Pink':    { mood: 'Pop', color: '#ec4899', textColor: '#ffffff' },
    'Maroon':  { mood: 'Metal', color: '#7f1d1d', textColor: '#ffffff' },
    'Orange':  { mood: 'Happy', color: '#f97316', textColor: '#1f2937' },
    'Coral':   { mood: 'Summer', color: '#ff6b6b', textColor: '#1f2937' },
    
    // Greens
    'Green':   { mood: 'Nature', color: '#22c55e', textColor: '#1f2937' },
    'Lime':    { mood: 'EDM', color: '#84cc16', textColor: '#1f2937' },
    'Olive':   { mood: 'Folk', color: '#3d9970', textColor: '#ffffff' },
    'Teal':    { mood: 'Focus', color: '#14b8a6', textColor: '#1f2937' },
    'Mint':    { mood: 'Fresh', color: '#10b981', textColor: '#1f2937' },
    
    // Blues
    'Blue':    { mood: 'Retro', color: '#3b82f6', textColor: '#ffffff' },
    'Navy':    { mood: 'Jazz', color: '#1e3a8a', textColor: '#ffffff' },
    'SkyBlue': { mood: 'Calm', color: '#0ea5e9', textColor: '#1f2937' },
    'Turquoise': { mood: 'Beach', color: '#06b6d4', textColor: '#1f2937' },
    
    // Yellows
    'Yellow':  { mood: 'Bollywood', color: '#eab308', textColor: '#1f2937' },
    'Gold':    { mood: 'Classic', color: '#f59e0b', textColor: '#1f2937' },
    'Cream':   { mood: 'Coffee', color: '#fef3c7', textColor: '#1f2937' },
    
    // Purples
    'Purple':  { mood: 'Dance', color: '#8b5cf6', textColor: '#ffffff' },
    'Violet':  { mood: '90s', color: '#7c3aed', textColor: '#ffffff' },
    'Lavender': { mood: 'Sleep', color: '#e0e7ff', textColor: '#1f2937' },
    'Magenta': { mood: 'Power', color: '#db2777', textColor: '#ffffff' },
    
    // Browns
    'Brown':   { mood: 'Lofi', color: '#78350f', textColor: '#ffffff' },
    'Beige':   { mood: 'Peaceful', color: '#f5f5dc', textColor: '#1f2937' },
    'Tan':     { mood: 'Acoustic', color: '#d4a373', textColor: '#1f2937' },
    
    // Neutral
    'Black':   { mood: 'Rap', color: '#1f2937', textColor: '#ffffff' },
    'White':   { mood: 'Classical', color: '#f9fafb', textColor: '#1f2937' },
    'Gray':    { mood: 'Soft', color: '#6b7280', textColor: '#ffffff' },
    'Silver':  { mood: '80s', color: '#cbd5e1', textColor: '#1f2937' }
};