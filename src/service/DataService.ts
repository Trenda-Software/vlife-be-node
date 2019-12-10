import 'dotenv/config';
const mysql = require('mysql2');
const Sequelize = require('sequelize');
// import { Usuario } from '../db/models/index.js';
// import { Usuario } from '../db/models/';

export default class DataService {
    // sequelize: Sequelize;

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
        // this.connectWithSequelize();
        // this.testMySQL();
        this.testSequelize();
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
        const dbConfig = {
            host: 'localhost',
            port: 3306,
            database: 'vlife',
            user: 'vlife_user',
            password: 'final_shandaw90',
        };

        const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
            host: dbConfig.host,
            dialect: 'mysql',
        });

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection to MYSQL has been established successfully.');
            })
            .catch((err: any) => {
                console.error('Unable to connect to the database:', err);
            });
    };
}
