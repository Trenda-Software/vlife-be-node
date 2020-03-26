import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const { requestValidation } = require('../validation/validation');
var fs = require('fs');
const AWS = require("aws-sdk");
//var fcm = require("fcm-notification");
var FCM = require('fcm-push');

const router = (app: any, ds: DataService) => {

    app.route('/request')
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
        .post(verifytoken, async (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const { error } = requestValidation(req.body);
                    if (error) return res.status(400).send(error.details[0].message);
                    //checking if the email exist
                    console.log(req.body.professionalid);

                    const profesional: any = ds.dbModels.professional;

                    const profesional1 = await profesional.findOne({
                        where: { id: req.body.professionalid }
                    });

                    if (!profesional1) return res.status(400).send('No existe el profesional.');
                    const profesional2 = await profesional.findOne({
                        where: {
                            id: req.body.professionalid,
                            in_service: true
                        }
                    });

                    if (profesional2) return res.status(400).send('El Profesional solicitado ya tiene un servicio en curso.');

                    const t = await ds.dbClient.transaction();

                    try {
                        // Aca va el codigo para crear la solicitud de servicio
                        console.log("voy a realizar el create");
                        const requestm: any = ds.dbModels.request;
                        const request1 = await requestm.create({ commentusr: req.body.comment, date: Date.now(), staterequest: 0 }, { t });
                        const imgpres: any = ds.dbModels.ImgPrescription;

                        await request1.setUser(req.body.userid);
                        await request1.setProfessional(req.body.professionalid);

                        //Consulto datos del usuario
                        var strUsuario = "";

                        const usuario: any = ds.dbModels.user;

                        const usuario1 = await usuario.findOne({
                            where: { id: req.body.userid }
                        });

                        strUsuario = usuario1.name + " " + usuario1.surname;
                        const strImagen = usuario1.picture;

                        console.log("user " + strUsuario);
                        console.log("Img " + strImagen);

                        //Recorro el array de especialidades
                        const especialidades = req.body.practicesid;

                        for (let especialidad in especialidades) {
                            await request1.addSpecialty(especialidades[especialidad]);
                        }
                        //Recorro las imagenes de las recetas
                        //Declaro el S#
                        const s3 = new AWS.S3({
                            accessKeyId: "AKIATZGWNNFHODVQTJSA",
                            secretAccessKey: "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"
                        });

                        const prescriptions = req.body.prescription;
                        for (let prescription in prescriptions) {
                            var filename = req.body.userid + prescription + ".png";
                            var b64string = prescriptions[prescription];
                            var buf = Buffer.from(b64string, 'base64')

                            var parametrosPutObject = {
                                Bucket: process.env.S3_BUCKET, //'vlife-aws-s3-images',
                                Key: 'img/prescriptions/' + filename,
                                Body: buf
                            }
                            var urlname: any;
                            var putObjectPromise = s3.upload(parametrosPutObject).promise();
                            putObjectPromise.then(async function (data: any) {
                                console.log("upload : " + JSON.stringify(data));
                                urlname = data.Location;
                                console.log("url: " + urlname);
                                const imgpres1 = await imgpres.create({ picture: urlname }, { t });
                                //console.log(request1);
                                //console.log(request1.id);
                                await imgpres1.setRequest(request1.id);
                            }).catch(function (err: any) {
                                console.log("Error upload: " + err);
                            });


                        }
                        // Envio de notificacion push
                        console.log("cargo el json");
                        var serverKey = process.env.SERVER_KEY;
                        var fcm = new FCM(serverKey);
                        console.log("Seteo el token " + profesional1.fcmtoken);
                        var token = profesional1.fcmtoken;

                        var message = {
                            to: token,
                            collapse_key: '',
                            data: { // Esto es solo opcional, puede enviar cualquier dato     
                                msg: "Recibió una solicitud de servicio",
                                pnid: request1.id
                            },
                            body: {
                                title: "El usuario " + strUsuario + " acaba de solicitar tu servicio",
                                body: "Hola!",
                                image: strImagen,
                                icon: "Notificación",
                                sound: "default"
                            },
                        };

                        fcm.send(message, function (err: any, response: any) {
                            if (err) {
                                console.log("error encontrado ", err);
                            } else {
                                console.log("respuesta aquí", response);
                            }
                        });

                        await t.commit();
                        res.status(200).json({
                            message: 'Solicitud de servicio generada con exito !!'
                        });
                    } catch (err) {
                        console.log("error " + err);
                        await t.rollback();
                        return res.json({ message: err });
                    }
                }
            });
        });


};
export default router;
