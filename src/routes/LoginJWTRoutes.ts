import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
import UsuarioModel from '../db/models/user';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const { loginValidation, registerValidation } = require('../validation/validation');

const router = (app: any, ds: DataService) => {

    app.route('/LoginJWT')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({
                        message: 'Get generado JWT',
                        authData
                    });
                }
            });
            // res.status(201);
            //res.send('Get LoginJWT ok');
        })
        .post(async (req: any, res: any) => {
            // Lets validate data 
            //const { error } = Joi.validate(req.body, schema);
            const { error } = loginValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            //checking if the email exist

            // Este codigo tengo que revisarlo porque me sigue trayendo todos los usuarios

            const usuario: any = ds.dbModels.user;
            const usermail = await usuario.findOne({
                where: { email: req.body.email }
            });

            if (!usermail) return res.status(400).send('No existe el email');

            const userpwd = await usuario.findOne({
                where: { pwd: req.body.pwd }
            });

            if (!userpwd) return res.status(400).send('No existe la clave');

            const user = {
                email: req.body.email,
                pwd: req.body.pwd
            }
            /*
                Esta es la manera de firmam poniendo un tiempo de expiracion al token, 
                por ahora no lo voy a usar
                jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err: any, token: any) => {
            */
            jwt.sign({ user }, process.env.JWT_SECRETKEY, (err: any, token: any) => {
                res.json({
                    token
                });
            });

        });

};
/*
// Format Token
// Autorization: 1 <access_token>


function verifytoken(req: any, res: any, next: any) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
*/
export default router;
