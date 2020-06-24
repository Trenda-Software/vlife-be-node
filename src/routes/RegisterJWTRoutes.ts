import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//import UsuarioModel from '../db/models/User';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const bcrypt = require('bcryptjs');
var fs = require('fs');
const AWS = require("aws-sdk");

const { loginValidation, registerValidation } = require('../validation/validation');


const nodemailerSES = require("nodemailer");



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

        })
        .post(async (req: any, res: any) => {
            const { error } = registerValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            //checking if the email exist

            const usuario: any = ds.dbModels.user;
            const userMail = await usuario.findOne({
                where: { email: req.body.email }
            });

            if (userMail) return res.status(200).send('El mail ya esta en uso');

            try {


                const user = {
                    dni: req.body.dni,
                    name: req.body.name,
                    surname: req.body.surname,
                    pwd: req.body.pwd,
                    coordinates: req.body.coordinates,
                    //picture: req.body.picture,
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
                const hisGender = await user1.getGender();
                var userdev = {};
                console.log(user);
                console.log(userdev);
                //Grabo la imagen en disco
                //Declaro el S#
                const s3 = new AWS.S3({
                    accessKeyId: "AKIATZGWNNFHODVQTJSA",
                    secretAccessKey: "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"
                });

                //Grabo la imagen
                var filename = user1.id + ".png";
                var b64string = req.body.picture;
                var buf = Buffer.from(b64string, 'base64')

                var parametrosPutObject = {
                    Bucket: process.env.S3_BUCKET,
                    Key: 'img/users/' + filename,
                    Body: buf
                }
                var urlname: any;
                var putObjectPromise = s3.upload(parametrosPutObject).promise();
                putObjectPromise.then(async function (data: any) {
                    console.log("upload : " + JSON.stringify(data));
                    urlname = data.Location;
                    // Update con el nombre de imagen
                    console.log("url: " + urlname)
                    const userfcm = await UserModel.update({ picture: urlname }, {
                        where: { email: req.body.email }
                    });
                    const userdev = {
                        id: user1.id,
                        name: user1.name,
                        surname: user1.surname,
                        dni: user1.dni,
                        email: user1.email,
                        mobile: user1.mobile,
                        gender: hisGender.name,
                        address: user1.address,
                        picture: urlname
                    }

                    jwt.sign({ userdev }, process.env.JWT_SECRETKEY, (err: any, token: any) => {
                        res.status(200).json({
                            token,
                            userdev
                        });
                    });
                }).catch(function (err: any) {
                    console.log("Error upload: " + err);
                });
                console.log("Creo el transporte");

                var transporter = nodemailerSES.createTransport({
                    "host": process.env.EMAIL_HOST,
                    "secure": process.env.EMAIL_SECURE,//true, // use SSL
                    "port": process.env.EMAIL_PORT,
                    "auth": {
                        "user": process.env.EMAIL_USER,
                        "pass": process.env.EMAIL_PASS
                    }
                });
                let email1 = {
                    from: process.env.EMAIL_DIRSEND,
                    to: user.email,
                    subject: "Bienvenido/a a Vlife",
                    html: `
                                <div>
                                <p>Bienvenido/a: ${user.name} ${user.surname} </p>
                                <p>Usuario/Email es: ${user.email} </p>
                                <p>Tu clave es: ${user.pwd}  </p>
                                <p></p>
                                
                                </div>
                            `
                };

                transporter.sendMail(email1, (err: any, info: any) => {

                    if (err) {
                        console.log("Error al enviar email - error " + JSON.stringify(err));
                    } else {
                        console.log("Correo enviado correctamente - info " + JSON.stringify(info));
                    }
                });
            } catch (err) {
                res.json({ message: JSON.stringify(err) });
            }

        });


};
export default router;
