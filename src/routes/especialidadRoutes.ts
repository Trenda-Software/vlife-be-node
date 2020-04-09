import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get(verifytoken, async (req: any, res: any) => {

            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const specialtyModel: any = ds.dbModels.specialty;

                    const specialties = await specialtyModel.findAll();

                    // preparar el resultado
                    const profPerSpecialties = specialties.map(async (specialty: any) => {
                        // console.log('########## Specialty: ', specialty);
                        const professionals = await specialty.getProfessionals();
                        const profPerSpecialty = {
                            name: specialty.name,
                            qty: professionals.length,
                        };
                        // console.log('##########  profs profPerSpecialty: ', profPerSpecialty);
                        return profPerSpecialty;
                    });
                    // console.log('##########  MAP profPerSpecialties: ', profPerSpecialties);

                    Promise.all(profPerSpecialties)
                        .then(returnedValues => {
                            // console.log('##########  MAP profPerSpecialties values: ', values);
                            res.send(returnedValues);
                        })
                        .catch(console.error);

                }
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
