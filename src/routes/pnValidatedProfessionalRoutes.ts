import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
var FCM = require('fcm-push');


const router = (app: any, ds: DataService) => {

    app.route('/pnValidatedProfessional')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {

            try {

                //Consulto datos del profesional
                const profesional: any = ds.dbModels.professional;

                const profesional1 = await profesional.findOne({
                    where: { id: req.body.professionalid }
                });

                if (!profesional1) return res.status(400).send('El Profesional no existe en la base de datos');

                // Envio de notificacion push

                var serverKey = process.env.PROF_SERVER_KEY;
                var token = profesional1.fcmtoken
                const strImagen = profesional1.picture;
                const strProf = profesional1.name + " " + profesional1.surname;

                var fcm = new FCM(serverKey);

                var message = {
                    to: token,
                    notification: {
                        title: "Se recibió la notificación de Aprobación del Profesional",
                        image: strImagen
                    },
                    collapse_key: '',
                    data: { // Esto es solo opcional, puede enviar cualquier dato     
                        title: "Se recibió la notificación de Aprobación del Profesional",
                        image: strImagen
                    },
                    body: {
                        title: strProf + " terminó el servicio",
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

                res.status(200).json({
                    message: 'Notificación enviada correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: err });
            }
        });


};
export default router;
