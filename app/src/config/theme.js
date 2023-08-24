import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS ={
    white: "#fff",
    black: "#1c1c1c",
    gray : "#bcbcbc",
    main: "#009387"
}

export const SIZES = {
    default: 8,
    radius: 8,
    padding: 12,
    margin: 10,
    spacing: 20,
    height: height,
    width: width
}