import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';

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

        })
        .post(async (req: any, res: any) => {
            const { error } = registerProfValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            //checking if the email exist

            const profesional: any = ds.dbModels.professional;
            const profMail = await profesional.findOne({
                where: { email: req.body.email }
            });

            if (profMail) return res.status(200).send('El mail ya esta en uso');

            try {


                const prof = {
                    dni: req.body.dni,
                    name: req.body.name,
                    surname: req.body.surname,
                    pwd: req.body.pwd,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    gender: req.body.gender,
                    description: req.body.description,
                    in_service: 0,
                    on_line: 1,
                    comvlife: 0.8,
                    paymethod: req.body.paymethod,
                    cbu: req.body.cbu,
                    certnumber: req.body.certnumber,
                    approved: 0
                }

                var profdev = {};
                const profModel: any = ds.dbModels.professional;

                const prof1 = await profModel.create(prof);
                //Seteo el genero
                await prof1.setGender(req.body.gender);
                const hisGender = await prof1.getGender();
                //Seteo la especialidad

                const specialty: any = ds.dbModels.specialty;
                const specialty1 = await specialty.findOne({
                    where: { id: req.body.especialidadid }
                });

                await specialty1.addProfessionals([prof1]);

                //Seteo las practicas asociadas
                const PracticeCostModel: any = ds.dbModels.practicecost;

                const practicas1 = req.body.practicas;

                const practicas = practicas1.map(async (practica: any) => {

                    const PracticeCost = await PracticeCostModel.create({
                        cost: practica.cost,
                    });
                    await PracticeCost.setProfessional(prof1);
                    await PracticeCost.setPractice(practica.id);
                    return practicas;
                });
                Promise.all(practicas)
                    .then(returnedValues => {
                        console.log("practicas: " + JSON.stringify(practicas));
                    })
                    .catch(reason => {
                        console.log(reason);
                        return res.json({ message: JSON.stringify(reason) });
                    });

                console.log(prof);

                //Grabo la imagen en disco
                //Declaro el S#
                const s3 = new AWS.S3({
                    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY
                });

                //Grabo la imagen del prof
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

                    profdev = {
                        id: prof1.id,
                        name: prof1.name,
                        surname: prof1.surname,
                        dni: prof1.dni,
                        email: prof1.email,
                        mobile: prof1.mobile,
                        gender: hisGender.name,
                        address: prof1.address,
                        description: prof1.description,
                        approved: prof1.approved,
                        picture: urlname,
                        specialtyid: req.body.especialidadid,
                        certNumber: prof1.certnumber
                    };
                    console.log(profdev);
                    //Grabo la imagen del certificado o titulo

                    var fileNameCert = "c" + prof1.id + ".png";
                    var b64StringCert = req.body.certpicture;

                    var bufCert = Buffer.from(b64StringCert, 'base64')

                    var parametrosPutObjectCert = {
                        Bucket: process.env.S3_BUCKET,//'vlife-aws-s3-images',
                        Key: 'img/professionals/' + fileNameCert,
                        Body: bufCert
                    }
                    var urlNameCert: any;
                    var putObjectPromiseCert = s3.upload(parametrosPutObjectCert).promise();
                    putObjectPromiseCert.then(async function (data: any) {
                        console.log("upload : " + JSON.stringify(data));
                        urlNameCert = data.Location;
                        // Update con el nombre de imagen
                        console.log("url: " + urlname)
                        const profFcmCert = await profModel.update({ certpicture: urlNameCert }, {
                            where: { email: req.body.email }
                        });

                    }).catch(function (err: any) {
                        console.log("Error upload2: " + err);
                    });

                    jwt.sign({ profdev }, process.env.JWT_SECRETKEY, (err: any, token: any) => {
                        res.status(200).json({
                            token,
                            profdev
                        });
                    });
                }).catch(function (err: any) {
                    console.log("Error upload1: " + err);
                });

                console.log("Creo el transporte");

                var transporter = nodemailerSES.createTransport({
                    "host": process.env.EMAIL_HOST,
                    "secure": process.env.EMAIL_SECURE,
                    "port": process.env.EMAIL_PORT,
                    "auth": {
                        "user": process.env.EMAIL_USER,
                        "pass": process.env.EMAIL_PASS
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
                res.json({ message: err });
            }

        });


};
export default router;
