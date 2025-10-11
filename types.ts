export enum AppState {
  LOADING_APP,
  IDLE,
  CAMERA_LOADING,
  CAMERA_STARTED,
  ANALYZING,
  RESULT_SHOWN,
}

export type ColorKey = 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Purple' | 'Black' | 'White' | 'Gray' | 'Default';