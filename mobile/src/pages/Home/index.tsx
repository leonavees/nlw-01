import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PickerSelect from 'react-native-picker-select';
import axios from 'axios';

import logo from '~/assets/logo.png';

import {
    Container,
    Main,
    ImageLogo,
    Title,
    Description,
    Footer,
    UFSelectStyle,
    CitySelectStyle,
    ButtonEnter,
    ButtonIcon,
    ButtonText,
} from './styles';

interface IBGE_UF_Response {
    sigla: string;
}

interface IBGE_City_Response {
    nome: string;
}

const Home: React.FC = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState<string>('0');
    const [selectedCity, setSelectedCity] = useState<string>('0');

    const navigation = useNavigation();

    useEffect(() => {
        async function loadUfs() {
            try {
                const response = await axios.get<IBGE_UF_Response[]>(
                    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
                );

                setUfs(response.data.map(uf => uf.sigla));
            } catch (err) {
                Alert.alert('Erro ao carregar os estados');
            }
        }

        loadUfs();
    }, []);

    useEffect(() => {
        setSelectedCity('0');

        if (selectedUf === '0') {
            setCities([]);
            return;
        }

        async function loadCities() {
            try {
                const response = await axios.get<IBGE_City_Response[]>(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
                );

                setCities(response.data.map(city => city.nome));
            } catch (err) {
                Alert.alert('Erro ao carregar as cidades');
            }
        }

        loadCities();
    }, [selectedUf]);

    function handleNavigateToPoints() {
        if (selectedUf === '0' || selectedCity === '0') {
            Alert.alert(
                'Selecione um estado e uma cidade para exibir os pontos de coleta'
            );
        } else {
            navigation.navigate('Points', {
                uf: selectedUf,
                city: selectedCity,
            });
        }
    }

    return (
        <Container>
            <Main>
                <ImageLogo source={logo} />
                <Title>Seu marketplace de coleta de resíduos</Title>
                <Description>
                    Ajudamos pessoas a encontrarem pontos de coleta de forma
                    eficiente
                </Description>
            </Main>
            <Footer>
                <PickerSelect
                    items={ufs.map(uf => ({
                        label: uf,
                        value: uf,
                    }))}
                    onValueChange={value => setSelectedUf(value)}
                    value={selectedUf}
                    placeholder={{
                        label: 'Selecione um estado',
                        value: '0',
                    }}
                    style={UFSelectStyle}
                    useNativeAndroidPickerStyle={false}
                />

                <PickerSelect
                    items={cities.map(city => ({
                        label: city,
                        value: city,
                    }))}
                    onValueChange={value => setSelectedCity(value)}
                    value={selectedCity}
                    placeholder={{
                        label: 'Selecione uma cidade',
                        value: '0',
                    }}
                    style={CitySelectStyle}
                    useNativeAndroidPickerStyle={false}
                />

                <ButtonEnter onPress={handleNavigateToPoints}>
                    <ButtonIcon>
                        <Icon name="arrow-right" color="#fff" size={24} />
                    </ButtonIcon>

                    <ButtonText>Entrar</ButtonText>
                </ButtonEnter>
            </Footer>
        </Container>
    );
};

export default Home;
