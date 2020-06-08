import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Sucess from './pages/Success';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact component={Home} path="/" />
            <Route component={CreatePoint} path="/create-point" />
            <Route component={Sucess} path="/success" />
        </BrowserRouter>
    );
};

export default Routes;
