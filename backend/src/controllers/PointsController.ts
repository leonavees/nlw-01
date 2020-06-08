import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => {
                return Number(item.trim());
            });

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://localhost:3333/uploads/${point.image}`,
            };
        });

        return res.json(serializedPoints);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return res.status(400).json({ error: 'Ponto não encontrado' });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        const serializedPoint = {
            ...point,
            image_url: `http://localhost:3333/uploads/${point.image}`,
        };

        return res.json({ ...serializedPoint, items });
    }

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = req.body;

        const point = {
            image: req.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        try {
            const trx = await knex.transaction();

            const insertedIds = await trx('points').insert(point);

            const point_id = insertedIds[0];

            const pointItems = items.split(',').map((item_id: string) => {
                return {
                    item_id: Number(item_id),
                    point_id,
                };
            });

            await trx('point_items').insert(pointItems);

            await trx.commit();

            return res.status(201).json({ id: point_id, ...point });
        } catch (err) {
            return res.status(500).json({
                error: 'Ocorreu um erro inesperado, tente novamente!',
            });
        }
    }
}

export default new PointsController();