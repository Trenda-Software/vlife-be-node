const routes = app => {
  app
    .route('/contact')
    .get((req, res) => res.send('CONTACT GET Req Ok'))
    .post((req, res) => res.send('CONTACT POST Req Ok'));

  app
    .route('/unit')
    .get((req, res) => res.send('UNIT GET Req Ok'))
    .post((req, res) => res.send('UNIT POST Req Ok'));

  app
    .route('/unit:unitId')
    .get((req, res) => res.send('UNIT ID GET Req Ok'))
    .put((req, res) => res.send('UNIT ID PUT Req Ok'))
    .delete((req, res) => res.send('UNIT ID DELETE Req Ok'));
};

export default routes;
