import DataService from '../service/DataService';
const ds = new DataService();

const router = (app: any) => {
    app.route('/contact')
        .get((req: any, res: any) => res.send('CONTACT GET Req Ok'))
        .post((req: any, res: any) => res.send('CONTACT POST Req Ok'));

    app.route('/page')
        .get((req: any, res: any) => res.send('page GET Req Ok'))
        .post((req: any, res: any) => res.send('page POST Req Ok'));

    app.route('/page:pageId')
        .get((req: any, res: any) => res.send('page ID GET Req Ok'))
        .put((req: any, res: any) => res.send('page ID PUT Req Ok'))
        .delete((req: any, res: any) => res.send('page ID DELETE Req Ok'));

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

module.exports = router;
