const mysql = require('mysql2');

import { DBModelsI } from '../types/types.js';

import UserModel from '../db/models/User';
import ProfileModel from '../db/models/Profile';
const { Sequelize, DataTypes, Model } = require('sequelize');

export default class DataService {
    dbConfig: any = null;
    dbClient: any = null;
    dbModels: DBModelsI = {
        country: null,
        province: null,
        specialty: null,
        professional: null,
        practice: null,
        user: null,
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
        // await this.initDBModelsNew();
        // console.log('Models NEW created');

        await this.testManyToManyRel2();
        console.log('Init Data re-loaded');
    }

    async resetInitialData() {
        await this.dbClient.sync({ force: true });
    }

    async testManyToManyRel1() {
        const User = this.dbClient.define(
            'User',
            {
                username: DataTypes.STRING,
                points: DataTypes.INTEGER,
            },
            { timestamps: false }
        );
        const Profile = this.dbClient.define(
            'Profile',
            {
                name: DataTypes.STRING,
            },
            { timestamps: false }
        );

        User.belongsToMany(Profile, { through: 'Users_Profiles' });
        Profile.belongsToMany(User, { through: 'Users_Profiles' });

        await this.dbClient.sync({ force: true });

        const amidala = await User.create({ username: 'ami', points: 1000 });
        const queen = await Profile.create({ name: 'Queen' });
        const dancer = await Profile.create({ name: 'Dancer' });

        await amidala.addProfile(queen);
        await amidala.addProfile(dancer);

        const result = await User.findOne({
            where: { username: 'ami' },
            include: Profile,
        });
        result.Profiles.forEach((profile: any) => {
            console.log(`PROFILE - ID: ${profile.dataValues.id} NAME: ${profile.dataValues.name}`);
        });
    }

    async testManyToManyRel2() {
        const Car = this.dbClient.define('Car', {
            brand: DataTypes.STRING,
            speed: DataTypes.INTEGER,
        });
        const Driver = this.dbClient.define('Driver', {
            name: DataTypes.STRING,
        });

        Car.belongsToMany(Driver, { through: 'Cars_Drivers' });
        Driver.belongsToMany(Car, { through: 'Cars_Drivers' });

        await this.dbClient.sync({ force: true });

        const ford = await Car.create({ brand: 'Ford', speed: 120 });
        const fiat = await Car.create({ brand: 'Fiat', speed: 100 });

        const pete = await Driver.create({ name: 'Peter' });
        const mich = await Driver.create({ name: 'Michael' });

        await ford.addDriver(pete);
        await ford.addDriver(mich);

        await fiat.addDriver(pete);

        const fordResult = await Car.findOne({
            where: { brand: 'Ford' },
            include: Driver,
        });

        const drivers = await fordResult.getDrivers();
        // console.log('fordResult.getDrivers(): ', drivers);

        drivers.forEach((driver: any) => {
            console.log(`Ford Driver - id: ${driver.dataValues.id} name: ${driver.dataValues.name}`);
        });

        const fiatResult = await Car.findOne({
            where: { brand: 'Fiat' },
            include: Driver,
        });

        const fiatDrivers = await fiatResult.getDrivers();
        // console.log('fordResult.getDrivers(): ', drivers);

        fiatDrivers.forEach((driver: any) => {
            console.log(`Fiat Driver - id: ${driver.dataValues.id} name: ${driver.dataValues.name}`);
        });

        // a driver cars
        const peteResult = await Driver.findOne({
            where: { name: 'Peter' },
            include: Car,
        });

        const cars = await peteResult.getCars();
        // console.log('peteResult.getCars(): ', cars);

        cars.forEach((car: any) => {
            console.log(`Peter Car - id: ${car.dataValues.id} name: ${car.dataValues.brand}`);
        });

        // another driver cars
        const mikeResult = await Driver.findOne({
            where: { name: 'Michael' },
            include: Car,
        });

        const michCars = await mikeResult.getCars();
        // console.log('mikeResult.getCars(): ', michCars);

        michCars.forEach((car: any) => {
            console.log(`Michael Car - id: ${car.dataValues.id} name: ${car.dataValues.brand}`);
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
        // const especialidadModel = EspecialidadModel(this.dbClient);
        // const especialidadModel2 = EspecialidadModel2(this.dbClient);
        // const profesionalModel = ProfesionalModel(this.dbClient);
        // const profesionalespecialidadModel = ProfesionalEspecialidadModel(this.dbClient);
        // const userModel = UserModel(this.dbClient);
        // const profileModel = ProfileModel(this.dbClient);

        // this.dbModels.usuario = usuarioModel;
        // this.dbModels.pais = paisModel;
        // this.dbModels.practica = practicaModel;
        // this.dbModels.provincia = provinciaModel;
        // this.dbModels.especialidad = especialidadModel;
        // this.dbModels.profesional = profesionalModel;
        // this.dbModels.profesionalespecialidad = profesionalespecialidadModel;
        // this.dbModels.user = userModel;
        // this.dbModels.profile = profileModel;

        // // set up the associations here
        // usuarioModel.associate(this.dbModels);
        // practicaModel.associate(this.dbModels);
        // profesionalespecialidadModel.associate(this.dbModels);
        // especialidadModel2.associate(this.dbModels);
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
        // this.dbModels.especialidad = especialidadModel;
        // this.dbModels.profesional = profesionalModel;
        // this.dbModels.profesionalespecialidad = profesionalespecialidadModel;
        // this.dbModels.user = userModel;
        // this.dbModels.profile = profileModel;
    };

    async testManyToManyRel() {
        const User = this.dbClient.define(
            'User',
            {
                username: DataTypes.STRING,
                points: DataTypes.INTEGER,
            },
            { timestamps: false }
        );
        const Profile = this.dbClient.define(
            'Profile',
            {
                name: DataTypes.STRING,
            },
            { timestamps: false }
        );

        User.belongsToMany(Profile, { through: 'Users_Profiles' });
        Profile.belongsToMany(User, { through: 'Users_Profiles' });

        await this.dbClient.sync({ force: true });

        const amidala = await User.create({ username: 'ami', points: 1000 });
        const queen = await Profile.create({ name: 'Queen' });
        const dancer = await Profile.create({ name: 'Dancer' });

        await amidala.addProfile(queen);
        await amidala.addProfile(dancer);

        const result = await User.findOne({
            where: { username: 'ami' },
            include: Profile,
        });
        result.Profiles.forEach((profile: any) => {
            console.log(`PROFILE - ID: ${profile.dataValues.id} NAME: ${profile.dataValues.name}`);
        });
    }
}
