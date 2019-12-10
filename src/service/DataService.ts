import 'dotenv/config';
import mysql from 'mysql2';

const url: string = process.env.MONGO_URL || '';

export default class DataService {
    async connect() {
        const connection = this.connectWithSequelize();
        connection.connect((err: any) => {
            if (err) throw err;
        });
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

        return mysql.createConnection(dbConfig);
    };
}
