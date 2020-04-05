import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const { Sequelize } = require('sequelize');

const router = (app: any, ds: DataService) => {
    app.route('/getpractices')
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

                    const usuarios: any = ds.dbModels.user;

                    const usuario1 = await usuarios.findOne({
                        where: { id: req.query.Userid }
                    });
                    const profesionales: any = ds.dbModels.professional;

                    const profeseional1 = await profesionales.findOne({
                        where: { id: req.query.Professionalid }
                    });

                    const axios = require('axios');

                    const origenGM = profeseional1.lat + "," + profeseional1.lng
                    const destinoGM = usuario1.lat + "," + usuario1.lng


                    var prfDistancia = "";
                    var prfTiempo = "";
                    ///Llamad al APi de Google distance-matrix
                    console.log("voy a hacer el request a Googlemaps");

                    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origenGM + '&destinations=' + destinoGM + '&language=es-ES&key=' + decryptedString);
                    // handle success
                    console.log("--------------INICIO get api google---------------");
                    console.log(response.data);
                    console.log("--------------FIN get api google---------------");


                    console.log(response.data.destination_addresses);
                    console.log(response.data.rows[0].elements[0].status);

                    if (response.data.rows[0].elements[0].status = "OK") {

                        prfDistancia = response.data.rows[0].elements[0].distance.text;
                        prfTiempo = response.data.rows[0].elements[0].duration.text
                        console.log("distancia " + prfDistancia + "tiempo " + prfTiempo);
                    }

                    const practicas = await ds.dbClient.query("select Professionals.id as ProfId,lat,lng,Professionals.name,surname,Practices.id as PracticaId, Practices.name as PracticaName,PracticeCosts.cost as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid inner join Practices on PracticeCosts.PracticeId = Practices.id where Professionals.id in (select Professionalid from PracticeCosts ) and Professionals.id = " + req.query.Professionalid, { type: Sequelize.QueryTypes.SELECT });

                    var practicasArray: any = [];

                    var sol: any = {};


                    const solicitudes = practicas.map(async (practica: any) => {


                        const pract = [practica.PracticaId, practica.PracticaName, practica.cost, prfDistancia, prfTiempo];
                        console.log("practica " + pract);
                        practicasArray.push(pract);

                        console.log("Arrary de precticas " + practicasArray)
                        sol = {
                            Profesional: {
                                ProfID: practica.ProfId,
                                Nombre: practica.name + " " + practica.surname,
                                Apellido: practica.sruname,
                                Imagen: practica.picture
                            },
                            Practicas: practicasArray,
                        }

                        //solicitudes.push(sol);
                        console.log("solicitud: " + JSON.stringify(sol));

                        return practicasArray;

                    });

                    Promise.all(solicitudes)
                        .then(returnedValues => {
                            // console.log('##########  MAP profPerSpecialties values: ', values);
                            console.log("Solicitudes: " + JSON.stringify(returnedValues));
                            res.send(sol);
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
                    const practicas = req.body.practicesid;
                    var clausula = "";
                    for (let practica in practicas) {
                        clausula = clausula + "PracticeID = " + practicas[practica] + " or ";
                    }
                    clausula = clausula.slice(0, -4);
                    console.log("where :" + clausula);

                    ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where " + clausula + " ) group by Professionalid ", { type: Sequelize.QueryTypes.SELECT })
                        .then((profesional: any[]) => {
                            // We don't need spread here, since only the results will be returned for select queries
                            console.log(JSON.stringify(profesional));
                            res.send(profesional);
                        });



                }
            });
        });
};

export default router;
