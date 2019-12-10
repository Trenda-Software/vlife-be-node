const mysql = require('mysql2');
const Sequelize = require('sequelize');

import 'dotenv/config';
import { Model } from 'sequelize';
import config from '../db/config/config.json';
import { DBModelsI } from '../types/types.js';
import UsuarioModel from '../db/models/usuario';
import PaisModel from '../db/models/pais';
import ProvinciaModel from '../db/models/provincia';
import EspecialidadViewModel from '../db/models/especialidad-view';

export default class DataService {
    dbClient: any = null;
    dbModels: DBModelsI = { usuario: null, pais: null, provincia: null, especialidadViewModel: null };

    async testMySQL() {
        console.log('Testing query to mysql');
        const sql = 'SELECT * FROM Provincias;';
        const dbConfig = {
            host: 'localhost',
            port: 3306,
            database: 'vlife',
            user: 'vlife_user',
            password: 'final_shandaw90',
        };

        const connection = mysql.createConnection(dbConfig);

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

    async testSequelize() {
        console.log('testign query with Sequelize');
    }

    async connect() {
        this.connectWithSequelize();
        // this.testMySQL();
        // this.testSequelize();
    }

    // testDB() {
    //     this.getConn().then(() => {
    //         var db = mongoose.connection;
    //         console.log(console, 'connection readyState DB: ', db.readyState);

    //         // db.on('error', console.error.bind(console, 'connection error:'));
    //         // db.once('open', function() {
    //         // we're connected!
    //         // console.log(console, 'connection OK');
    //         // });
    //     });
    // }

    connectWithSequelize = () => {
        const dbConfig = config.development;
        const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: 'mysql',
        });

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection to MYSQL has been established successfully.');
                this.dbClient = sequelize;
                this.initDBModels();
            })
            .catch((err: any) => {
                console.error('Unable to connect to the database:', err);
            });
    };

    initDBModels = () => {
        // creates models and initializes them

        const usuarioModel = UsuarioModel(this.dbClient);
        const paisModel = PaisModel(this.dbClient);
        const provinciaModel = ProvinciaModel(this.dbClient);
        const especialidadViewModel = EspecialidadViewModel(this.dbClient);

        this.dbModels.usuario = usuarioModel;
        this.dbModels.pais = paisModel;
        this.dbModels.provincia = provinciaModel;
        this.dbModels.especialidadViewModel = especialidadViewModel;

        usuarioModel.associate(this.dbModels);

        // rethink this , re associated updated models
        this.dbModels.usuario = usuarioModel;
        this.dbModels.pais = paisModel;
        this.dbModels.provincia = provinciaModel;
        this.dbModels.especialidadViewModel = especialidadViewModel;
    };
}
