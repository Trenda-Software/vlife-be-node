import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get(async (req: any, res: any) => {
            const SpecialtyModel: any = ds.dbModels.specialty;

            const specialties = await SpecialtyModel.findAll();

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
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
