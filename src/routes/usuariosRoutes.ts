import DataService from '../service/DataService';
import PaisModel from '../db/models/pais';

const router = (app: any, ds: DataService) => {
    app.route('/usuario')
        .get((req: any, res: any) => {
            const usuario: any = ds.dbModels.usuario;
            usuario.findAll({ include: [ds.dbModels.pais, ds.dbModels.provincia] }).then((usuarios: any[]) => {
                res.send(usuarios);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
