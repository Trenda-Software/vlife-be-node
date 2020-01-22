const mysql = require('mysql2');
const Sequelize = require('sequelize');

import { DBModelsI } from '../types/types.js';
import UsuarioModel from '../db/models/usuario';
import PaisModel from '../db/models/pais';
import PracticaModel from '../db/models/practica';
import ProvinciaModel from '../db/models/provincia';
import EspecialidadModel from '../db/models/especialidad';
import ProfesionalModel from '../db/models/profesional';
import ProfesionalEspecialidadModel from '../db/models/profesionalespecialidad';

export default class DataService {
    dbConfig: any = null;
    dbClient: any = null;
    dbModels: DBModelsI = {
        usuario: null,
        pais: null,
        provincia: null,
        especialidad: null,
        profesional: null,
        profesionalespecialidad: null,
        practica: null,
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
    }

    connectWithSequelize = async () => {
        console.log('connectWithSequelize');

        const sequelize = new Sequelize(this.dbConfig.database, this.dbConfig.user, this.dbConfig.password, {
            host: this.dbConfig.host,
            dialect: 'mysql',
        });

        await sequelize.authenticate();
        this.dbClient = sequelize;
    };

    initDBModels = async () => {
        // creates models and initializes them

        const usuarioModel = UsuarioModel(this.dbClient);
        const paisModel = PaisModel(this.dbClient);
        const practicaModel = PracticaModel(this.dbClient);
        const provinciaModel = ProvinciaModel(this.dbClient);
        const especialidadModel = EspecialidadModel(this.dbClient);
        const profesionalModel = ProfesionalModel(this.dbClient);
        const profesionalespecialidadModel = ProfesionalEspecialidadModel(this.dbClient);

        this.dbModels.usuario = usuarioModel;
        this.dbModels.pais = paisModel;
        this.dbModels.practica = practicaModel;
        this.dbModels.provincia = provinciaModel;
        this.dbModels.especialidad = especialidadModel;
        this.dbModels.profesional = profesionalModel;
        this.dbModels.profesionalespecialidad = profesionalespecialidadModel;

        // set up the associations here
        usuarioModel.associate(this.dbModels);
        practicaModel.associate(this.dbModels);
        profesionalespecialidadModel.associate(this.dbModels);
        // profesionalModel.associate(this.dbModels);
        // paisModel.associate(this.dbModels);
        // provinciaModel.associate(this.dbModels);

        // @TODO rethink this , re associated updated models
        this.dbModels.usuario = usuarioModel;
        this.dbModels.pais = paisModel;
        this.dbModels.practica = practicaModel;
        this.dbModels.provincia = provinciaModel;
        this.dbModels.especialidad = especialidadModel;
        this.dbModels.profesional = profesionalModel;
        this.dbModels.profesionalespecialidad = profesionalespecialidadModel;
    };
}
