import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get((req: any, res: any) => {
            const especialidad: any = ds.dbModels.especialidad;

            especialidad.findAll({
                include: [{
                    model: ds.dbModels.profesionalespecialidad,
                    as: 'Profesionales',
                    required: false,
                    attributes: ['nombre'],
                    through: {// This block of code allows you to retrieve the properties of the join table
                        model: ds.dbModels.profesionalespecialidad,
                        as: 'PE',
                        attributes: [],
                    }
                }],
            }).then((results: any) => {
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
