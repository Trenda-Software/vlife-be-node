import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const { requestValidation } = require('../validation/validation');

var FCM = require('fcm-push');

const router = (app: any, ds: DataService) => {

    app.route('/confirmpayment')
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

                    const request: any = ds.dbModels.request;
                    const req1 = await request.findOne({
                        where: { id: req.body.id }
                    });

                    if (req1.length > 0) { return res.status(200).json({ message: 'Ya existe un pago realizado para este servicio' }); }

                    const t = await ds.dbClient.transaction();

                    try {

                        // Genero el ServicePayment
                        const ServiceP: any = ds.dbModels.servicepayment;
                        const sp1 = await ServiceP.create({ name: 'MercadoPago', currencyId: req.body.mercadoPagoData.currencyId, dateApproved: req.body.mercadoPagoData.dateApproved, dateCreated: req.body.mercadoPagoData.dateCreated, idTransaction: req.body.mercadoPagoData.id, operationType: req.body.mercadoPagoData.operationType, paymentMethodId: req.body.mercadoPagoData.paymentMethodId, paymentTypeId: req.body.mercadoPagoData.paymentTypeId, status: req.body.mercadoPagoData.status, statusDetail: req.body.mercadoPagoData.statusDetail, transactionAmount: req.body.mercadoPagoData.transactionAmount }, { t });

                        await sp1.setRequest(req.body.id);

                        // Aca va el codigo para actualizar el request
                        console.log("voy a realizar el update");
                        const requestm: any = ds.dbModels.request;
                        var stateRequest = 5;
                        const request1 = await requestm.update({ staterequest: stateRequest }, {
                            where: { id: req.body.id }
                        });
                        //Consulto os datos del request
                        const request2 = await requestm.findOne({
                            where: { id: req.body.id }
                        });

                        //await request2.setSercvicePayment(sp1);

                        console.log(JSON.stringify(request2));
                        console.log("voy a consultar el usuario " + request2.UserId);

                        const usuario: any = ds.dbModels.user;
                        const user1 = await usuario.findOne({
                            where: { id: request2.UserId }
                        });

                        var strUser = "";
                        strUser = user1.name + " " + user1.surname;
                        const strImagen = user1.picture;

                        console.log("user " + strUser);
                        console.log("Img " + strImagen);

                        //Consulto datos del profesional
                        const profesional: any = ds.dbModels.professional;


                        const profesional2 = await profesional.findOne({
                            where: { id: request2.ProfessionalId }
                        });



                        // Envio de notificacion push

                        var serverKey = process.env.PROF_SERVER_KEY;
                        var fcm = new FCM(serverKey);
                        console.log("Seteo el token " + profesional2.fcmtoken);
                        var token = profesional2.fcmtoken;

                        console.log("mercadoPagoData.transactionAmount " + req.body.mercadoPagoData.transactionAmount)
                        console.log("req.body.mercadoPagoData.id " + req.body.mercadoPagoData.id)

                        var message = {
                            to: token,
                            notification: {
                                title: "Se recibió la confirmación de pago del servicio",
                                image: strImagen
                            },
                            collapse_key: '',
                            data: { // Esto es solo opcional, puede enviar cualquier dato     
                                msg: strUser + " confirmo el servicio",
                                status: stateRequest,
                                requestID: req.body.requestid,
                                importe: req.body.mercadoPagoData.transactionAmount,
                                codigopago: req.body.mercadoPagoData.id
                            },
                            body: {
                                title: strUser + " confirmo el servicio",
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
                            message: 'Confirmación de pago generada con exito !!'
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
