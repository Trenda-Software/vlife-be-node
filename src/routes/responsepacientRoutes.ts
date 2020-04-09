import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const { requestValidation } = require('../validation/validation');

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

        })
        .post(verifytoken, async (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {

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
                        var stateRequest = 1;
                        if (req.body.approve) {
                            stateRequest = 2;
                        }
                        const request1 = await requestm.update({ approve: req.body.approve, commentprof: req.body.comment, staterequest: stateRequest }, {
                            where: { id: req.body.requestid }
                        });
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

                        var serverKey = process.env.USR_SERVER_KEY;
                        var fcm = new FCM(serverKey);
                        console.log("Seteo el token " + user1.fcmtoken);
                        var token = user1.fcmtoken;

                        var strApprove = "rechazó"

                        if (req.body.approve) {
                            strApprove = "aprobó";
                        }

                        var message = {
                            to: token,
                            notification: {
                                title: "Recibiste una respuesta de servicio",
                                image: strImagen
                            },
                            collapse_key: '',
                            data: { // Esto es solo opcional, puede enviar cualquier dato     
                                msg: "El profesional " + strProfesional + " " + strApprove + " el servicio",
                                pnid: req.body.requestid,
                                approve: req.body.approve,
                                comentario: req.body.comment,
                                distanciak: req.body.distanciak,
                                distanciatiempo: req.body.distanciatiempo

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
                        console.log("error " + JSON.stringify(err));
                        await t.rollback();
                        return res.json({ message: JSON.stringify(err) });
                    }
                }
            });
        });


};
export default router;
