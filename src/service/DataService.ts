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

        const professional1 = await ProfessionalModel.create({ name: 'Javier', surname: 'Doctoret' });
        const professional2 = await ProfessionalModel.create({ name: 'Pedro', surname: 'Del Medico' });
        const professional3 = await ProfessionalModel.create({ name: 'Pablo', surname: 'Del Hopitalet' });
        const professional4 = await ProfessionalModel.create({ name: 'Juan', surname: 'Camillet' });
        const professional5 = await ProfessionalModel.create({ name: 'Maria', surname: 'DeGuardia' });

        const kinesio = await SpecialtyModel.create({ name: 'Kinesiologia', code: 'kinesio' });
        const radio = await SpecialtyModel.create({ name: 'Radioterapia', code: 'radio' });

        await kinesio.addProfessionals([professional1, professional2, professional3]);
        await radio.addProfessionals([professional1, professional4]);

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
