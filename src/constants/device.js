import { Dimensions } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const IS_LARGE_SCREEN = WINDOW_WIDTH >= 768;
