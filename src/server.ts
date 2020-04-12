import express from 'express';
import userRoutes from './routes/userRoutes';
import provinceRoutes from './routes/provinceRoutes';
import countryRoutes from './routes/countryRoutes';
import practiceRoutes from './routes/practiceRoutes';
import especialidadRoutes from './routes/especialidadRoutes';
import LoginJWTRoutes from './routes/LoginJWTRoutes';
import RegisterJWTRoutes from './routes/RegisterJWTRoutes';
import professionalRoutes from './routes/professionalRoutes';
import commentRouters from './routes/commentRoutes';
import requestRouters from './routes/requestRoutes';
import genderRouters from './routes/genderRoutes';
import specialtyRouters from './routes/specialtyRoutes';
import emailrecoveryRouters from './routes/emailrecoveryRoutes';
import fcmTokenRoutes from './routes/fcmTokenRoutes';
import usrGeolocRouters from './routes/usrGeolocRoutes';
import setProffcmTokenRoutes from './routes/setProffcmTokenRoutes';
import responsepatientRoutes from './routes/responsepatientRoutes';
import terminarservRoutes from './routes/terminarservRoutes';
import cancelservRoutes from './routes/cancelservRoutes';
import getNotificationByIdRoutes from './routes/getNotificationByIdRoutes';
import profGeolocRoutes from './routes/profGeolocRoutes';
import RegisterProfJWTRoutes from './routes/RegisterProfJWTRoutes';
import confirmpaymentRoutes from './routes/confirmpaymentRoutes';
import setProfonlineRoutes from './routes/setProfonlineRoutes';
import getpracticesRoute from './routes/getpracticesRoute';
import LoginprofJWTRoutes from './routes/LoginprofJWTRoutes';




import DataService from './service/DataService';

// import cors from 'cors';
//Ojo con las mayusculas y minusculas

const app = express();
//const bodyParser = require('body-parser');

if (app.get('env') == 'development') {
    require('dotenv').config();
}

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
};

const PORT = process.env.PORT || 3000;
// console.log('############# dbConfig: ', dbConfig);

const ds = new DataService(dbConfig);

ds.connect();

console.log('############# Adding routes');

//Middleware
app.use(express.json({ limit: '5mb' }));
//app.use(bodyParser.json({ limit: '10mb' }));
//app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use("img/users", express.static(__dirname + "img/users"));

// add routes
userRoutes(app, ds);
countryRoutes(app, ds);
provinceRoutes(app, ds);
especialidadRoutes(app, ds);
practiceRoutes(app, ds);
LoginJWTRoutes(app, ds);
RegisterJWTRoutes(app, ds);
professionalRoutes(app, ds);
commentRouters(app, ds);
requestRouters(app, ds);
genderRouters(app, ds);
specialtyRouters(app, ds);
emailrecoveryRouters(app, ds);
fcmTokenRoutes(app, ds);
usrGeolocRouters(app, ds);
setProffcmTokenRoutes(app, ds);
responsepatientRoutes(app, ds);
terminarservRoutes(app, ds);
getNotificationByIdRoutes(app, ds);
profGeolocRoutes(app, ds);
RegisterProfJWTRoutes(app, ds);
cancelservRoutes(app, ds);
confirmpaymentRoutes(app, ds);
setProfonlineRoutes(app, ds);
getpracticesRoute(app, ds);
LoginprofJWTRoutes(app, ds);



app.get('/', (req: any, res: any) => res.send(`VLife API on PORT: ${PORT} hello javi 20200120`));
app.post('/post', (req: any, res: any) => res.send(`VLife API on PORT: ${PORT} hello Maca en el Post 20200127`));
// app.use(function(req, res, next) {
//   console.log(`${req.method} request for '${req.url}`);
//   next();
// });

// apply CORS middleware to allow requests from any domain
// app.use(cors());

// // serve static files for test environment
// app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(
        `VLife server app running in: http://localhost:${PORT} in the ${process.env.ENVIRONMENT} env WITH Typescript!!!`
    );
});

export default app;
