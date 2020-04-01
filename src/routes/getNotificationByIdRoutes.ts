import DataService from '../service/DataService';
import { any } from 'bluebird';
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

                    const solicitudes = usuarios.map(async (usuario: any) => {
                        const practicas = await ds.dbClient.query("select * from practices where id in (select PracticeId from requests_practices where RequestId = " + usuario.id + ")", { type: Sequelize.QueryTypes.SELECT });

                        const imgprescriptions = await ds.dbClient.query("select * from imgprescriptions where RequestId = " + usuario.id, { type: Sequelize.QueryTypes.SELECT });

                        var imgPrescriptionurl: any = [];
                        imgprescriptions.forEach((imgprescription: any) => {
                            imgPrescriptionurl.push(imgprescription.picture);

                        });

                        var practicasNombre: any = [];

                        var preacticasID = "";

                        practicas.forEach((practica: any) => {
                            practicasNombre.push(practica.name);
                            preacticasID = preacticasID + "PracticeId = " + practica.id + " or "
                        });

                        preacticasID = preacticasID.slice(0, -4);

                        console.log("select Professionals.id,name,surname,sum(cost) as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where (" + preacticasID + ") and ProfessionalId = " + req.body.id + " ) group by Professionalid");

                        const servicios = await ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where (" + preacticasID + ") and ProfessionalId = " + req.body.id + " ) group by Professionalid", { type: Sequelize.QueryTypes.SELECT });

                        console.log("--------------------");
                        console.log(usuario.id);
                        console.log(usuario.commentusr);
                        console.log("--------------------");

                        const sol = {
                            id: usuario.id,
                            pacientinfo: {
                                nombre: usuario.name,
                                apellido: usuario.surname,
                                direccion: usuario.address,
                                geoloc: {
                                    lat: usuario.lat,
                                    lng: usuario.lng,
                                },
                                telefono: usuario.mobile,
                                dni: usuario.dni,
                                userpicture: usuario.picture,
                            },
                            requestinfo: {
                                practicas: practicasNombre,
                                recetas: imgPrescriptionurl,
                                comentario: usuario.commentusr,
                                valortotal: servicios.cost,
                                distancek: servicios.distance,
                                distancetiempo: servicios.time,
                            }
                        };



                        //solicitudes.push(sol);
                        console.log("Sol1: " + JSON.stringify(sol));

                        return sol;

                    });

                    Promise.all(solicitudes)
                        .then(returnedValues => {
                            // console.log('##########  MAP profPerSpecialties values: ', values);
                            console.log("Solicitudes: " + JSON.stringify(returnedValues));
                            res.send(returnedValues);
                        })
                        .catch(console.error);
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

