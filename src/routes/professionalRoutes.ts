import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');


const router = (app: any, ds: DataService) => {
    app.route('/profesional')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const ProfessionalModel: any = ds.dbModels.professional;

                    const Province: any = ds.dbModels.province;
                    const Country: any = ds.dbModels.country;

                    ProfessionalModel.findAll({
                        include: [Province, Country],
                    }).then((profesional: any[]) => {
                        //var blob = profesional.picture ;//your blob data;

                        /*var reader = new FileReader();

                        reader.readAsDataURL(buffer.alloc(blob)); 
                        reader.onloadend = function() {
                            var base64data = reader.result;                
                            console.log(base64data);
                            return;
                        }*/
                        //var buffer = new Buffer.from( blob, 'binary' );
                        //var bufferBase64 = buffer.toString('base64');
                        res.send(profesional);
                    });
                }
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('User POST Req Ok');
        });
};

export default router;
