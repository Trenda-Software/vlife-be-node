import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const { requestValidation } = require('../validation/validation');

var FCM = require('fcm-push');

const router = (app: any, ds: DataService) => {

    app.route('/cancelserv')
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

                    console.log(req.body.id);

                    var stateRequest = 4; //Cancelado x el Usuario

                    if (req.body.prof) {
                        stateRequest = 6; //Cancelado x el Profesional
                    }

                    const t = await ds.dbClient.transaction();

                    try {

                        // Aca va el codigo para actualizar el request
                        console.log("voy a realizar el update");
                        const requestm: any = ds.dbModels.request;
                        if (req.body.prof) {
                            const request1 = await requestm.update({ staterequest: stateRequest, commentprof: req.body.comment }, {
                                where: { id: req.body.id }
                            });
                        } else {

                            const request0 = await requestm.findOne({
                                where: { id: req.body.id, staterequest: 0 }
                            });
                            if (request0) {
                                stateRequest = 11; //Cancelado x el Usuario y el estado anterior era 0
                            }
                            const request1 = await requestm.update({ staterequest: stateRequest, commentusr: req.body.comment }, {
                                where: { id: req.body.id }
                            });
                        }
                        //Consulto os datos del request
                        const request2 = await requestm.findOne({
                            where: { id: req.body.id }
                        });

                        const profesional: any = ds.dbModels.professional;
                        const prof1 = await profesional.update({ in_service: false }, {
                            where: { id: request2.ProfessionalId }
                        });
                        console.log(JSON.stringify(request2));
                        console.log("voy a consultar el usuario " + request2.UserId);

                        const usuario: any = ds.dbModels.user;
                        const user1 = await usuario.findOne({
                            where: { id: request2.UserId }
                        });



                        var strUser = "";
                        strUser = user1.name + " " + user1.surname;
                        var strImagen = user1.picture;

                        console.log("user " + strUser);
                        console.log("Img " + strImagen);

                        //Consulto datos del profesional

                        const profesional2 = await profesional.findOne({
                            where: { id: request2.ProfessionalId }
                        });


                        // Envio de notificacion push

                        var serverKey = process.env.PROF_SERVER_KEY;
                        console.log("Seteo el token " + profesional2.fcmtoken);
                        var token = profesional2.fcmtoken;
                        var color = "#194876"
                        if (req.body.prof) {
                            serverKey = process.env.USR_SERVER_KEY;
                            token = user1.fcmtoken
                            strImagen = profesional2.picture;
                            strUser = profesional2.name + " " + profesional2.surname;
                            color = "#197476";
                        }
                        var fcm = new FCM(serverKey);

                        var message = {
                            to: token,
                            notification: {
                                title: "Se recibió una cancelación de servicio",
                                icon: "icon",
                                color: color
                            },
                            collapse_key: '',
                            data: { // Esto es solo opcional, puede enviar cualquier dato     
                                status: stateRequest,
                                requestID: req.body.id,
                                title: "Se recibió una cancelación de servicio",
                                image: strImagen
                            },
                            body: {
                                title: strUser + " canceló el servicio",
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
                            message: 'Cancelación de servicio generada con exito !!'
                        });
                    } catch (err) {
                        console.log("error " + err);
                        await t.rollback();
                        return res.json({ message: JSON.stringify(err) });
                    }
                }
            });
        });


};
export default router;
