import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//import UsuarioModel from '../db/models/User';

const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const bcrypt = require('bcryptjs');

const { loginValidation, registerValidation } = require('../validation/validation');

const router = (app: any, ds: DataService) => {

    app.route('/LoginprofJWT')
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
            const profesional: any = ds.dbModels.professional;
            const profmail = await profesional.findOne({
                //include: [Province, Country, Gender],
                where: { email: req.body.email }
            });

            if (!profmail) return res.status(400).send('El usuario y/o clave son incorrectos');

            //Hash password
            /*
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(req.body.pwd, salt);

            console.log(hashedPassword);
            */

            const profpwd = await profesional.findOne({
                where: { pwd: req.body.pwd }
            });
            if (!profpwd) return res.status(400).send('El usuario y/o clave son incorrectos');

            /*
            const validPWD = await bcrypt.compare("maca1234", userpwd.pwd.trim());
            console.log("Body pwd : " + req.body.pwd + "FIN");
            console.log("Base pwd : " + userpwd.pwd.trim() + "FIN");
            console.log(validPWD);

            if (!validPWD) return res.status(400).send('Clave invalida');
            */
            const hisGender = await profmail.getGender();
            console.log("gender:", hisGender.name);

            const prof = {
                id: profmail.id,
                name: profmail.name,
                surname: profmail.surname,
                dni: profmail.dni,
                email: profmail.email,
                mobile: profmail.mobile,
                gender: hisGender.name,
                address: profmail.address
            }
            /*
                Esta es la manera de firmam poniendo un tiempo de expiracion al token, 
                por ahora no lo voy a usar
                jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err: any, token: any) => {
            */
            jwt.sign({ prof }, process.env.JWT_SECRETKEY, (err: any, token: any) => {
                res.status(200).json({
                    token,
                    prof
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
