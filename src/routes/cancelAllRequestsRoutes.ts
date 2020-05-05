import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
const { Sequelize } = require('sequelize');
var FCM = require('fcm-push');


const router = (app: any, ds: DataService) => {

    app.route('/cancelAllRequests')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const request: any = ds.dbModels.request;
                const request1 = await request.findOne({
                    where: {
                        Professionalid: req.body.professionalid,
                        staterequest: 5
                    }
                });

                console.log("request state 5 " + JSON.stringify(request1));

                //if (request1) return res.status(200).send('Posee un servicio pago, no puede cancelarlo');

                const cancelRequests = await ds.dbClient.query("select Requests.id as RequestId, Professionals.id as profid, Professionals.fcmtoken as proffcmtoken, Professionals.picture as profpicture,Professionals.name as profname, Professionals.surname as profsurname, Users.id as usrid, Users.fcmtoken as usrfcmtoken, Users.picture as usrpicture, Users.name as usrname, Users.surname as usrsurname from Requests inner join Professionals on Professionals.id = Requests.ProfessionalId inner join Users on Users.id = Requests.UserId where Requests.ProfessionalId = " + req.body.professionalid + "  and staterequest in (0,2)", { type: Sequelize.QueryTypes.SELECT });

                for (let cancelRequest in cancelRequests) {
                    // Envio de notificacion push al usuario

                    var serverKey = process.env.USR_SERVER_KEY;

                    console.log("Seteo el token usr" + cancelRequests[cancelRequest].usrfcmtoken);
                    var token = cancelRequests[cancelRequest].usrfcmtoken;
                    var color = "#197476"
                    var strImagen = cancelRequests[cancelRequest].usrpicture;
                    var strUser = cancelRequests[cancelRequest].usrname + " " + cancelRequests[cancelRequest].usrsurname

                    var fcm = new FCM(serverKey);

                    var message = {
                        to: token,
                        notification: {
                            title: "Solicitud cancelada",
                            icon: "icon",
                            color: color
                        },
                        collapse_key: '',
                        data: { // Esto es solo opcional, puede enviar cualquier dato     
                            status: 10,
                            requestID: cancelRequests[cancelRequest].RequestId,
                            title: "Solicitud cancelada",
                            image: strImagen
                        },
                        body: {
                            title: strUser + " - Solicitud cancelada",
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

                const requestUpdate = await request.update({ staterequest: 8, commentprof: 'Cancelado por logout' }, {
                    where: {
                        Professionalid: req.body.professionalid,
                        staterequest: [0, 2]
                    }
                });

                const profesional: any = ds.dbModels.professional;

                const prof1 = await profesional.update({ in_service: false, on_line: false }, {
                    where: { id: req.body.professionalid }
                });

                console.log("request update " + JSON.stringify(requestUpdate));
                console.log("update " + req.body.professionalid);


                res.status(200).json({
                    message: 'Requests Canceladas!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;
