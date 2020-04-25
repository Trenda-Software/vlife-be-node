import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
const { Sequelize } = require('sequelize');


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
        })
        .post(async (req: any, res: any) => {

            const { error } = loginValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);


            const Province: any = ds.dbModels.province;
            const Country: any = ds.dbModels.country;
            const Gender: any = ds.dbModels.gender;
            const profesional: any = ds.dbModels.professional;
            const profMail = await profesional.findOne({
                //include: [Specialties_Professionals],
                where: { email: req.body.email }
            });

            if (!profMail) return res.status(200).send('El usuario y/o clave son incorrectos');

            //Hash password
            /*
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(req.body.pwd, salt);

            console.log(hashedPassword);
            */

            const profPwd = await profesional.findOne({
                where: { pwd: req.body.pwd }
            });
            if (!profPwd) return res.status(400).send('El usuario y/o clave son incorrectos');

            /*
            const validPWD = await bcrypt.compare("maca1234", userpwd.pwd.trim());
            console.log("Body pwd : " + req.body.pwd + "FIN");
            console.log("Base pwd : " + userpwd.pwd.trim() + "FIN");
            console.log(validPWD);

            if (!validPWD) return res.status(400).send('Clave invalida');
            */
            const hisGender = await profMail.getGender();
            console.log("gender:", hisGender.name);

            const SpeID = await ds.dbClient.query("Select * from Specialties_Professionals where ProfessionalId = " + profMail.id, { type: Sequelize.QueryTypes.SELECT });
            console.log("spID " + SpeID[0].SpecialtyId);
            
            const prof = {
                id: profMail.id,
                name: profMail.name,
                surname: profMail.surname,
                dni: profMail.dni,
                email: profMail.email,
                mobile: profMail.mobile,
                gender: hisGender.name,
                address: profMail.address,
                picture: profMail.picture,
                specialtyid: SpeID[0].SpecialtyId
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
