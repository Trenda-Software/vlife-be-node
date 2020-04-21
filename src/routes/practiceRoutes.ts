import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const { Sequelize } = require('sequelize');

const router = (app: any, ds: DataService) => {
    app.route('/practica')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const PracticeModel: any = ds.dbModels.practice;
                    PracticeModel.findAll({
                        include: [{ model: ds.dbModels.specialty }],
                    }).then((practices: any[]) => {
                        res.send(practices);

                    });
                }
            });

        })
        .post(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {

                    const practicas = req.body.practicesid;
                    var clausula = "";
                    for (let practica in practicas) {
                        clausula = clausula + "PracticeID = " + practicas[practica] + " or ";
                    }
                    clausula = clausula.slice(0, -4);
                    console.log("where :" + clausula);

                    const Cryptr = require('cryptr');
                    const cryptr = new Cryptr('goyeneche');

                    const decryptedString = cryptr.decrypt(process.env.GM_API_KEY);

                    console.log("Desencriptada " + decryptedString);

                    const profesionales: any = ds.dbModels.professional;

                    const origenGM = req.body.coords.lat + "," + req.body.coords.lng
                    var destinoGM = "";
                    var destinoGM1 = "";

                    const practicas1 = await ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, lat,lng, picture from PracticeCosts  inner join Professionals on Professionalid = Professionals.id where " + clausula + " and Professionals.on_line = true  and Professionals.in_service = false and Professionals.id not in (select ProfessionalId from Requests where staterequest = 0 and UserId = " + req.body.userid + " ) group by Professionalid", { type: Sequelize.QueryTypes.SELECT })
                    console.log("Practicas1 " + practicas1.length);
                    if (practicas1.length == 0) {
                        return res.json(practicas1);
                    }

                    const solicitudes = practicas1.map((practica: any, index: any) => {

                        /// ver aca que genera una coma de mas
                        destinoGM1 = practica.lat + "," + practica.lng

                        console.log("destinoGM " + practica.lat + "," + practica.lng);
                        console.log("destinoGM1 " + destinoGM1);
                        return destinoGM1;
                    });

                    Promise.all(solicitudes)
                        .then(async returnedValues => {

                            console.log("SolicitudesGM: " + returnedValues);
                            for (let returnedValue in returnedValues) {
                                destinoGM = destinoGM + returnedValues[returnedValue] + "|";
                            }
                            destinoGM = destinoGM.slice(0, -1);
                            console.log("destinoGM final: " + destinoGM);
                            //Tengo que poner aca adentro la llamada al gogmaps
                            const axios = require('axios');

                            var prfDistancia = "N/D";
                            var prfTiempo = "N/D";
                            ///Llamad al APi de Google distance-matrix
                            console.log("voy a hacer el request a Googlemaps");

                            console.log("GET1 " + 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origenGM + '&destinations=' + destinoGM + '&language=es-ES&key=' + decryptedString);

                            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origenGM + '&destinations=' + destinoGM + '&language=es-ES&key=' + decryptedString);

                            console.log("GET2 " + 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origenGM + '&destinations=' + destinoGM + '&language=es-ES&key=' + decryptedString);

                            // handle success
                            console.log("--------------INICIO get api google---------------");
                            console.log(response.data);
                            console.log("--------------FIN get api google---------------");


                            console.log(response.data.destination_addresses);
                            console.log(response.data.rows[0].elements[0].status);
                            console.log("status 1 " + response.data.rows.status);
                            //if (response.data.rows.status == "OK") {
                            if (response.data.rows[0].elements[0].status == "OK") {
                                prfDistancia = response.data.rows[0].elements[0].distance.text;
                                prfTiempo = response.data.rows[0].elements[0].duration.text
                                console.log("distancia " + prfDistancia + "tiempo " + prfTiempo);
                            }
                            //}

                            //const practicas1 = await ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, lat,lng, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where " + clausula + " ) group by Professionalid ", { type: Sequelize.QueryTypes.SELECT })

                            var practicasArray: any = [];

                            var sol: any = {};


                            const solicitudes1 = practicas1.map((practica: any, index: any) => {
                                var prfDistancia = "N/D";
                                var prfTiempo = "N/D";

                                //if (response.data.rows.status == "OK") {
                                if (response.data.rows[0].elements[index].status == "OK") {
                                    console.log("index " + index)
                                    console.log("elements " + JSON.stringify(response.data.rows[0].elements))
                                    prfDistancia = response.data.rows[0].elements[index].distance.text;
                                    prfTiempo = response.data.rows[0].elements[index].duration.text
                                    console.log("distancia " + prfDistancia + "tiempo " + prfTiempo);
                                }
                                //}
                                const pract = [practica.PracticaId, practica.PracticaName, practica.cost, prfDistancia, prfTiempo];
                                console.log("practica " + pract);
                                practicasArray.push(pract);

                                console.log("Arrary de precticas " + practicasArray)
                                sol = {
                                    id: practica.id,
                                    name: practica.name,
                                    surname: practica.surname,
                                    cost: parseFloat((Math.round(practica.cost * 100) / 100).toString()).toFixed(2),
                                    distance: prfDistancia,
                                    time: prfTiempo,
                                    picture: practica.picture
                                }

                                //solicitudes.push(sol);
                                console.log("solicitud: " + JSON.stringify(sol));

                                return sol;

                            });

                            Promise.all(solicitudes1)
                                .then(returnedValues => {
                                    console.log("Solicitudes: " + JSON.stringify(returnedValues));
                                    res.send(returnedValues);
                                })
                                .catch(reason => {
                                    console.log(reason);
                                    return res.json({ message: JSON.stringify(reason) });
                                });

                        })
                        .catch(reason => {
                            console.log(reason);
                            return res.json({ message: JSON.stringify(reason) });
                        });
                }
            });
        });
};

export default router;
