import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { PickerStyle } from 'react-native-picker-select';

import homeBackground from '~/assets/home-background.png';

export const Container = styled.ImageBackground.attrs({
    source: homeBackground,
    imageStyle: { width: 274, height: 368 },
})`
    flex: 1;
    padding: 32px;
`;

export const Main = styled.View`
    flex: 1;
    justify-content: center;
`;

export const ImageLogo = styled.Image``;

export const Title = styled.Text`
    color: #322153;
    font-size: 32px;
    font-family: 'Ubuntu-Bold';
    max-width: 260px;
    margin-top: 64px;
`;

export const Description = styled.Text`
    color: #6c6c80;
    font-size: 16px;
    margin-top: 16px;
    font-family: 'Roboto-Regular';
    max-width: 260px;
    line-height: 24px;
`;

export const Footer = styled.View``;

export const UFSelectStyle = {
    inputAndroid: {
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
} as PickerStyle;

export const CitySelectStyle = {
    inputAndroid: {
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
} as PickerStyle;

export const ButtonEnter = styled(RectButton)`
    background-color: #34cb79;
    height: 60px;
    border-radius: 10px;
    flex-direction: row;
    overflow: hidden;
    align-items: center;
    margin-top: 8px;
`;

export const ButtonIcon = styled.View`
    height: 60px;
    width: 60px;
    background-color: rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

export const ButtonText = styled.Text`
    flex: 1;
    text-align: center;
    color: #fff;
    margin-right: 30px;
    font-family: 'Roboto-Medium';
    font-size: 16px;
`;
