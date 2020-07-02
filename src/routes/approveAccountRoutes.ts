import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
var FCM = require('fcm-push');
const nodemailerSES = require("nodemailer");

const router = (app: any, ds: DataService) => {

    app.route('/approveAccount')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {

                const profesional: any = ds.dbModels.professional;
                const prof = await profesional.findOne({
                    where: { id: req.body.id }
                });

                if (!prof) return res.status(200).json({ value: false, message: 'Ne existe el id' });

                var approved = 1;
                var strApproved = 'rechazada'
                if (req.body.approve) {
                    approved = 2;
                    var strApproved = 'aprobada'
                }
                const profUpd = await profesional.update({ approved: approved }, {
                    where: { id: req.body.id }
                });

                // Envio de notificacion push
                console.log("genero la push");
                //console.log(process.env.PROF_SERVER_KEY);
                var serverKey = process.env.PROF_SERVER_KEY;

                console.log("Server Key " + serverKey);
                var fcm = new FCM(serverKey);
                console.log("Seteo el token " + prof.fcmtoken);
                var token = prof.fcmtoken;
                var color = "#194876";

                var message = {
                    to: token,
                    notification: {
                        title: "Recibiste la respuesta de la aprobación del registro",
                        icon: "icon",
                        color: color
                    },
                    collapse_key: '',
                    data: { // Esto es solo opcional, puede enviar cualquier dato 
                        approved: approved,
                        title: "Recibiste la respuesta de la aprobación del registro",
                    },
                    body: {
                        title: "Su solicitud de registro ha sido " + strApproved,
                        body: "Hola!",
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

                var transporter = nodemailerSES.createTransport({
                    "host": process.env.EMAIL_HOST,
                    "secure": process.env.EMAIL_SECURE,//true, // use SSL
                    "port": process.env.EMAIL_PORT,
                    "auth": {
                        "user": process.env.EMAIL_USER,
                        "pass": process.env.EMAIL_PASS
                    }
                });
                let email1 = {
                    from: process.env.EMAIL_DIRSEND,
                    to: prof.email,
                    subject: "Respuesta de la aprobación del registro",
                    html: `
                                <div>
                                <p>Su solicitud de registro ha sido ${strApproved} </p>
                                <p>Si su solicitud fue rechazada envie un mail a info@vlifesalud.com</p>                     
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

                res.status(200).json({
                    value: true, message: 'Operación realizada con exito'
                });
            } catch (err) {
                console.log('paso por el error');

                console.log("error -- " + JSON.stringify(err))
                return res.status(400).json({ value: false, message: JSON.stringify(err) });
            }
        });


};
export default router;
