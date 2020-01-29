import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/country')
        .get((req: any, res: any) => {
            const country: any = ds.dbModels.country;

            country.findAll().then((countries: any[]) => {
                res.send(countries);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
