import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/contact')
        .get((req: any, res: any) => res.send('CONTACT GET Req Ok'))
        .post((req: any, res: any) => res.send('CONTACT POST Req Ok'));

    app.route('/testMiddleware')
        .get(
            (req: any, res: any, next: any) => {
                // middleware example that logs request data before moving on to next
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                next();
            },
            (req: any, res: any, next: any) => {
                res.send('GET request successfull AFTER middleware!!!');
            }
        )
        .post((req: any, res: any) => res.send('POST request in middleware!!!'));

    app.route('/testDB')
        .get((req: any, res: any, next: any) => {
            res.send('GET request testDB');
            console.log(ds.testDB());
        })
        .post((req: any, res: any) => res.send('POST request in testDB'));
};

export default router;
