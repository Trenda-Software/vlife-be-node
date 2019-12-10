// import UsuarioService from '../service/UsuarioService';
// import config from '../db/config/config.json';
const Usuario = require('../db/models/usuario');
// import models from '../db/models';

const router = (app: any, sequelizeClient: any) => {
    app.route('/usuario')
        .get((req: any, res: any) => {
            const usuario: any = Usuario(sequelizeClient);

            // const service = UsuarioService(sequelizeClient);
            // const Usuario = models['Usuario'];
            usuario.findAll().then((usuarios: any[]) => {
                // projects will be an array of all Project instances
                res.send(usuarios);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
