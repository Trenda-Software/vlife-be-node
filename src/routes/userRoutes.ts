import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/usuario')
        .get((req: any, res: any) => {
            const UserModel: any = ds.dbModels.user;

            const Province: any = ds.dbModels.province;
            const Country: any = ds.dbModels.country;

            UserModel.findAll({
                include: [Province, Country],
            }).then((users: any[]) => {
                res.send(users);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('User POST Req Ok');
        });
};

export default router;
