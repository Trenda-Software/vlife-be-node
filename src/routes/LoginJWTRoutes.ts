import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//import UsuarioModel from '../db/models/User';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const bcrypt = require('bcryptjs');

const { loginValidation, registerValidation } = require('../validation/validation');

const router = (app: any, ds: DataService) => {

    app.route('/LoginJWT')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({
                        message: 'Get generado JWT'
                        //authData
                    });
                }
            });
            // res.status(201);
            //res.send('Get LoginJWT ok');
        })
        .post(async (req: any, res: any) => {
            // Lets validate data 
            //const { error } = Joi.validate(req.body, schema);
            const { error } = loginValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            //checking if the email exist

            const Province: any = ds.dbModels.province;
            const Country: any = ds.dbModels.country;
            const Gender: any = ds.dbModels.gender;
            const usuario: any = ds.dbModels.user;
            const usermail = await usuario.findOne({
                //include: [Province, Country, Gender],
                where: { email: req.body.email }
            });

            if (!usermail) return res.status(400).send('El usuario y/o clave son incorrectos');

            //Hash password
            /*
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(req.body.pwd, salt);

            console.log(hashedPassword);
            */

            const userpwd = await usuario.findOne({
                where: { pwd: req.body.pwd }
            });
            if (!userpwd) return res.status(400).send('El usuario y/o clave son incorrectos');

            /*
            const validPWD = await bcrypt.compare("maca1234", userpwd.pwd.trim());
            console.log("Body pwd : " + req.body.pwd + "FIN");
            console.log("Base pwd : " + userpwd.pwd.trim() + "FIN");
            console.log(validPWD);

            if (!validPWD) return res.status(400).send('Clave invalida');
            */
            const hisGender = await usermail.getGender();
            console.log("gender:", hisGender.name);

            const user = {
                id: usermail.id,
                name: usermail.name,
                surname: usermail.surname,
                dni: usermail.dni,
                email: usermail.email,
                mobile: usermail.mobile,
                gender: hisGender.name
            }
            /*
                Esta es la manera de firmam poniendo un tiempo de expiracion al token, 
                por ahora no lo voy a usar
                jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err: any, token: any) => {
            */
            jwt.sign({ user }, process.env.JWT_SECRETKEY, (err: any, token: any) => {
                res.status(200).json({
                    token,
                    user
                });
            });

        });


};
/*
// Format Token
// Autorization: 1 <access_token>


function verifytoken(req: any, res: any, next: any) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
*/
export default router;
