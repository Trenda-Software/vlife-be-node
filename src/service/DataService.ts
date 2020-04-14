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
import Patienttype from '../db/models/Patienttype';

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
        patienttype: null,
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
        const PatienttypeModel: any = this.dbClient.models.Patienttype;

        /* const province1 = await ProvinceModel.create({ code: 'BSAS', name: 'Buenos Aires' });
        const country1 = await CountryModel.create({ code: 'ARG', name: 'Argentina' });
        aw ait province1.setCountry(country1);
*/
        const gender1 = await GenderModel.create({ code: 'FEM', name: 'Femenino' });
        const gender2 = await GenderModel.create({ code: 'MAS', name: 'Masculino' });
        const gender3 = await GenderModel.create({ code: 'IND', name: 'Indistinto' });
        /*        
                                 const user1 = await UserModel.create({
                                    dni: 24111222,
                                    name: 'Javier',
                                    surname: 'Hack',
                                    pwd: 'javi1234',
                                    email: 'javierhack@gmail.com',
                                    mobile: '1122101000',
                                    picture:
                                        'https://vlife-aws-s3-images.s3.amazonaws.com/img/users/1.png',
                                    address: 'Alem 1234',
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
                                    address: 'Machado 1234',
                                });
                        
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
             */
        const kinesio = await SpecialtyModel.create({ name: 'Kinesiología', code: 'kinesio' });
        const medic = await SpecialtyModel.create({ name: 'Médico', code: 'medic' });
        const enfer = await SpecialtyModel.create({ name: 'Enfermería', code: 'enferm' });

        /*                    await kinesio.addProfessionals([professional1, professional2, professional3]);
                            await medic.addProfessionals([professional1, professional4]);
                            await enfer.addProfessionals([professional2, professional4]);
                    
                            const kinesioResults = await SpecialtyModel.findOne({
                                where: { code: 'kinesio' },
                                include: ProfessionalModel,
                            });
                            console.log('Kinesio Professional QTY:' + kinesioResults.Professionals.length);
                            kinesioResults.Professionals.forEach((specialty: any) => {
                                console.log(`Kinesio Professional - ID: ${specialty.dataValues.id} NAME: ${specialty.dataValues.name}`);
                            });
                    
                            const medicResults = await SpecialtyModel.findOne({
                                where: { code: 'medic' },
                                include: ProfessionalModel,
                            });
                            console.log('Radio Professional QTY:' + medicResults.Professionals.length);
                            medicResults.Professionals.forEach((specialty: any) => {
                                console.log(`Medic Professional - ID: ${specialty.dataValues.id} NAME: ${specialty.dataValues.name}`);
                            });
            */
        //Medico
        const practice1 = await PracticeModel.create({
            name: 'Herida de Piel',
            code: 'HEP',
            cost: '625',
            additional_info: false,
        });
        const practice2 = await PracticeModel.create({
            name: 'Fiebre',
            code: 'FIE',
            cost: '625',
            additional_info: false,
        });
        const practice3 = await PracticeModel.create({
            name: 'Dolor Abdominal',
            code: 'DOA',
            cost: '625',
            additional_info: false,
        });
        const practice4 = await PracticeModel.create({
            name: 'Tos Frecuente',
            code: 'TOF',
            cost: '625',
            additional_info: false,
        });
        const practice5 = await PracticeModel.create({
            name: 'Diarrea',
            code: 'DIA',
            cost: '625',
            additional_info: false,
        });
        const practice6 = await PracticeModel.create({
            name: 'Dolor de Oido',
            code: 'DOI',
            cost: '625',
            additional_info: false,
        });
        const practice7 = await PracticeModel.create({
            name: 'Dolor de Garganta',
            code: 'DOG',
            cost: '625',
            additional_info: false,
        });
        const practice8 = await PracticeModel.create({
            name: 'Fatiga',
            code: 'FAT',
            cost: '625',
            additional_info: false,
        });

        //Enfermeria

        const practice9 = await PracticeModel.create({
            name: 'Toma de Signo Vital',
            code: 'TSV',
            cost: '250',
            additional_info: false,
        });
        const practice10 = await PracticeModel.create({
            name: 'Inyección',
            code: 'INY',
            cost: '300',
            additional_info: true,
        });
        const practice11 = await PracticeModel.create({
            name: 'Curación de Heridas',
            code: 'CUH',
            cost: '400',
            additional_info: false,
        });
        const practice12 = await PracticeModel.create({
            name: 'Enema',
            code: 'ENE',
            cost: '625',
            additional_info: false,
        });
        const practice13 = await PracticeModel.create({
            name: 'Cambio de Bolsa de Ostomía',
            code: 'CBO',
            cost: '750',
            additional_info: false,
        });
        const practice14 = await PracticeModel.create({
            name: 'Higiene de Paciente',
            code: 'HIP',
            cost: '750',
            additional_info: false,
        });
        const practice15 = await PracticeModel.create({
            name: 'Cuidado de Paciente Express 4hs',
            code: 'CPE',
            cost: '1000',
            additional_info: false,
        });
        const practice16 = await PracticeModel.create({
            name: 'Cuidado de Paciente Full 6hs',
            code: 'CPF',
            cost: '1500',
            additional_info: false,
        });
        const practice17 = await PracticeModel.create({
            name: 'Cuidado de Paciente Full Time 8hs',
            code: 'CPT',
            cost: '2000',
            additional_info: false,
        });
        const practice18 = await PracticeModel.create({
            name: 'Guardia Activa 12hs',
            code: 'GA1',
            cost: '3100',
            additional_info: false,
        });
        const practice19 = await PracticeModel.create({
            name: 'Guardia Activa 24hs',
            code: 'GA2',
            cost: '6250',
            additional_info: false,
        });

        const practice20 = await PracticeModel.create({
            name: 'Guardia Pasiva 12hs',
            code: 'GP1',
            cost: '3100',
            additional_info: false,
        });
        const practice21 = await PracticeModel.create({
            name: 'Guardia Pasiva 24hs',
            code: 'GP2',
            cost: '6250',
            additional_info: false,
        });

        //Kinesiologia

        const practice22 = await PracticeModel.create({
            name: 'Terapia Adulto Mayor',
            code: 'TAM',
            cost: '700',
            additional_info: true,
        });
        const practice23 = await PracticeModel.create({
            name: 'Neuro Rehabilitación',
            code: 'NRE',
            cost: '700',
            additional_info: true,
        });
        const practice24 = await PracticeModel.create({
            name: 'Respiratoria',
            code: 'RES',
            cost: '700',
            additional_info: true,
        });
        const practice25 = await PracticeModel.create({
            name: 'Traumatología y Ortopedia',
            code: 'TRO',
            cost: '700',
            additional_info: true,
        });
        const practice26 = await PracticeModel.create({
            name: 'Electroterapia',
            code: 'ELE',
            cost: '700',
            additional_info: true,
        });
        const practice27 = await PracticeModel.create({
            name: 'Deportivo',
            code: 'DEP',
            cost: '700',
            additional_info: true,
        });
        const practice28 = await PracticeModel.create({
            name: 'Lesiones',
            code: 'LES',
            cost: '700',
            additional_info: true,
        });
        const practice29 = await PracticeModel.create({
            name: 'Algias Generalizadas',
            code: 'ALG',
            cost: '700',
            additional_info: true,
        });

        //Medico
        await practice1.setSpecialty(medic);
        await practice2.setSpecialty(medic);
        await practice3.setSpecialty(medic);
        await practice4.setSpecialty(medic);
        await practice5.setSpecialty(medic);
        await practice6.setSpecialty(medic);
        await practice7.setSpecialty(medic);
        await practice8.setSpecialty(medic);

        //Enferneria
        await practice9.setSpecialty(enfer);
        await practice10.setSpecialty(enfer);
        await practice11.setSpecialty(enfer);
        await practice12.setSpecialty(enfer);
        await practice13.setSpecialty(enfer);
        await practice14.setSpecialty(enfer);
        await practice15.setSpecialty(enfer);
        await practice16.setSpecialty(enfer);
        await practice17.setSpecialty(enfer);
        await practice18.setSpecialty(enfer);
        await practice19.setSpecialty(enfer);
        await practice20.setSpecialty(enfer);
        await practice21.setSpecialty(enfer);

        //Kineseologia
        await practice22.setSpecialty(kinesio);
        await practice23.setSpecialty(kinesio);
        await practice24.setSpecialty(kinesio);
        await practice25.setSpecialty(kinesio);
        await practice26.setSpecialty(kinesio);
        await practice27.setSpecialty(kinesio);
        await practice28.setSpecialty(kinesio);
        await practice29.setSpecialty(kinesio);
        /*    
                             const PracticeCost1 = await PracticeCostModel.create({
                                cost: '625',
                            });
                            await PracticeCost1.setProfessional(professional2);
                            await PracticeCost1.setPractice(practice1);
                    
                            const PracticeCost2 = await PracticeCostModel.create({
                                cost: '625',
                            });
                            await PracticeCost2.setProfessional(professional4);
                            await PracticeCost2.setPractice(practice2);
                            const PracticeCost3 = await PracticeCostModel.create({
                                cost: '625',
                            });
                            await PracticeCost3.setProfessional(professional4);
                            await PracticeCost3.setPractice(practice3);
           */
        const Pacienttype1 = await PatienttypeModel.create({
            name: 'Niño/a',
        });
        const Pacienttype2 = await PatienttypeModel.create({
            name: 'Embarazada',
        });
        const Pacienttype3 = await PatienttypeModel.create({
            name: 'Mayor',
        });
        const Pacienttype4 = await PatienttypeModel.create({
            name: 'Adulto/a',
        });

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
        const PatienttypeModel: any = Patienttype(this.dbClient);

        // associations
        ProfessionalModel.belongsToMany(SpecialtyModel, { through: 'Specialties_Professionals' });
        ProfessionalModel.belongsTo(CountryModel);
        ProfessionalModel.belongsTo(ProvinceModel);
        ProfessionalModel.hasMany(PracticeCostModel);
        ProfessionalModel.belongsTo(GenderModel);


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
        RequestModel.belongsToMany(PracticeModel, { through: 'Requests_Practices' });
        RequestModel.belongsTo(UserModel);
        RequestModel.belongsTo(ProfessionalModel);
        RequestModel.belongsTo(PatienttypeModel);

        ImgPrescriptionModel.belongsTo(RequestModel);
        ImgPrescriptionModel.belongsTo(PracticeModel);

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
        this.dbModels.patienttype = PatienttypeModel;
    };
}
