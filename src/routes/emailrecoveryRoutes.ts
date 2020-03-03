import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const { requestValidation } = require('../validation/validation');

const router = (app: any, ds: DataService) => {

    app.route('/request')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({
                        message: 'Get generado JWT',
                        authData
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
                    const usuario: any = ds.dbModels.user;
                    const usermail = await usuario.findOne({
                        where: { email: req.body.email }
                    });

                    if (!usermail) return res.status(400).send('El email no existe en la base de datos');
                    // Enviar el mail con el codigo random para recobarar la contraseña


                }
            });
        });


};
export default router;
