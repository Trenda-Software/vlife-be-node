import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const email = require("../service/email");

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

                const oEmail = new email({
                    "host": "smtp.gmail.com",
                    "port": "465",
                    "secure": true,
                    "auth": {
                        "user": "marianoe@gmail.com",
                        "pass": "maca1309"
                    }
                });
                const n = "Maca";
                let email1 = {
                    from: req.body.email,
                    to: "mescudero@soldoc.com.ar",
                    subject: "Nuevo mensaje de usuario",
                    html: `
                                <div>
                                <p></p>
                                <p>Nombre: ${n}</p>
                                <p>mail: ${req.body.email}</p>
                                <p>Es un mail de prueba</p>
                                </div>
                            `
                };

                oEmail.enviarCorreo(email1);
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
