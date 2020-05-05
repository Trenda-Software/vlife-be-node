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

                    try {
                        const VlifeParam: any = ds.dbModels.vlifeparam;
                        const vlifep = await VlifeParam.findAll();

                        const Cryptr = require('cryptr');
                        const cryptr = new Cryptr('goyeneche');

                        const decryptedString = cryptr.decrypt(process.env.GM_API_KEY);

                        console.log("Desencriptada " + decryptedString);

                        const profesional: any = ds.dbModels.professional;

                        const profesional1 = await profesional.findOne({
                            where: { id: req.query.id }
                        });

                        const origenGM = profesional1.lat + "," + profesional1.lng

                        const usuarios = await ds.dbClient.query("Select Requests.id,Requests.commentusr,Users.name,surname,address,lat,lng,mobile,email,dni,picture,Patienttypes.name as PTName, Requests.date from Users inner join Requests on Users.id = Requests.UserId inner join Patienttypes on Requests.Patienttypeid = Patienttypes.id where Requests.staterequest = 0 and Requests.ProfessionalId = " + req.query.id, { type: Sequelize.QueryTypes.SELECT });
                        var solicitud: any = [];
                        //const solicitudes = usuarios.map(async (usuario: any) => {

                        for (let usuario in usuarios) {
                            const destinoGM = usuarios[usuario].lat + "," + usuarios[usuario].lng


                            ///Llamad al APi de Google distance-matrix
                            console.log("voy a hacer el request a Googlemaps");

                            var usrDistancia = "N/D";
                            var usrTiempo = "N/D";

                            const axios = require('axios');

                            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origenGM + '&destinations=' + destinoGM + '&language=es-ES&key=' + decryptedString);
                            // handle success
                            console.log("--------------INICIO get api google---------------");
                            console.log(response.data);
                            console.log("--------------FIN get api google---------------");


                            console.log(response.data.destination_addresses);
                            console.log(response.data.rows[0].elements[0].status);
                            //console.log("Status 1 if " + response.data.rows.status);
                            //if (response.data.rows.status == "OK") {
                            console.log("Entro al 1 if");
                            console.log("Status 2 if " + response.data.rows[0].elements[0].status);
                            if (response.data.rows[0].elements[0].status == "OK") {

                                usrDistancia = response.data.rows[0].elements[0].distance.text;
                                usrTiempo = response.data.rows[0].elements[0].duration.text
                                console.log("distancia " + usrDistancia + "tiempo " + usrTiempo);
                            }
                            //}

                            const practicas = await ds.dbClient.query("select Practices.id,Practices.name as nombre,ImgPrescriptions.picture as imagen from Practices left join ImgPrescriptions on Practices.id = ImgPrescriptions.PracticeId and ImgPrescriptions.RequestId = " + usuarios[usuario].id + " where Practices.id in (select PracticeId from Requests_Practices where RequestId = " + usuarios[usuario].id + ")", { type: Sequelize.QueryTypes.SELECT });

                            var preacticasID = "";

                            practicas.forEach((practica: any) => {
                                preacticasID = preacticasID + "PracticeId = " + practica.id + " or "
                            });

                            preacticasID = preacticasID.slice(0, -4);



                            const servicios = await ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, comvlife, picture from PracticeCosts  inner join Professionals on Professionalid = Professionals.id where (" + preacticasID + ") and ProfessionalId = " + req.query.id + " group by Professionalid", { type: Sequelize.QueryTypes.SELECT });

                            var servCost: any = "";

                            var comvlife: any = "";

                            servicios.forEach((servicio: any) => {
                                //servCost = servicio.cost;
                                servCost = parseFloat((Math.round(servicio.cost * 100) / 100).toString()).toFixed(2);
                                comvlife = servicio.comvlife;
                            });

                            var costo = servCost;
                            if (parseInt(usrDistancia.slice(0, -2)) > vlifep[0].distanciaplus) {
                                servCost = costo * vlifep[0].plusxdistancia
                            }



                            var servCostN = parseFloat(servCost);
                            var servCostGan = servCostN * 0.95;
                            console.log("var cost " + servCost);
                            console.log("var costN " + servCostN);
                            console.log("var comvlife " + comvlife);
                            console.log("--------------------");
                            console.log(usuarios[usuario].id);
                            console.log(usuarios[usuario].commentusr);
                            console.log((parseFloat(servCost) * 0.95))
                            console.log("servicios " + JSON.stringify(servicios));
                            console.log("--------------------");
                            Math.round(servCostN * 100) / 100
                            const sol = {
                                id: usuarios[usuario].id,
                                pacientinfo: {
                                    nombre: usuarios[usuario].name,
                                    apellido: usuarios[usuario].surname,
                                    direccion: usuarios[usuario].address,
                                    mobile: usuarios[usuario].mobile,
                                    geoloc: {
                                        lat: usuarios[usuario].lat,
                                        lng: usuarios[usuario].lng,
                                    },
                                    //telefono: usuario.mobile,
                                    dni: usuarios[usuario].dni,
                                    userpicture: usuarios[usuario].picture,
                                },
                                requestinfo: {
                                    practicas: practicas,
                                    //recetas: imgPrescriptionurl,
                                    comentario: usuarios[usuario].commentusr,
                                    valortotal: servCost,
                                    distancek: usrDistancia,
                                    distancetiempo: usrTiempo,
                                    ganancia: parseFloat((Math.round((servCost * comvlife) * 100) / 100).toString()).toFixed(2),
                                    typo_paciente: usuarios[usuario].PTName,
                                    daterequest: usuarios[usuario].date,
                                }
                            };

                            console.log("Sol1: " + JSON.stringify(sol));

                            solicitud.push(sol);


                        };
                        console.log("solicitud Maca " + JSON.stringify(solicitud));

                        res.send(solicitud)
                    }
                    catch (err) {
                        console.log("error " + err);
                        return res.json({ message: err });
                    }
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

