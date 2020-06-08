import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import { PageHome, Content, Main } from './styles';

import Header from '~/components/Header';

const Home: React.FC = () => {
    return (
        <PageHome>
            <Content>
                <Header back={false} />

                <Main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>
                        Ajudamos pessoas a encontrarem pontos de coleta de forma
                        eficiente.
                    </p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </Main>
            </Content>
        </PageHome>
    );
};

export default Home;
