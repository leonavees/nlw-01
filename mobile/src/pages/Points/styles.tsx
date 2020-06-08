import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface ItemProps {
    selected: boolean;
}

export const Container = styled.View`
    flex: 1;
    padding: ${20 + getStatusBarHeight()}px 32px 0;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'Ubuntu-Bold';
    margin-top: 24px;
`;

export const Description = styled.Text`
    color: #6c6c80;
    font-size: 16px;
    margin-top: 4px;
    font-family: 'Roboto-Regular';
`;

export const MapContainer = styled.View`
    flex: 1;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 16px;
`;

export const Map = styled(MapView)`
    width: 100%;
    height: 100%;
`;

export const MapMarker = styled(Marker)`
    width: 90px;
    height: 80px;
`;

export const MapMarkerContainer = styled.View`
    width: 90px;
    height: 70px;
    background-color: #34cb79;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
`;

export const MapMarkerImage = styled.Image`
    width: 90px;
    height: 45px;
`;

export const MapMarkerTitle = styled.Text`
    flex: 1;
    font-family: 'Roboto-Regular';
    color: #fff;
    font-size: 13px;
    line-height: 23px;
`;

export const ItemContainer = styled.View`
    flex-direction: row;
    margin-top: 16px;
    margin-bottom: 32px;
`;

export const ItemScroll = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 20 },
})``;

export const Item = styled.TouchableOpacity.attrs({
    activeOpacity: 0.6,
})<ItemProps>`
    background-color: #fff;
    border-width: 2px;
    border-color: ${props => (props.selected ? '#34cb79' : '#eee')};
    height: 120px;
    width: 120px;
    border-radius: 8px;
    padding: 20px 16px 16px;
    margin-right: 8px;
    align-items: center;
    justify-content: space-between;
    text-align: center;
`;

export const ItemImage = styled(SvgUri)``;

export const ItemTitle = styled.Text`
    font-family: 'Roboto-Regular';
    text-align: center;
    font-size: 13px;
`;
