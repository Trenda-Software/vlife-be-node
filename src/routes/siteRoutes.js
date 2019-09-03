const router = app => {
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

  app
    .route('/testMiddleware')
    .get(
      (req, res, next) => {
        // middleware example that logs request data before moving on to next
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      (req, res, next) => {
        res.send('GET request successfull AFTER middleware!!!');
      },
    )
    .post((req, res) => res.send('POST request in middleware!!!'));

  app
    .route('/testDB')
    .get((req, res, next) => {
      res.send('GET request testDB');
    })
    .post((req, res) => res.send('POST request in testDB'));
};

module.exports = router;
