import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//import UsuarioModel from '../db/models/User';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const bcrypt = require('bcryptjs');
var fs = require('fs');
const AWS = require("aws-sdk");

const { loginValidation, registerProfValidation } = require('../validation/validation');


const nodemailerSES = require("nodemailer");



const router = (app: any, ds: DataService) => {

    app.route('/RegisterProfJWT')
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
            const { error } = registerProfValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            //checking if the email exist

            const profesional: any = ds.dbModels.professional;
            const profmail = await profesional.findOne({
                where: { email: req.body.email }
            });

            if (profmail) return res.status(400).send('El mail ya esta en uso');

            try {


                const prof = {
                    dni: req.body.dni,
                    name: req.body.name,
                    surname: req.body.surname,
                    pwd: req.body.pwd,
                    //coordinates: req.body.coordinates,
                    //picture: req.body.picture,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    gender: req.body.gender,
                    description: req.body.description,
                    in_service:0,
                    on_line:1
                }

                const profModel: any = ds.dbModels.professional;

                const prof1 = await profModel.create(prof);
                await prof1.setGender(req.body.gender);
                const hisGender = await prof1.getGender();
                const profdev = {
                    id: prof1.id,
                    name: prof1.name,
                    surname: prof1.surname,
                    dni: prof1.dni,
                    email: prof1.email,
                    mobile: prof1.mobile,
                    gender: hisGender.name,
                    address: prof1.address,
                    description: prof1.description
                }
                console.log(prof);
                console.log(profdev);
                //Grabo la imagen en disco
                //Declaro el S#
                const s3 = new AWS.S3({
                    accessKeyId: "AKIATZGWNNFHODVQTJSA",
                    secretAccessKey: "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"
                });

                //Grabo la imagen
                var filename = prof1.id + ".png";
                var b64string = req.body.picture;
                var buf = Buffer.from(b64string, 'base64')

                var parametrosPutObject = {
                    Bucket: process.env.S3_BUCKET,//'vlife-aws-s3-images',
                    Key: 'img/professionals/' + filename,
                    Body: buf
                }
                var urlname: any;
                var putObjectPromise = s3.upload(parametrosPutObject).promise();
                putObjectPromise.then(async function (data: any) {
                    console.log("upload : " + JSON.stringify(data));
                    urlname = data.Location;
                    // Update con el nombre de imagen
                    console.log("url: " + urlname)
                    const proffcm = await profModel.update({ picture: urlname }, {
                        where: { email: req.body.email }
                    });

                }).catch(function (err: any) {
                    console.log("Error upload: " + err);
                });

                //await user1.setCountry(country1);
                //await user1.setProvince(province1);
                /*
                    Esta es la manera de firmam poniendo un tiempo de expiracion al token, 
                    por ahora no lo voy a usar
                    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err: any, token: any) => {
                */


                console.log("Creo el transporte");

                var transporter = nodemailerSES.createTransport({ // Yes. SMTP!
                    "host": process.env.EMAIL_HOST,//"email-smtp.eu-west-1.amazonaws.com", // Amazon email SMTP hostname
                    "secure": process.env.EMAIL_SECURE,//true, // use SSL
                    "port": process.env.EMAIL_PORT,//465, // port for secure SMTP
                    "auth": {
                        "user": process.env.EMAIL_USER,//"AKIATZGWNNFHKDGUFCWZ", // Use from Amazon Credentials
                        "pass": process.env.EMAIL_PASS//"BGLEqKAFPboBc4rg4gknyHESsgkAfUmdKyni1TZZdp/I", // Use from Amazon Credentials
                    }
                });
                let email1 = {
                    from: process.env.EMAIL_DIRSEND,
                    to: prof.email,
                    subject: "Bienvenido/a a Vlife",
                    html: `
                                <div>
                                <p>Bienvenido/a: ${prof.name} ${prof.surname} </p>
                                <p>Usuario/Email es: ${prof.email} </p>
                                <p>Tu clave es: ${prof.pwd}  </p>
                                <p></p>
                                <p>Es un mail de prueba</p>
                                </div>
                            `
                };

                transporter.sendMail(email1, (err: any, info: any) => {

                    if (err) {
                        console.log("Error al enviar email - error " + err);
                    } else {
                        console.log("Correo enviado correctamente - info " + JSON.stringify(info));
                    }
                });
                jwt.sign({ prof }, process.env.JWT_SECRETKEY, (err: any, token: any) => {
                    res.status(200).json({
                        token,
                        profdev
                    });
                });
            } catch (err) {
                res.json({ message: JSON.stringify(err) });
            }

        });


};
export default router;
