import express from 'express';
import path from 'path';
import multer from 'multer';

import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

// Items
routes.get('/items', ItemsController.index);

// Points
routes.get('/points', PointsController.index);
routes.get('/points/:id', PointsController.show);
routes.post('/points', upload.single('image'), PointsController.create);

// Static Files
routes.use(
    '/uploads',
    express.static(path.resolve(__dirname, '..', 'uploads'))
);

export default routes;
