import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get(async (req: any, res: any) => {
            const SpecialtyModel: any = ds.dbModels.specialty;

            const specialties = await SpecialtyModel.findAll();

            // Hasta aqui llegue ... hay que arreglar esto
            const profPerSpecialties = specialties.map((specialty: any) => {
                name: specialty.name;
                qty: specialty.getProfessionals().length;
            });
            res.send(profPerSpecialties);
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
    app.route('/cantPorEspecialidad2')
        .get(async (req: any, res: any) => {
            const especialidad2: any = ds.dbModels.especialidad2;

            const especialidades2 = await especialidad2.findAll();
            res.send(especialidades2);
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
