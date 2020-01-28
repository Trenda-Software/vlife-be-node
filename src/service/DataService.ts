const mysql = require('mysql2');

import { DBModelsI } from '../types/types.js';
// import UsuarioModel from '../db/models/usuario';
// import PaisModel from '../db/models/pais';
// import PracticaModel from '../db/models/practica';
// import ProvinciaModel from '../db/models/provincia';
import Specialty from '../db/models/Specialty';
import Professional from '../db/models/Professional';
// import UserModel from '../db/models/user';
// import ProfileModel from '../db/models/profile';
const { Sequelize, DataTypes, Model } = require('sequelize');

export default class DataService {
    dbConfig: any = null;
    dbClient: any = null;
    dbModels: DBModelsI = {
        usuario: null,
        pais: null,
        provincia: null,
        especialidad: null,
        especialidad2: null,
        profesional: null,
        profesionalespecialidad: null,
        practica: null,
        user: null,
        profile: null,
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
        // console.log('Models NEW created');

        // await this.testManyToManyRel();
        console.log('Init Data re-loaded');
    }

    async resetInitialData() {
        await this.dbClient.sync({ force: true });
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
        // const paisModel = PaisModel(this.dbClient);
        // const practicaModel = PracticaModel(this.dbClient);
        // const provinciaModel = ProvinciaModel(this.dbClient);
        const SpecialtyModel: any = Specialty(this.dbClient);
        const ProfessionalModel = Professional(this.dbClient);
        ProfessionalModel.belongsToMany(SpecialtyModel, { through: 'Specialties_Professionals' });
        SpecialtyModel.belongsToMany(ProfessionalModel, { through: 'Specialties_Professionals' });

        // userModel.belongsToMany(profileModel, { through: 'User_Profiles' });
        // profileModel.belongsToMany(userModel, { through: 'User_Profiles' });

        // @TODO rethink this , re associated updated models
        // this.dbModels.usuario = usuarioModel;
        // this.dbModels.pais = paisModel;
        // this.dbModels.practica = practicaModel;
        // this.dbModels.provincia = provinciaModel;
        // this.dbModels.especialidad = SpecialtyModel;
        // this.dbModels.profesional = profesionalModel;
        // this.dbModels.profesionalespecialidad = profesionalSpecialtyModel;
        // this.dbModels.user = userModel;
        // this.dbModels.profile = profileModel;
    };

    initDBModelsNew = async () => {
        // creates models and initializes them

        const User = UserModel(this.dbClient);

        // `sequelize.define` also returns the model
        console.log('this.dbClient.models.user: ', this.dbClient.models.user === User); // true
        console.log('User model: ', User); // true

        // const usuarioModel = UsuarioModel(this.dbClient);
        // const paisModel = PaisModel(this.dbClient);
        // const practicaModel = PracticaModel(this.dbClient);
        // const provinciaModel = ProvinciaModel(this.dbClient);
        // const SpecialtyModel = SpecialtyModel(this.dbClient);
        // const SpecialtyModel2 = SpecialtyModel2(this.dbClient);
        // const profesionalModel = ProfesionalModel(this.dbClient);
        // const profesionalSpecialtyModel = ProfesionalSpecialtyModel(this.dbClient);
        // const userModel = UserModel(this.dbClient);
        // const profileModel = ProfileModel(this.dbClient);

        // this.dbModels.usuario = usuarioModel;
        // this.dbModels.pais = paisModel;
        // this.dbModels.practica = practicaModel;
        // this.dbModels.provincia = provinciaModel;
        // this.dbModels.especialidad = SpecialtyModel;
        // this.dbModels.profesional = profesionalModel;
        // this.dbModels.profesionalespecialidad = profesionalSpecialtyModel;
        // this.dbModels.user = userModel;
        // this.dbModels.profile = profileModel;

        // // set up the associations here
        // usuarioModel.associate(this.dbModels);
        // practicaModel.associate(this.dbModels);
        // profesionalSpecialtyModel.associate(this.dbModels);
        // SpecialtyModel2.associate(this.dbModels);
        // // profesionalModel.associate(this.dbModels);
        // // paisModel.associate(this.dbModels);
        // // provinciaModel.associate(this.dbModels);

        // userModel.belongsToMany(profileModel, { through: 'User_Profiles' });
        // profileModel.belongsToMany(userModel, { through: 'User_Profiles' });

        // // @TODO rethink this , re associated updated models
        // this.dbModels.usuario = usuarioModel;
        // this.dbModels.pais = paisModel;
        // this.dbModels.practica = practicaModel;
        // this.dbModels.provincia = provinciaModel;
        // this.dbModels.especialidad = SpecialtyModel;
        // this.dbModels.profesional = profesionalModel;
        // this.dbModels.profesionalespecialidad = profesionalSpecialtyModel;
        // this.dbModels.user = userModel;
        // this.dbModels.profile = profileModel;
    };
}
