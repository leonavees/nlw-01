import React, { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import FTIcon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import Mail from 'react-native-mail';

import api from '~/services/api';

import {
    PageDetail,
    Container,
    BackButton,
    PointImage,
    PointName,
    PointItems,
    AddressContainer,
    AddressTitle,
    AddressContent,
    Footer,
    WhatsappButton,
    WhatsappText,
    MailButton,
    MailText,
} from './styles';

interface RouteParams {
    point_id: number;
}

interface Point {
    name: string;
    image_url: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
    items: {
        title: string;
    }[];
}

const Detail: React.FC = () => {
    const [point, setPoint] = useState<Point>({
        name: '',
        image_url: '',
        email: '',
        whatsapp: '',
        city: '',
        uf: '',
        items: [],
    });
    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as RouteParams;

    useEffect(() => {
        async function loadPoint() {
            try {
                const response = await api.get(
                    `points/${routeParams.point_id}`
                );

                setPoint(response.data);
            } catch (err) {
                navigation.goBack();
                Alert.alert('Este point não existe');
            }
        }

        loadPoint();
    }, []);

    function handleMail() {
        Mail.mail(
            {
                subject: 'Interesse na coleta de resíduos',
                body: `Olá! Tenho interesse em coletar algum(ns) de seus resíduos. 
                    Gostaria de conversar mais sobre o assunto. Atenciosamente, ${point.email}`,
                recipients: [point.email],
                isHTML: false,
            },
            () => {
                Alert.alert('Erro ao realizar envio de email');
            }
        );
    }

    function handleWhatsapp() {
        Linking.openURL(
            `whatsapp://send?phone=${point.whatsapp}&text=Tenho interesse sobre coleta de resídudos`
        );
    }

    return (
        <PageDetail>
            <Container>
                <BackButton onPress={() => navigation.goBack()}>
                    <FTIcon name="arrow-left" size={20} color="#34cb79" />
                </BackButton>

                <PointImage
                    source={{
                        uri: point.image_url.replace('localhost', '10.0.2.2'),
                    }}
                />

                <PointName>{point.name}</PointName>
                <PointItems>
                    {point.items.map(item => item.title).join(', ')}
                </PointItems>

                <AddressContainer>
                    <AddressTitle>Endereço</AddressTitle>
                    <AddressContent>{`${point.city}, ${point.uf}`}</AddressContent>
                </AddressContainer>
            </Container>
            <Footer>
                <WhatsappButton onPress={handleWhatsapp}>
                    <FAIcon name="whatsapp" size={20} color="#fff" />
                    <WhatsappText>Whatsapp</WhatsappText>
                </WhatsappButton>

                <MailButton onPress={handleMail}>
                    <FTIcon name="mail" size={20} color="#fff" />
                    <MailText>E-mail</MailText>
                </MailButton>
            </Footer>
        </PageDetail>
    );
};

export default Detail;
