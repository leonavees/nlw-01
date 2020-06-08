import React, { useState, useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Location from 'react-native-geolocation-service';

import api from '~/services/api';

import {
    Container,
    BackButton,
    Title,
    Description,
    MapContainer,
    Map,
    MapMarker,
    MapMarkerContainer,
    MapMarkerImage,
    MapMarkerTitle,
    ItemContainer,
    ItemScroll,
    Item,
    ItemImage,
    ItemTitle,
} from './styles';

interface InitialPosition {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface RouteParams {
    uf: string;
    city: string;
}

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Point {
    id: number;
    name: string;
    image: string;
    latitude: number;
    longitude: number;
}

const latitudeDelta = 0.014;
const longitudeDelta = 0.014;

const Points: React.FC = () => {
    const [initialPosition, setInitialPosition] = useState<InitialPosition>({
        latitude: -21.2458075,
        longitude: -44.9948543,
        latitudeDelta,
        longitudeDelta,
    });

    const [points, setPoints] = useState<Point[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as RouteParams;

    // useEffect(() => {
    //     async function loadPosition() {
    //         const status = await PermissionsAndroid.requestMultiple([
    //             'android.permission.ACCESS_COARSE_LOCATION',
    //             'android.permission.ACCESS_FINE_LOCATION',
    //         ]);

    //         if (
    //             status['android.permission.ACCESS_COARSE_LOCATION'] !==
    //                 'granted' ||
    //             status['android.permission.ACCESS_FINE_LOCATION'] !== 'granted'
    //         ) {
    //             Alert.alert(
    //                 'Precisamos de sua permissão para obter a localização'
    //             );
    //             return;
    //         }

    //         Location.getCurrentPosition(
    //             position => {
    //                 const { latitude, longitude } = position.coords;

    //                 setInitialPosition({
    //                     latitude,
    //                     longitude,
    //                     latitudeDelta,
    //                     longitudeDelta,
    //                 });
    //             },
    //             () => {
    //                 Alert.alert(
    //                     'Erro inesperado ao tentar obter sua localização'
    //                 );
    //             },
    //             { timeout: 30000 }
    //         );
    //     }

    //     loadPosition();
    // }, []);

    useEffect(() => {
        async function loadItems() {
            try {
                const response = await api.get('items');
                setItems(response.data);
            } catch (err) {
                Alert.alert('Erro ao carregar items');
            }
        }

        loadItems();
    }, []);

    useEffect(() => {
        async function loadPoints() {
            try {
                const response = await api.get('points', {
                    params: {
                        city: routeParams.city,
                        uf: routeParams.uf,
                        items: selectedItems.join(','),
                    },
                });

                setPoints(response.data);
            } catch (err) {
                Alert.alert('Erro ao carregar pontos de coleta');
            }
        }

        loadPoints();
    }, [selectedItems]);

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    return (
        <>
            <Container>
                <BackButton onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </BackButton>

                <Title>Bem vindo</Title>
                <Description>
                    Encontre no mapa um um ponto de coleta.
                </Description>

                <MapContainer>
                    {initialPosition.latitude !== 0 && (
                        <Map initialRegion={initialPosition}>
                            {points.map(point => (
                                <MapMarker
                                    key={String(point.id)}
                                    onPress={() =>
                                        navigation.navigate('Detail', {
                                            point_id: point.id,
                                        })
                                    }
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude,
                                    }}
                                >
                                    <MapMarkerContainer>
                                        <MapMarkerImage
                                            resizeMode="cover"
                                            source={{
                                                uri: point.image,
                                            }}
                                        />
                                        <MapMarkerTitle>
                                            {point.name}
                                        </MapMarkerTitle>
                                    </MapMarkerContainer>
                                </MapMarker>
                            ))}
                        </Map>
                    )}
                </MapContainer>
            </Container>
            <ItemContainer>
                <ItemScroll>
                    {items.map(item => (
                        <Item
                            key={String(item.id)}
                            onPress={() => handleSelectItem(item.id)}
                            selected={selectedItems.includes(item.id)}
                        >
                            <ItemImage
                                width={42}
                                height={42}
                                uri={item.image_url.replace(
                                    'localhost',
                                    '10.0.2.2'
                                )}
                            />
                            <ItemTitle>{item.title}</ItemTitle>
                        </Item>
                    ))}
                </ItemScroll>
            </ItemContainer>
        </>
    );
};
export default Points;
