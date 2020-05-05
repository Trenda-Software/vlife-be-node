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
                    var sqlQuery = "select Requests.Id as requestId, Users.id as patientId, Users.name as userName, Users.surname as userSurname,Users.Picture as userPicture,Users.lat as userLat, Users.lng as userLng, Users.mobile as userMobile, Professionals.id as professionalId,Professionals.name as professionalName,Professionals.surname as professionalSurname, Professionals.mobile as professionalMobile, Professionals.picture as professionalPicture, Requests.preferenceid, Requests.staterequest as status from Requests inner join Users on Requests.UserId = Users.id inner join Professionals on Professionals.id = Requests.ProfessionalId  where Requests.staterequest in (0,1,2,3,5,6,8,9,10) and (timestampdiff(hour,  Requests.updatedAt,now() ) <= 24) and " + clausula;
                    console.log("sqlQuery " + sqlQuery)
                    console.log("req.query.prof " + req.query.prof);

                    if (req.query.prof == 'true') {
                        console.log("entre al if");
                        clausula = " Requests.ProfessionalId = " + req.query.id
                        sqlQuery = "select Requests.Id as requestId, Users.id as patientId, Users.name as userName, Users.surname as userSurname,Users.Picture as userPicture,Users.lat as userLat, Users.lng as userLng, Users.mobile as userMobile, Professionals.id as professionalId,Professionals.name as professionalName,Professionals.surname as professionalSurname, Professionals.mobile as professionalMobile, Professionals.picture as professionalPicture, Requests.preferenceid, Requests.staterequest as status from Requests inner join Users on Requests.UserId = Users.id inner join Professionals on Professionals.id = Requests.ProfessionalId where Requests.Id = (select max(id) from Requests where Requests.staterequest in (2,5) and " + clausula + " )";
                    }

                    const servicios = await ds.dbClient.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT });

                    if (servicios.length == 0) {
                        //return res.status(200).json(servicios);
                        const serv1 = "";
                    }

                    var activeServiceArray: any = [];

                    for (let servicio in servicios) {
                        const practicas = await ds.dbClient.query("select id, name from Practices where Practices.id in ( select practiceId from Requests_Practices where RequestId = " + servicios[servicio].requestId + " )", { type: Sequelize.QueryTypes.SELECT });

                        const activeService = {
                            requestId: servicios[servicio].requestId,
                            preferenceId: servicios[servicio].preferenceid,
                            patient: {
                                id: servicios[servicio].patientId,
                                name: servicios[servicio].userName,
                                surname: servicios[servicio].userSurname,
                                mobile: servicios[servicio].userMobile,
                                image: servicios[servicio].userPicture,
                                geoloc: {
                                    lat: parseFloat(servicios[servicio].userLat),
                                    lng: parseFloat(servicios[servicio].userLng)
                                }
                            },
                            professional: {
                                id: servicios[servicio].professionalId,
                                name: servicios[servicio].professionalName,
                                surname: servicios[servicio].professionalSurname,
                                mobile: servicios[servicio].professionalMobile,
                                image: servicios[servicio].professionalPicture
                            },
                            status: servicios[servicio].status,
                            practices: practicas
                        }
                        // console.log("activeService " + JSON.stringify(activeService))
                        activeServiceArray.push(activeService)
                    };
                    var lastRequestStatus = ""
                    var response = {};
                    if (req.query.prof == 'true') {
                        // consulto el ultimo servicio 
                        sqlQuery = "select max(id) as id, staterequest from Requests where Requests.staterequest in (3,4,6,7,9,10) and Requests.ProfessionalId = " + req.query.id;
                        const servicios1 = await ds.dbClient.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT });

                        if (servicios1.length == 0) {
                            //return res.status(200).json(servicios);
                            lastRequestStatus = "";
                        } else {
                            lastRequestStatus = servicios1[0].staterequest;
                        }
                        response = {
                            request: activeServiceArray,
                            lastRequestStatus: lastRequestStatus
                        }
                    } else {
                        response = {
                            request: activeServiceArray
                        }
                    }
                    //console.log("ActiveserviceArray " + activeServiceArray)
                    res.send(response)
                }
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('User POST Req Ok');
        });
};

export default router;
