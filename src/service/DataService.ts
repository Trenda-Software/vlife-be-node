const mysql = require('mysql2');

import { DBModelsI } from '../types/types.js';
import Country from '../db/models/Country';
import Province from '../db/models/Province';
import Specialty from '../db/models/Specialty';
import Professional from '../db/models/Professional';
import Practice from '../db/models/Practice';
import User from '../db/models/User';
import Comment from '../db/models/Comment';
import Request from '../db/models/Request';
import ImgPrescription from '../db/models/ImgPrescription';
import Gender from '../db/models/Gender';
const { Sequelize } = require('sequelize');

export default class DataService {
    dbConfig: any = null;
    dbClient: any = null;
    dbModels: DBModelsI = {
        user: null,
        country: null,
        province: null,
        specialty: null,
        professional: null,
        practice: null,
        comment: null,
        request: null,
        ImgPrescription: null,
        gender: null,
    };

    constructor(dbConfig: any) {
        this.dbConfig = dbConfig;
    }

    async testMySQL() {
        console.log('Testing query to mysql');
        const sql = 'SELECT * FROM Provincias;';
        const connection = mysql.createConnection(this.dbConfig);

        connection.connect((err: any) => {
            if (err) throw err;
            console.time('MYSQL TIMING');

            connection.query(sql, (err: any, results: any, fields: any) => {
                console.log(`##### TESTING MYSQL results #####`, results); // results contains rows returned by server
                // console.log(fields); // fields contains extra meta data about results, if available
                connection.close();
            });
        });
    }

    async connect() {
        await this.connectWithSequelize();

        console.log('Im connected. Creating models');
        await this.initDBModels();
        console.log('Models created');

        console.log('Re-Loading DB');
        await this.initDBData();
        console.log('Init Data re-loaded');
    }

    async resetInitialData() {
        await this.dbClient.sync({ force: true });
    }

    async initDBData() {
        // drops and re-create tables
        await this.resetInitialData();

        const ProfessionalModel: any = this.dbClient.models.Professional;
        const SpecialtyModel: any = this.dbClient.models.Specialty;
        const UserModel: any = this.dbClient.models.User;
        const ProvinceModel: any = this.dbClient.models.Province;
        const CountryModel: any = this.dbClient.models.Country;
        const PracticeModel: any = this.dbClient.models.Practice;
        const CommentModel: any = this.dbClient.models.Comment;
        const RequestModel: any = this.dbClient.models.Request;
        const ImgPrescriptionModel: any = this.dbClient.models.ImgPrescription;
        const GenderModel: any = this.dbClient.models.Gender;

        const province1 = await ProvinceModel.create({ code: 'BSAS', name: 'Buenos Aires' });
        const country1 = await CountryModel.create({ code: 'ARG', name: 'Argentina' });
        await province1.setCountry(country1);

        const gender1 = await GenderModel.create({ code: 'FEM', name: 'Femenino' });
        const gender2 = await GenderModel.create({ code: 'MAS', name: 'Masculino' });
        const gender3 = await GenderModel.create({ code: 'IND', name: 'Indistinto' });

        const user1 = await UserModel.create({
            dni: 24111222,
            name: 'Javier',
            surname: 'Hack',
            pwd: 'javi1234',
            email: 'javierhack@gmail.com',
            mobile: '1122101000',
        });
        await user1.setCountry(country1);
        await user1.setProvince(province1);
        await user1.setGender(gender2);

        const user2 = await UserModel.create({
            dni: 24222111,
            name: 'Mariano',
            surname: 'Escudero',
            pwd: '$2a$10$2L0ZZ1D9glTYwSX/Zff..uPUhk/3XPak6/N8arA5Fk.E7FrNT7HHq',
            email: 'marianoe@gmail.com',
            lat: '-27.320505',
            lng: '+49.14995',
            mobile: '1122711000',
        });
        console.log('le puse la y lng al user ' + user2);
        await user2.setCountry(country1);
        await user2.setProvince(province1);
        await user2.setGender(gender2);

        const professional1 = await ProfessionalModel.create({
            name: 'Javier',
            surname: 'Doctoret',
            picture:
                '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',
            in_service: false,
            on_line: true,
            fcmtoken:
                'f6W0m89DGKs:APA91bFd_msCXCwprUP_1IprfyRMiVJs6ymG0UBszGMuSHtY3PsiobkT0JD1JBAMS9prtqqCZ892pXBh6Lm7g5LSRBqcQnp1QRiJvkciuYROAG_5BDGtXLFWInZnYcGH_PvOixthM9Nx',
        });
        await professional1.setCountry(country1);
        await professional1.setProvince(province1);
        const professional2 = await ProfessionalModel.create({
            name: 'Pedro',
            surname: 'Del Medico',
            in_service: false,
            on_line: true,
            fcmtoken:
                'f6W0m89DGKs:APA91bFd_msCXCwprUP_1IprfyRMiVJs6ymG0UBszGMuSHtY3PsiobkT0JD1JBAMS9prtqqCZ892pXBh6Lm7g5LSRBqcQnp1QRiJvkciuYROAG_5BDGtXLFWInZnYcGH_PvOixthM9Nx',
        });
        await professional2.setCountry(country1);
        await professional2.setProvince(province1);
        const professional3 = await ProfessionalModel.create({
            name: 'Pablo',
            surname: 'Del Hopitalet',
            in_service: false,
            on_line: true,
            fcmtoken:
                'f6W0m89DGKs:APA91bFd_msCXCwprUP_1IprfyRMiVJs6ymG0UBszGMuSHtY3PsiobkT0JD1JBAMS9prtqqCZ892pXBh6Lm7g5LSRBqcQnp1QRiJvkciuYROAG_5BDGtXLFWInZnYcGH_PvOixthM9Nx',
        });
        await professional3.setCountry(country1);
        await professional3.setProvince(province1);
        const professional4 = await ProfessionalModel.create({
            name: 'Juan',
            surname: 'Camillet',
            in_service: false,
            on_line: true,
            fcmtoken:
                'f6W0m89DGKs:APA91bFd_msCXCwprUP_1IprfyRMiVJs6ymG0UBszGMuSHtY3PsiobkT0JD1JBAMS9prtqqCZ892pXBh6Lm7g5LSRBqcQnp1QRiJvkciuYROAG_5BDGtXLFWInZnYcGH_PvOixthM9Nx',
        });
        await professional4.setCountry(country1);
        await professional4.setProvince(province1);
        const professional5 = await ProfessionalModel.create({
            name: 'Maria',
            surname: 'DeGuardia',
            in_service: false,
            on_line: true,
            fcmtoken:
                'f6W0m89DGKs:APA91bFd_msCXCwprUP_1IprfyRMiVJs6ymG0UBszGMuSHtY3PsiobkT0JD1JBAMS9prtqqCZ892pXBh6Lm7g5LSRBqcQnp1QRiJvkciuYROAG_5BDGtXLFWInZnYcGH_PvOixthM9Nx',
        });
        await professional5.setCountry(country1);
        await professional5.setProvince(province1);

        const comment1 = await CommentModel.create({ comment: 'Excelente atencion, muy recomendable', like: '4' });
        comment1.setUser(user1);
        comment1.setProfessional(professional1);
        const comment2 = await CommentModel.create({ comment: 'bien la atencion, lastima que llego tarde', like: 2 });
        comment2.setUser(user2);
        comment2.setProfessional(professional3);
        const comment3 = await CommentModel.create({ comment: 'bien la atencion, lastima que llego tarde', like: 2 });
        comment3.setUser(user2);
        comment3.setProfessional(professional1);

        const kinesio = await SpecialtyModel.create({ name: 'Kinesiologia', code: 'kinesio' });
        const radio = await SpecialtyModel.create({ name: 'Radioterapia', code: 'radio' });
        const enfer = await SpecialtyModel.create({ name: 'Enfermeria', code: 'enferm' });

        await kinesio.addProfessionals([professional1, professional2, professional3]);
        await radio.addProfessionals([professional1, professional4]);
        await enfer.addProfessionals([professional2, professional4]);

        const kinesioResults = await SpecialtyModel.findOne({
            where: { code: 'kinesio' },
            include: ProfessionalModel,
        });
        console.log('Kinesio Professional QTY:' + kinesioResults.Professionals.length);
        kinesioResults.Professionals.forEach((specialty: any) => {
            console.log(`Kinesio Professional - ID: ${specialty.dataValues.id} NAME: ${specialty.dataValues.name}`);
        });

        const radioResults = await SpecialtyModel.findOne({
            where: { code: 'radio' },
            include: ProfessionalModel,
        });
        console.log('Radio Professional QTY:' + radioResults.Professionals.length);
        radioResults.Professionals.forEach((specialty: any) => {
            console.log(`adio Professional - ID: ${specialty.dataValues.id} NAME: ${specialty.dataValues.name}`);
        });

        const practice1 = await PracticeModel.create({
            name: 'Cambio de Bolsa de colosiomia',
            code: 'CBC',
            cost: '600',
            aditional_info: true,
        });
        const practice2 = await PracticeModel.create({
            name: 'Inyeccion Intramuscular',
            code: 'IIM',
            cost: '300',
            aditional_info: true,
        });
        const practice3 = await PracticeModel.create({
            name: 'Higiene de Paciente',
            code: 'HIP',
            cost: '200',
            aditional_info: false,
        });
        await practice1.setSpecialty(enfer);
        await practice2.setSpecialty(enfer);
        await practice3.setSpecialty(enfer);
        console.log('Es el ultimo commit');
    }

    connectWithSequelize = async () => {
        console.log('connectWithSequelize');

        const sequelize = new Sequelize(this.dbConfig.database, this.dbConfig.user, this.dbConfig.password, {
            host: this.dbConfig.host,
            dialect: 'mysql',
        });

        try {
            await sequelize.authenticate();
            this.dbClient = sequelize;
            console.log('Connection to database has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    };

    initDBModels = async () => {
        // creates models and initializes them

        // const usuarioModel = UsuarioModel(this.dbClient);
        const CountryModel: any = Country(this.dbClient);
        const ProvinceModel: any = Province(this.dbClient);
        const SpecialtyModel: any = Specialty(this.dbClient);
        const ProfessionalModel: any = Professional(this.dbClient);
        const PracticeModel: any = Practice(this.dbClient);
        const UserModel: any = User(this.dbClient);
        const CommentModel: any = Comment(this.dbClient);
        const RequestModel: any = Request(this.dbClient);
        const ImgPrescriptionModel: any = ImgPrescription(this.dbClient);
        const GenderModel: any = Gender(this.dbClient);

        // associations
        ProfessionalModel.belongsToMany(SpecialtyModel, { through: 'Specialties_Professionals' });
        ProfessionalModel.belongsTo(CountryModel);
        ProfessionalModel.belongsTo(ProvinceModel);

        SpecialtyModel.belongsToMany(ProfessionalModel, { through: 'Specialties_Professionals' });
        SpecialtyModel.hasMany(PracticeModel);

        ProvinceModel.belongsTo(CountryModel);

        PracticeModel.belongsTo(SpecialtyModel);

        UserModel.belongsTo(CountryModel);
        UserModel.belongsTo(ProvinceModel);
        UserModel.belongsTo(GenderModel);

        CommentModel.belongsTo(UserModel);
        CommentModel.belongsTo(ProfessionalModel);

        RequestModel.belongsToMany(SpecialtyModel, { through: 'Requests_Specialties' });
        RequestModel.belongsTo(UserModel);
        RequestModel.belongsTo(ProfessionalModel);

        ImgPrescriptionModel.belongsTo(RequestModel);

        this.dbModels.user = UserModel;
        this.dbModels.country = CountryModel;
        this.dbModels.practice = PracticeModel;
        this.dbModels.province = ProvinceModel;
        this.dbModels.specialty = SpecialtyModel;
        this.dbModels.professional = ProfessionalModel;
        this.dbModels.comment = CommentModel;
        this.dbModels.request = RequestModel;
        this.dbModels.ImgPrescription = ImgPrescriptionModel;
        this.dbModels.gender = GenderModel;
    };
}
