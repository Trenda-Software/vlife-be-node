import DataService from '../service/DataService';


const router = (app: any, ds: DataService) => {
    app.route('/especialidad')
        .get((req: any, res: any) => {

            const SpecialtyModel: any = ds.dbModels.specialty;
            SpecialtyModel.findAll({
                include: [{ model: ds.dbModels.practice }],
            }).then((specialtys: any[]) => {
                res.send(specialtys);

            });

        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('Specialty POST Req Ok');
        });
};

export default router;
