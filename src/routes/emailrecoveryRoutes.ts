import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';

const nodemailerSES = require("nodemailer");

//const AWS = require("aws-sdk");
const router = (app: any, ds: DataService) => {

    app.route('/passrecovery')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const usuario: any = ds.dbModels.user;
                const userMail = await usuario.findOne({
                    where: { email: req.body.email }
                });

                if (!userMail) return res.status(200).send('El email no existe en la base de datos');
                // Enviar el mail con el codigo random para recobarar la contraseña  

                console.log("Creo el transporte");
                console.log("Maca");

                var transporter = nodemailerSES.createTransport({
                    "host": process.env.EMAIL_HOST,
                    "secure": process.env.EMAIL_SECURE,//true, // use SSL
                    "port": process.env.EMAIL_PORT,//465, // port for secure SMTP
                    "auth": {
                        "user": process.env.EMAIL_USER,
                        "pass": process.env.EMAIL_PASS
                    }
                });
                const n = "1234";
                let email1 = {
                    from: process.env.EMAIL_DIRSEND,
                    to: req.body.email,
                    subject: "Recupero de contraseña",
                    html: `
                                <div>
                                <p>Ingrese el siguiente codigo en la App Vlife para recuperar la contraseña</p>
                                <p>Codigo: ${n}</p>
                                <p></p>
                                <p>Es un mail de prueba</p>
                                </div>
                            `
                };
                console.log("envio el mail");
                transporter.sendMail(email1, (err: any, info: any) => {

                    if (err) {
                        console.log("Error al enviar email - error " + err);
                    } else {
                        console.log("Correo enviado correctamente - info " + info);
                    }
                    transporter.close(); // shut down the connection pool, no more messages
                });

                res.status(200).json({
                    message: 'Correo Enviado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.json({ message: JSON.stringify(err) });
            }
        });


};
export default router;
