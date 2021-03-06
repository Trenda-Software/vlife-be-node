import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';

const nodemailerSES = require("nodemailer");

//const AWS = require("aws-sdk");
const router = (app: any, ds: DataService) => {

    app.route('/sendRecoveryCode')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                //Genero el codigo de 5 digitos para el mail

                const n = Math.floor(Math.random() * 90000) + 10000;
                console.log("codigo de recupero " + n);
                if (req.body.prof) {
                    const profesional: any = ds.dbModels.professional;
                    const profMail = await profesional.findOne({
                        where: { email: req.body.email }
                    });
                    if (!profMail) return res.status(200).json({ message: false });

                    const profUpdate = await profesional.update({ recoverycode: n, updateAt: Date.now() }, {
                        where: { email: req.body.email }
                    });

                } else {
                    const usuario: any = ds.dbModels.user;
                    const userMail = await usuario.findOne({
                        where: { email: req.body.email }
                    });
                    if (!userMail) return res.status(200).json({ message: false });
                    const usrUpdate = await usuario.update({ recoverycode: n, updateAt: Date.now() }, {
                        where: { email: req.body.email }
                    });
                }

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

                let email1 = {
                    from: process.env.EMAIL_DIRSEND,
                    to: req.body.email,
                    subject: "Recupero de contraseña",
                    html: `
                                        <div>
                                        <p>Ingrese el siguiente codigo en la App Vlife para recuperar la contraseña</p>
                                        <p>Codigo: ${n}</p>
                                        <p>Tiene una validez de 24 hs</p>
                                        
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
                    message: true
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.json({ message: JSON.stringify(err) });
            }


        });


};
export default router;
