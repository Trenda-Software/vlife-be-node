import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const { Sequelize } = require('sequelize');

const router = (app: any, ds: DataService) => {
    app.route('/getNotificationById')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const usuarios = await ds.dbClient.query("Select requests.id,requests.commentusr,name,surname,address,lat,lng,mobile,email,dni,picture from users inner join requests  on users.id = requests.UserId where requests.ProfessionalId = " + req.body.id, { type: Sequelize.QueryTypes.SELECT });
                    //const servicios = await ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where (PracticeId = 1 or PracticeId = 2) and ProfessionalId = " + req.body.id + " ) group by Professionalid", { type: Sequelize.QueryTypes.SELECT });
                    console.log("usuarios " + JSON.stringify(usuarios));
                    //console.log(JSON.stringify("servicios " + servicios));
                    res.send(usuarios);
                }
            });

        })
        .post(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.status(201);
                    res.send('live POST Req Ok');
                }
            });
        });

};
export default router;

