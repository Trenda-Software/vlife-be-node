import DataService from '../service/DataService';

const pageRoutes = (app: any, ds: DataService) => {
    app.route('/page')
        .get((req: any, res: any) => {
            ds.getPages();
            res.send('page GET Req Ok');
        })
        .post((req: any, res: any) => res.send('page POST Req Ok'));

    app.route('/page/:pageId')
        .get((req: any, res: any) => res.send('page ID GET Req Ok'))
        .put((req: any, res: any) => res.send('page ID PUT Req Ok'))
        .delete((req: any, res: any) => res.send('page ID DELETE Req Ok'));
};

export default pageRoutes;
