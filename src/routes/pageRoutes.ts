const pageRoutes = (app:any) => {
  app
    .route('/page')
    .get((req:any, res:any) => res.send('page GET Req Ok'))
    .post((req:any, res:any) => res.send('page POST Req Ok'));

  app
    .route('/page:pageId')
    .get((req:any, res:any) => res.send('page ID GET Req Ok'))
    .put((req:any, res:any) => res.send('page ID PUT Req Ok'))
    .delete((req:any, res:any) => res.send('page ID DELETE Req Ok'));
};

// module.exports = pageRoutes;

export default pageRoutes;
