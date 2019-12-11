import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get((req: any, res: any) => {
            const especialidad: any = ds.dbModels.especialidad;

            especialidad.findAll().then((results: any) => {
                // console.log('especs: ', especs);
                const profPorEspec = results.map((result: any) => {
                    console.log('result: ', result);
                    console.log('result.dataValues: ', result.dataValues);
                    const especialidad = result.dataValues;
                    const especUpdated = { ...especialidad, cantProfesionales: 50 };
                    return especUpdated;
                });

                res.send(profPorEspec);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
