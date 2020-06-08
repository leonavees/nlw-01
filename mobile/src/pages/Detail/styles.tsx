import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet } from 'react-native';

export const PageDetail = styled.SafeAreaView`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    padding: ${20 + getStatusBarHeight()}px 32px 32px;
`;

export const BackButton = styled.TouchableOpacity``;

export const PointImage = styled.Image.attrs({
    resizeMode: 'cover',
})`
    width: 100%;
    height: 100%;
    max-height: 200px;
    border-radius: 10px;
    margin-top: 32px;
`;

export const PointName = styled.Text`
    color: #322153;
    font-size: 28px;
    font-family: 'Ubuntu-Bold';
    margin-top: 24px;
`;

export const PointItems = styled.Text`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 24px;
    margin-top: 8px;
    color: #6c6c80;
`;

export const AddressContainer = styled.View`
    margin-top: 32px;
`;

export const AddressTitle = styled.Text`
    color: #322153;
    font-family: 'Roboto-Medium';
    font-size: 16px;
`;

export const AddressContent = styled.Text`
    font-family: 'Roboto-Regular';
    line-height: 24px;
    margin-top: 8px;
    color: #6c6c80;
`;

export const Footer = styled.View`
    border-top-width: ${StyleSheet.hairlineWidth}px;
    border-color: #999;
    padding: 20px 32px;
    flex-direction: row;
    justify-content: space-between;
`;

export const WhatsappButton = styled.TouchableOpacity`
    width: 48%;
    background-color: #34cb79;
    border-radius: 10px;
    height: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const MailButton = styled.TouchableOpacity`
    width: 48%;
    background-color: #34cb79;
    border-radius: 10px;
    height: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const WhatsappText = styled.Text`
    margin-left: 8px;
    color: #fff;
    font-size: 16px;
    font-family: 'Roboto-Medium';
`;

export const MailText = styled.Text`
    margin-left: 8px;
    color: #fff;
    font-size: 16px;
    font-family: 'Roboto-Medium';
`;
