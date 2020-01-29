import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/practica')
        .get((req: any, res: any) => {
            const PracticeModel: any = ds.dbModels.practice;
            PracticeModel.findAll({
                include: [{ model: ds.dbModels.specialty }],
            }).then((practices: any[]) => {
                res.send(practices);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('Practice POST Req Ok');
        });
};

export default router;
