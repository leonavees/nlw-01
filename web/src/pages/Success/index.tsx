import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';

const Sucess: React.FC = () => {
    return (
        <Container>
            <Link to="/">
                <FiArrowLeft />
                Voltar para página inicial
            </Link>
            <div>
                <FiCheckCircle size={50} />
                <h1>Cadastro concluído!</h1>
            </div>
        </Container>
    );
};

export default Sucess;
