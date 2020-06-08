/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { HeaderEcoleta } from './styles';

import logo from '~/assets/logo.svg';

interface HeaderProps {
    back: boolean;
    backText?: string;
    backLink?: string;
}

const Header: React.FC<HeaderProps> = ({ back, backText, backLink }) => {
    return (
        <HeaderEcoleta>
            <img src={logo} alt="Logo" />

            {back && (
                <Link to={String(backLink)}>
                    <FiArrowLeft /> {backText}
                </Link>
            )}
        </HeaderEcoleta>
    );
};

export default Header;
