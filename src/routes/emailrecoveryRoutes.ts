import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


// para el nodemailer
// const email = require("../service/email");
//Para el AWS SES
const nodemailerSES = require("nodemailer");
const AWS = require("aws-sdk");
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
                const usermail = await usuario.findOne({
                    where: { email: req.body.email }
                });

                if (!usermail) return res.status(400).send('El email no existe en la base de datos');
                // Enviar el mail con el codigo random para recobarar la contraseña  

                /* Parametros Para el mail con gmail
                const oEmail = new email({
                    "host": process.env.EMAIL_HOST,
                    "port": process.env.EMAIL_PORT,
                    "secure": process.env.EMAIL_SECURE,
                    "auth": {
                        "user": process.env.EMAIL_USER,
                        "pass": process.env.EMAIL_PASS
                    }
                });
                */
                // Parametros Para el mail con AWS SES
                AWS.config.update({
                    accessKeyId: process.env.AWS_ACCESSKEYID,
                    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
                    region: process.env.AWS_REGION

                });
                console.log("Creo el transporte");

                let transporter = nodemailerSES.createTransport({
                    SES: new AWS.SES({
                        apiVersion: '2010-12-01'
                    })
                });

                const n = "1234";
                let email1 = {
                    from: "service@vlife.com",
                    to: "mescudero@soldoc.com.ar",
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
                });

                res.status(200).json({
                    message: 'Correo Enviado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.json({ message: err });
            }
        });


};
export default router;
