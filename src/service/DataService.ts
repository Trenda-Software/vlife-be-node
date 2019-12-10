import 'dotenv/config';
const Sequelize = require('sequelize');
// import { Usuario } from '../db/models/index.js';
import { Usuario } from '../db/models/';

export default class DataService {
    async connect() {
        this.connectWithSequelize();
    }

    getTestRows(connection: any, callback: Function) {
        const sql = 'SELECT * FROM VLife.Provincias;';
        connection.query(sql, callback);
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
                console.log('Connection has been established successfully.');
                // Find all users
                Usuario.findAll().then((users: Usuario[]) => {
                    console.log('All users:', JSON.stringify(users, null, 4));
                });
            })
            .catch((err: any) => {
                console.error('Unable to connect to the database:', err);
            });

        // return mysql.createConnection(dbConfig);
    };
}
