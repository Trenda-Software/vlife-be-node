import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//import UsuarioModel from '../db/models/User';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const bcrypt = require('bcryptjs');

const { loginValidation, registerValidation } = require('../validation/validation');

const router = (app: any, ds: DataService) => {

    app.route('/RegisterJWT')
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
            const { error } = registerValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            //checking if the email exist

            const usuario: any = ds.dbModels.user;
            const usermail = await usuario.findOne({
                where: { email: req.body.email }
            });

            if (usermail) return res.status(400).send('El email ya existe en la base de datos');

            try {
                const user = {
                    dni: req.body.dni,
                    name: req.body.name,
                    surname: req.body.surname,
                    pwd: req.body.pwd,
                    coordinates: req.body.coordinates,
                    picture: req.body.picture,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    address: req.body.address
                }

                const UserModel: any = ds.dbModels.user;
                //const ProvinceModel: any = ds.dbModels.province;
                //const CountryModel: any = ds.dbModels.country;

                //const province1 = await ProvinceModel.create({ code: 'BSAS', name: 'Buenos Aires' });
                //const country1 = await CountryModel.create({ code: 'ARG', name: 'Argentina' });
                //await province1.setCountry(country1);

                //const user1 = await UserModel.create({ name: 'Javier', surname: 'Hack', pwd: 'javi1234', email: 'javierhack@gmail.com' });
                const user1 = await UserModel.create(user);
                console.log(user);
                //await user1.setCountry(country1);
                //await user1.setProvince(province1);
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
            } catch (err) {
                res.json({ message: err });
            }

        });


};
export default router;
