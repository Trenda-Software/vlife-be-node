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


                    const Cryptr = require('cryptr');
                    const cryptr = new Cryptr('goyeneche');

                    //const encryptedString = cryptr.encrypt('AIzaSyD4HK2DucBEZplPHjwWAb1ALvuEImprrOw');
                    const decryptedString = cryptr.decrypt(process.env.GM_API_KEY);

                    //console.log("Encriptada " + encryptedString + "FIN");
                    console.log("Desencriptada " + decryptedString);
                    const profesional: any = ds.dbModels.professional;

                    const profesional1 = await profesional.findOne({
                        where: { id: req.query.id }
                    });

                    const origenGM = profesional1.lat + "," + profesional1.lng

                    const usuarios = await ds.dbClient.query("Select Requests.id,Requests.commentusr,Users.name,surname,address,lat,lng,mobile,email,dni,picture,Pacienttypes.name as PTName from Users inner join Requests on Users.id = Requests.UserId inner join Pacienttypes on Requests.Pacienttypeid = Pacienttypes.id where Requests.staterequest = 0 and Requests.ProfessionalId = " + req.query.id, { type: Sequelize.QueryTypes.SELECT });

                    const solicitudes = usuarios.map(async (usuario: any) => {

                        const destinoGM = usuario.lat + "," + usuario.lng

                        ///Llamad al APi de Google distance-matrix
                        console.log("voy a hacer el request a Googlemaps");

                        var usrDistancia = "";
                        var usrTiempo = "";

                        const axios = require('axios');

                        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origenGM + '&destinations=' + destinoGM + '&language=es-ES&key=' + decryptedString);
                        // handle success
                        console.log("--------------INICIO get api google---------------");
                        console.log(response.data);
                        console.log("--------------FIN get api google---------------");


                        console.log(response.data.destination_addresses);
                        console.log(response.data.rows[0].elements[0].status);

                        if (response.data.rows.status = "OK") {

                            usrDistancia = response.data.rows[0].elements[0].distance.text;
                            usrTiempo = response.data.rows[0].elements[0].duration.text
                            console.log("distancia " + usrDistancia + "tiempo " + usrTiempo);
                        }

                        const practicas = await ds.dbClient.query("select Practices.id,Practices.name as nombre,ImgPrescriptions.picture as imagen from Practices left join ImgPrescriptions on Practices.id = ImgPrescriptions.PracticeId and ImgPrescriptions.RequestId = " + usuario.id + " where Practices.id in (select PracticeId from Requests_Practices where RequestId = " + usuario.id + ")", { type: Sequelize.QueryTypes.SELECT });

                        var preacticasID = "";

                        practicas.forEach((practica: any) => {
                            //  practicasNombre.push(practica.name);
                            preacticasID = preacticasID + "PracticeId = " + practica.id + " or "
                        });

                        preacticasID = preacticasID.slice(0, -4);



                        const servicios = await ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where (" + preacticasID + ") and ProfessionalId = " + req.query.id + " ) group by Professionalid", { type: Sequelize.QueryTypes.SELECT });

                        var servCost = "";

                        servicios.forEach((servicio: any) => {
                            //  practicasNombre.push(practica.name);
                            servCost = servicio.cost;
                        });


                        var servCostN = parseFloat(servCost);
                        var servCostGan = servCostN * 0.95;
                        console.log("var cost " + servCost);
                        console.log("var costN " + servCostN);
                        console.log("var costGan " + servCostGan);
                        console.log("--------------------");
                        console.log(usuario.id);
                        console.log(usuario.commentusr);
                        console.log((parseFloat(servCost) * 0.95))
                        console.log("servicios " + JSON.stringify(servicios));
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
                                //telefono: usuario.mobile,
                                dni: usuario.dni,
                                userpicture: usuario.picture,
                            },
                            requestinfo: {
                                practicas: practicas,
                                //recetas: imgPrescriptionurl,
                                comentario: usuario.commentusr,
                                valortotal: servCost,
                                distancek: usrDistancia,
                                distancetiempo: usrTiempo,
                                ganancia: (parseFloat(servCost) * 0.95),
                                typo_paciente: usuario.PTName,
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
                        .catch(reason => {
                            console.log(reason);
                            return res.json({ message: JSON.stringify(reason) });
                        });
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

