export enum AppState {
  LOADING_APP,
  IDLE,
  CAMERA_LOADING,
  CAMERA_STARTED,
  ANALYZING,
  RESULT_SHOWN,
}

export type ColorKey = 
    | 'Red' | 'Pink' | 'Maroon' | 'Orange' | 'Coral'
    | 'Green' | 'Lime' | 'Olive' | 'Teal' | 'Mint'
    | 'Blue' | 'Navy' | 'SkyBlue' | 'Turquoise'
    | 'Yellow' | 'Gold' | 'Cream'
    | 'Purple' | 'Violet' | 'Lavender' | 'Magenta'
    | 'Brown' | 'Beige' | 'Tan'
    | 'Black' | 'White' | 'Gray' | 'Silver';