import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const router = (app: any, ds: DataService) => {
    app.route('/comentario')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const CommentModel: any = ds.dbModels.comment;
                    console.log("id " + req.query.id);
                    const comentario = await CommentModel.findOne({
                        where: { ProfessionalId: req.query.id }
                    });
                    console.log(comentario);
                    if (!comentario) return res.status(400).send('No existen comentarios para el profesional solicitado');
                    res.status(200).send(comentario);

                }
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('User POST Req Ok');
        });
};

export default router;
