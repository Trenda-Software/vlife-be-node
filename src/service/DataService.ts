const mysql = require('mysql2');

import { DBModelsI } from '../types/types.js';
import Country from '../db/models/Country';
import Province from '../db/models/Province';
import Specialty from '../db/models/Specialty';
import Professional from '../db/models/Professional';
import Practice from '../db/models/Practice';
import User from '../db/models/User';
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

        const province1 = await ProvinceModel.create({ code: 'BSAS', name: 'Buenos Aires' });
        const country1 = await CountryModel.create({ code: 'ARG', name: 'Argentina' });
        await province1.setCountry(country1);

        const user1 = await UserModel.create({ name: 'Javier', surname: 'Hack', pwd: 'javi1234', email: 'javierhack@gmail.com' });
        await user1.setCountry(country1);
        await user1.setProvince(province1);

        const user2 = await UserModel.create({ name: 'Mariano', surname: 'Escudero', pwd: '$2a$10$2L0ZZ1D9glTYwSX/Zff..uPUhk/3XPak6/N8arA5Fk.E7FrNT7HHq', email: 'maca@gmail.com' });
        await user2.setCountry(country1);
        await user2.setProvince(province1);

        const professional1 = await ProfessionalModel.create({ name: 'Javier', surname: 'Doctoret' });
        const professional2 = await ProfessionalModel.create({ name: 'Pedro', surname: 'Del Medico' });
        const professional3 = await ProfessionalModel.create({ name: 'Pablo', surname: 'Del Hopitalet' });
        const professional4 = await ProfessionalModel.create({ name: 'Juan', surname: 'Camillet' });
        const professional5 = await ProfessionalModel.create({ name: 'Maria', surname: 'DeGuardia' });

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

        const practice1 = await PracticeModel.create({ name: 'Cambio de Bolsa de colosiomia', code: 'CBC', cost: '600' });
        const practice2 = await PracticeModel.create({ name: 'Inyeccion Intramuscular', code: 'IIM', cost: '300' });
        const practice3 = await PracticeModel.create({ name: 'Higiene de Paciente', code: 'HIP', cost: '200' });
        await practice1.setSpecialty(enfer);
        await practice2.setSpecialty(enfer);
        await practice3.setSpecialty(enfer);
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

        // associations
        ProfessionalModel.belongsToMany(SpecialtyModel, { through: 'Specialties_Professionals' });
        ProfessionalModel.belongsTo(CountryModel);
        ProfessionalModel.belongsTo(ProvinceModel);

        SpecialtyModel.belongsToMany(ProfessionalModel, { through: 'Specialties_Professionals' });
        ProvinceModel.belongsTo(CountryModel);

        PracticeModel.belongsTo(SpecialtyModel);

        UserModel.belongsTo(CountryModel);
        UserModel.belongsTo(ProvinceModel);

        this.dbModels.user = UserModel;
        this.dbModels.country = CountryModel;
        this.dbModels.practice = PracticeModel;
        this.dbModels.province = ProvinceModel;
        this.dbModels.specialty = SpecialtyModel;
        this.dbModels.professional = ProfessionalModel;
    };
}
