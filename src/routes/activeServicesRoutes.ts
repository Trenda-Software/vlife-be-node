import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const { Sequelize } = require('sequelize');


const router = (app: any, ds: DataService) => {
    app.route('/activeServices')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {

                    var clausula = " Requests.UserId = " + req.query.id
                    if (req.query.prof) {
                        clausula = " Requests.ProfessionalId = " + req.query.id
                    }

                    const servicios = await ds.dbClient.query("select max(Requests.Id) as requestId, Users.id as patientId, Users.name as userName, Users.surname as userSurname,Professionals.id as professionalId,Professionals.name as professionalName,Professionals.surname as professionalSurname, Requests.staterequest as status from Requests inner join Users on Requests.UserId = Users.id inner join Professionals on Professionals.id = Requests.ProfessionalId where Requests.Id = (select max(id) from Requests where " + clausula + " )", { type: Sequelize.QueryTypes.SELECT });


                    if (servicios.length == 0) {
                        return res.status(400).send('No existe el servicio.');
                    }

                    const practicas = await ds.dbClient.query("select id as practiceId, name as practiceName from Practices where Practices.id in ( select practiceId from Requests_Practices where RequestId = " + servicios[0].requestId + " )", { type: Sequelize.QueryTypes.SELECT });

                    const activeService = {
                        requestId: servicios[0].requestId,
                        patientId: servicios[0].patientId,
                        patientName: servicios[0].userName + " " + servicios[0].userSurname,
                        professioanlId: servicios[0].professionalId,
                        professionalName: servicios[0].professionalName + " " + servicios[0].professionalSurname,
                        status: servicios[0].status,
                        practices: practicas
                    }

                    res.send(activeService)
                }
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('User POST Req Ok');
        });
};

export default router;
