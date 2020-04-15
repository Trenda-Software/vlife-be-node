import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
var FCM = require('fcm-push');


const router = (app: any, ds: DataService) => {

    app.route('/terminarserv')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {

            const t = await ds.dbClient.transaction();

            try {
                const request: any = ds.dbModels.request;
                const request1 = await request.findOne({
                    where: { id: req.body.id }
                });

                if (!request1) return res.status(400).send('El id no existe en la base de datos');

                const userID = request1.UserId;
                const professionalID = request1.ProfessionalId;

                var stateRequest = 7; //Finalizado x el usuario
                if (req.body.prof) {
                    stateRequest = 3; //Finalizado x el profesional
                    const request2 = await request.update({ staterequest: stateRequest, commentprof: req.body.comment }, {
                        where: { id: req.body.id }
                    });
                } else {
                    const request2 = await request.update({ staterequest: stateRequest, commentusr: req.body.comment }, {
                        where: { id: req.body.id }
                    });
                }

                const prefessional: any = ds.dbModels.professional;
                const prof1 = await prefessional.update({ in_service: false }, {
                    where: { id: professionalID }
                });

                console.log("update " + req.body.id);
                if (req.body.prof) {

                    const usuario: any = ds.dbModels.user;

                    const user1 = await usuario.findOne({
                        where: { id: userID }
                    });

                    var strUser = "";
                    strUser = user1.name + " " + user1.surname;
                    var strImagen = user1.picture;

                    console.log("user " + strUser);
                    console.log("Img " + strImagen);

                    //Consulto datos del profesional
                    const profesional: any = ds.dbModels.professional;

                    const profesional2 = await profesional.findOne({
                        where: { id: professionalID }
                    });


                    // Envio de notificacion push


                    if (req.body.prof) {
                        var serverKey = process.env.USR_SERVER_KEY;
                        var token = user1.fcmtoken
                        strImagen = profesional2.picture;
                        strUser = profesional2.name + " " + profesional2.surname;

                        var fcm = new FCM(serverKey);

                        var message = {
                            to: token,
                            notification: {
                                title: "Se recibió la notificación de la finalización del servicio",
                                image: strImagen
                            },
                            collapse_key: '',
                            data: { // Esto es solo opcional, puede enviar cualquier dato     
                                msg: strUser + " termioó el servicio",
                                pnid: req.body.requestid
                            },
                            body: {
                                title: strUser + " terminó el servicio",
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
                    }
                }
                await t.commit();
                res.status(200).json({
                    message: 'Servicio finalizado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                await t.rollback();
                return res.status(400).json({ message: err });
            }
        });


};
export default router;
