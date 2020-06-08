import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import Header from '~/components/Header';
import Dropzone from '~/components/Dropzone';

import api from '../../services/api';

import {
    PageCreatePoint,
    Form,
    FieldsetContainer,
    FieldGroup,
    Field,
    MapElement as Map,
    ItemsGrid,
    Item,
} from './styles';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGE_UF_Reponse {
    sigla: string;
}

interface IBGE_City_Response {
    nome: string;
}

const CreatePoint: React.FC = () => {
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
        0,
        0,
    ]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);

    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                setInitialPosition([latitude, longitude]);
            },
            () => {
                alert('Erro ao obter coordenadas');
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    useEffect(() => {
        async function getItems() {
            await api.get('items').then(res => {
                setItems(res.data);
            });
        }

        getItems();
    }, []);

    useEffect(() => {
        async function getUFs() {
            await axios
                .get<IBGE_UF_Reponse[]>(
                    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
                )
                .then(res => {
                    const ufInitials = res.data.map(uf => uf.sigla);

                    setUfs(ufInitials);
                });
        }

        getUFs();
    }, []);

    useEffect(() => {
        setSelectedCity('0');

        if (selectedUf === '0') {
            setCities([]);
            return;
        }

        async function getCities() {
            await axios
                .get<IBGE_City_Response[]>(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
                )
                .then(res => {
                    const citiesName = res.data.map(city => city.nome);

                    setCities(citiesName);
                });
        }

        getCities();
    }, [selectedUf]);

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setInputData({ ...inputData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = inputData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', selectedItems.join(','));

        if (selectedFile) data.append('image', selectedFile);

        await api.post('points', data);

        history.push('/success');
    }

    return (
        <PageCreatePoint>
            <Header back backText="Voltar para home" backLink="/" />

            <Form onSubmit={handleSubmit}>
                <h1>
                    Cadastro do <br /> ponto de coleta
                </h1>

                <Dropzone onFileUploaded={setSelectedFile} />

                <FieldsetContainer>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <Field>
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                        />
                    </Field>

                    <FieldGroup>
                        <Field>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={handleInputChange}
                            />
                        </Field>
                        <Field>
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                id="whatsapp"
                                name="whatsapp"
                                onChange={handleInputChange}
                            />
                        </Field>
                    </FieldGroup>
                </FieldsetContainer>

                <FieldsetContainer>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map
                        center={initialPosition}
                        zoom={15}
                        onclick={handleMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker
                            position={
                                selectedPosition[0] !== 0
                                    ? selectedPosition
                                    : initialPosition
                            }
                        />
                    </Map>

                    <FieldGroup>
                        <Field>
                            <label htmlFor="uf">Estado (UF)</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={event =>
                                    setSelectedUf(event.target.value)
                                }
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>
                                        {uf}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field>
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={event =>
                                    setSelectedCity(event.target.value)
                                }
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option value={city}>{city}</option>
                                ))}
                            </select>
                        </Field>
                    </FieldGroup>
                </FieldsetContainer>

                <FieldsetContainer>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ItemsGrid>
                        {items.map(item => (
                            <Item
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                selected={selectedItems.includes(item.id)}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </Item>
                        ))}
                    </ItemsGrid>
                </FieldsetContainer>

                <button type="submit">Cadastrar ponto de coleta</button>
            </Form>
        </PageCreatePoint>
    );
};

export default CreatePoint;
