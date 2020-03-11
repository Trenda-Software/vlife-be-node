import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//import { TIME, NOW } from 'sequelize/types';


//import UsuarioModel from '../db/models/User';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const { requestValidation } = require('../validation/validation');

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

                    if (profesional2) return res.status(400).send('El Profesioanl solicitado ya tiene un servicio en curso.');

                    const t = await ds.dbClient.transaction();

                    try {
                        // Aca va el codigo para crear la solicitud de servicio
                        console.log("voy a realizar el create");
                        const requestm: any = ds.dbModels.request;
                        const request1 = await requestm.create({ comment: req.body.comment, date: Date.now() }, { t });

                        await request1.setUser(req.body.userid);
                        await request1.setProfessional(req.body.professionalid);
                        //Recorro el array de especialidades
                        const especialidades = req.body.specialtyid;

                        for (let especialidad in especialidades) {
                            await request1.addSpecialty(especialidades[especialidad]);
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
                                solicitud: "Recibio una solicitud de servidio"
                            },
                            body: {
                                title: "Notificación de Vlife",
                                body: "Recibio una solicitud de servidio",
                                icon: "notificacion",
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
