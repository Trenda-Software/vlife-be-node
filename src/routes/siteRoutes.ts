import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/live')
        .get((req: any, res: any) => res.send('live GET Req Ok'))
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });

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
            ds.testMySQL();
        })
        .post((req: any, res: any) => res.send('POST request in testDB'));
    app.route('/testDBSeq')
        .get((req: any, res: any, next: any) => {
            res.send('GET request testDBSeq');
        })
        .post((req: any, res: any) => res.send('POST request in testDBSeq'));
};

export default router;
