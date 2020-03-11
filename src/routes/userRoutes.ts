import DataService from '../service/DataService';
var fs = require('fs');

const router = (app: any, ds: DataService) => {
    app.route('/usuario')
        .get((req: any, res: any) => {
            const UserModel: any = ds.dbModels.user;

            const Province: any = ds.dbModels.province;
            const Country: any = ds.dbModels.country;
            const Gender: any = ds.dbModels.gender;

            UserModel.findAll({
                include: [Province, Country, Gender],
            }).then((users: any[]) => {
                var filename = "/img/users/3.png"
                var binaryData = fs.readFileSync(filename);
                var base64String = Buffer.from(binaryData).toString("base64");
                console.log(base64String);
                res.send(users);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('User POST Req Ok');
        });
};

export default router;
