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

    app.route('/responsepacient')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({
                        message: 'Get generado JWT'
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
                    //const { error } = requestValidation(req.body);
                    //if (error) return res.status(400).send(error.details[0].message);
                    //checking if the email exist
                    console.log(req.body.professionalid);


                    const t = await ds.dbClient.transaction();

                    try {

                        //Actualizo si el profesional esta en servicio

                        const profesional: any = ds.dbModels.professional;

                        const profesional1 = await profesional.update({ in_service: req.body.approve }, {
                            where: { id: req.body.professionalid }
                        });

                        // Aca va el codigo para actualizar el request
                        console.log("voy a realizar el update");
                        const requestm: any = ds.dbModels.request;
                        const request1 = await requestm.update({ approve: req.body.approve, commentprof: req.body.comment }, {
                            where: { id: req.body.requestid }
                        }, { t });
                        //Consulto os datos del request
                        const request2 = await requestm.findOne({
                            where: { id: req.body.requestid }
                        });

                        console.log(JSON.stringify(request2));
                        console.log("voy a consultar el usuario " + request2.UserId);

                        const usuario: any = ds.dbModels.user;
                        const user1 = await usuario.findOne({
                            where: { id: request2.UserId }
                        });

                        //Consulto datos del profesional
                        var strProfesional = "";

                        const profesional2 = await profesional.findOne({
                            where: { id: req.body.professionalid }
                        });

                        strProfesional = profesional2.name + " " + profesional2.surname;
                        const strImagen = profesional2.picture;

                        console.log("proff " + strProfesional);
                        console.log("Img " + strImagen);

                        // Envio de notificacion push

                        var serverKey = process.env.SERVER_KEY;
                        var fcm = new FCM(serverKey);
                        console.log("Seteo el token " + user1.fcmtoken);
                        var token = user1.fcmtoken;

                        var strApprove = "rechazó"

                        if (req.body.approve) {
                            strApprove = "aprobó";
                        }

                        var message = {
                            to: token,
                            collapse_key: '',
                            data: { // Esto es solo opcional, puede enviar cualquier dato     
                                msg: "Recibió una respuesta del servicio solicitado",
                                pnid: req.body.requestid
                            },
                            body: {
                                title: "El profesional " + strProfesional + " " + strApprove + " el servicio",
                                body: "Hola!",
                                image: strImagen,
                                icon: "Notificación",
                                sound: "default"
                            },
                        };

                        console.log("msg PN " + JSON.stringify(message));
                        fcm.send(message, function (err: any, response: any) {
                            if (err) {
                                console.log("error encontrado ", JSON.stringify(err));
                            } else {
                                console.log("respuesta aquí", JSON.stringify(response));
                            }
                        });

                        await t.commit();
                        res.status(200).json({
                            message: 'Respuesta de servicio generada con exito !!'
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
