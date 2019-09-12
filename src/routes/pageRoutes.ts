import DataService from '../service/DataService';

const pageRoutes = (app: any, ds: DataService) => {
    app.route('/:site/page')
        .get(async (req: any, res: any) => {
            // console.log(req.params);
            const pages = await ds.getPages(req.params.site);
            console.log('route pages: ', pages);

            res.send(pages);
        })
        .post(async (req: any, res: any) => res.send('page POST Req Ok'));

    app.route('/:site/page/:pageId')
        .get(async (req: any, res: any) => res.send('page ID GET Req Ok'))
        .put(async (req: any, res: any) => res.send('page ID PUT Req Ok'))
        .delete(async (req: any, res: any) => res.send('page ID DELETE Req Ok'));
};

export default pageRoutes;
