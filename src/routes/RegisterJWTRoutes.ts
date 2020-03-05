import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//import UsuarioModel from '../db/models/User';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const bcrypt = require('bcryptjs');


const { loginValidation, registerValidation } = require('../validation/validation');
// para el nodemailer
// const email = require("../service/email");
//Para el AWS SES
const nodemailerSES = require("nodemailer");
const AWS = require("aws-sdk");


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

            if (usermail) return res.status(400).send('El usuario ya existe');

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
                    address: req.body.address,
                    gender: req.body.gender
                }

                const UserModel: any = ds.dbModels.user;
                //const ProvinceModel: any = ds.dbModels.province;
                //const CountryModel: any = ds.dbModels.country;

                //const province1 = await ProvinceModel.create({ code: 'BSAS', name: 'Buenos Aires' });
                //const country1 = await CountryModel.create({ code: 'ARG', name: 'Argentina' });
                //await province1.setCountry(country1);

                //const user1 = await UserModel.create({ name: 'Javier', surname: 'Hack', pwd: 'javi1234', email: 'javierhack@gmail.com' });
                const user1 = await UserModel.create(user);
                await user1.setGender(req.body.gender);

                console.log(user);
                //await user1.setCountry(country1);
                //await user1.setProvince(province1);
                /*
                    Esta es la manera de firmam poniendo un tiempo de expiracion al token, 
                    por ahora no lo voy a usar
                    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err: any, token: any) => {
                */

                //Envio de mail de confirmacion de REgistracion
                /* Parametros Para el mail con gmail
                 const oEmail = new email({
                     "host": process.env.EMAIL_HOST,
                     "port": process.env.EMAIL_PORT,
                     "secure": process.env.EMAIL_SECURE,
                     "auth": {
                         "user": process.env.EMAIL_USER,
                         "pass": process.env.EMAIL_PASS
                     }
                 });
                 */
                // Parametros Para el mail con AWS SES
                AWS.config.update({
                    accessKeyId: process.env.AWS_ACCESSKEYID,
                    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
                    region: process.env.AWS_REGION

                });

                let transporter = nodemailerSES.createTransport({
                    SES: new AWS.SES({
                        apiVersion: '2010-12-01'
                    })
                });

                let email1 = {
                    from: "service@vlife.com",
                    to: user.email,
                    subject: "Bienbenido/a a Vlife",
                    html: `
                                <div>
                                <p>Bienvenido/a: ${user.name} ${user.surname} </p>
                                <p>Usuario/Email es: ${user.email} </p>
                                <p>Tu clave es: ${user.pwd}  </p>
                                <p></p>
                                <p>Es un mail de prueba</p>
                                </div>
                            `
                };

                transporter.sendMail(email1, (err: any, info: any) => {

                    if (err) {
                        console.log("Error al enviar email - error " + err);
                    } else {
                        console.log("Correo enviado correctamente - info " + info);
                    }
                });
                jwt.sign({ user }, process.env.JWT_SECRETKEY, (err: any, token: any) => {
                    res.status(200).json({
                        token
                    });
                });
            } catch (err) {
                res.json({ message: err });
            }

        });


};
export default router;
