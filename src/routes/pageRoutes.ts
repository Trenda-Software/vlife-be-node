import DataService from '../service/DataService';

const pageRoutes = (app: any, ds: DataService) => {
    app.route('/:site/page')
        .get(async (req: any, res: any) => {
            // const pages = await ds.getPages(req.params.site);
            res.send('');
        })
        .post(async (req: any, res: any) => res.send('page POST Req Ok'));

    app.route('/:site/page/:pageId')
        .get(async (req: any, res: any) => res.send('page ID GET Req Ok'))
        .put(async (req: any, res: any) => res.send('page ID PUT Req Ok'))
        .delete(async (req: any, res: any) => res.send('page ID DELETE Req Ok'));
};

export default pageRoutes;
