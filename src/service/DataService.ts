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
import PracticeCost from '../db/models/PracticeCost';
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
        practicecost: null,
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
        const PracticeCostModel: any = this.dbClient.models.PracticeCost;

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
            picture:
                'https://vlife-aws-s3-images.s3.amazonaws.com/img/users/1.png',
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
            picture:
                'https://vlife-aws-s3-images.s3.amazonaws.com/img/users/2.png',

        });
        console.log('le puse la y lng al user ' + user2);
        await user2.setCountry(country1);
        await user2.setProvince(province1);
        await user2.setGender(gender2);

        const professional1 = await ProfessionalModel.create({
            name: 'Javier',
            surname: 'Doctoret',
            picture:
                'https://vlife-aws-s3-images.s3.amazonaws.com/img/professionals/1.png',
            in_service: false,
            on_line: true,
            fcmtoken:
                'cX3ay2T6ULY:APA91bEvHiJTRvWWz1K9yrYrqaoZUrJs-3y_G7rqT5aR5oe-OdK-z-qpedNnM-a2a5RrpLhSa0LjEcIVSMqujiDbtdMJrP8kmUZRrVS9c8t-4hxTvEsZ3IW8GqNqPWsZbf3udhBbEFFZ',
        });
        await professional1.setCountry(country1);
        await professional1.setProvince(province1);
        const professional2 = await ProfessionalModel.create({
            name: 'Pedro',
            surname: 'Del Medico',
            picture:
                'https://vlife-aws-s3-images.s3.amazonaws.com/img/professionals/2.png',
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
            picture:
                'https://vlife-aws-s3-images.s3.amazonaws.com/img/professionals/3.png',
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
            picture:
                'https://vlife-aws-s3-images.s3.amazonaws.com/img/professionals/4.png',
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
            picture:
                'https://vlife-aws-s3-images.s3.amazonaws.com/img/professionals/5.png',
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
            additional_info: true,
        });
        const practice2 = await PracticeModel.create({
            name: 'Inyeccion Intramuscular',
            code: 'IIM',
            cost: '300',
            additional_info: true,
        });
        const practice3 = await PracticeModel.create({
            name: 'Higiene de Paciente',
            code: 'HIP',
            cost: '200',
            additional_info: false,
        });
        await practice1.setSpecialty(enfer);
        await practice2.setSpecialty(enfer);
        await practice3.setSpecialty(enfer);

        const PracticeCost1 = await PracticeCostModel.create({
            cost: '600',
        });
        await PracticeCost1.setProfessional(professional2);
        await PracticeCost1.setPractice(practice1);

        const PracticeCost2 = await PracticeCostModel.create({
            cost: '300',
        });
        await PracticeCost2.setProfessional(professional4);
        await PracticeCost2.setPractice(practice2);
        const PracticeCost3 = await PracticeCostModel.create({
            cost: '200',
        });
        await PracticeCost3.setProfessional(professional4);
        await PracticeCost3.setPractice(practice3);
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
        const PracticeCostModel: any = PracticeCost(this.dbClient);

        // associations
        ProfessionalModel.belongsToMany(SpecialtyModel, { through: 'Specialties_Professionals' });
        ProfessionalModel.belongsTo(CountryModel);
        ProfessionalModel.belongsTo(ProvinceModel);
        ProfessionalModel.hasMany(PracticeCostModel);


        SpecialtyModel.belongsToMany(ProfessionalModel, { through: 'Specialties_Professionals' });
        SpecialtyModel.hasMany(PracticeModel);

        ProvinceModel.belongsTo(CountryModel);

        PracticeModel.belongsTo(SpecialtyModel);


        UserModel.belongsTo(CountryModel);
        UserModel.belongsTo(ProvinceModel);
        UserModel.belongsTo(GenderModel);

        PracticeCostModel.belongsTo(PracticeModel);
        PracticeCostModel.belongsTo(ProfessionalModel);

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
        this.dbModels.practicecost = PracticeCostModel;
    };
}
