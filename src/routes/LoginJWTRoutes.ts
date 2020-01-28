import DataService from '../service/DataService';
import { any } from 'bluebird';
const jwt = require('jsonwebtoken');


const router = (app: any, ds: DataService) => {

    app.route('/LoginJWT')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, 'secretkey', (err: any, authData: any) => {
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
        .post((req: any, res: any) => {
            //res.status(201);
            //res.send('POST LoginJWT OK');
            //res.json({ message: 'Post LoginJWT Hola MACA' });
            const user = {
                id: 1,
                username: 'marianoe@gmail.com',
                pass: '1234'
            }
            /*
                Esta es la manera de firmam poniendo un tiempo de expiracion al token, 
                por ahora no lo voy a usar
                jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err: any, token: any) => {
            */
            jwt.sign({ user }, 'secretkey', (err: any, token: any) => {
                res.json({
                    token
                });
            });
        });

};

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
export default router;
