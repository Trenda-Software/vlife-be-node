import mongoose, { ConnectionOptions } from 'mongoose';
import mongodb from 'mongodb';
import assert from 'assert';
import cucaSiteData from '../data/cuca/siteData_sp_ar.json';
import deosSiteData from '../data/deos/siteData_sp_ar.json';
import 'dotenv/config';
import { SiteSchema } from '../schemas/schemas';
import { SiteSchemaI } from '../types/types';

const url: string = process.env.MONGO_URL || '';

export default class DataService {
    constructor() {
        this.connectWithMongoose(url);
        // this.connect(url);
    }

    async connectWithMongoose(url: string) {
        console.log('MONGO_URL: ', url);

        await this.getConn();

        const SiteModel = mongoose.model('sites', SiteSchema);
        SiteModel.deleteMany({}, (err: any) => {
            if (err) {
                console.log('all items CANT be deleted from sites collection');
            } else {
                console.log('all items deleted from sites collection');
            }
        });

        this.saveSiteData(cucaSiteData, SiteModel);
        // this.saveSiteData({ content: deosSiteData }, SiteModel);
    }

    saveSiteData = async (siteData: SiteSchemaI, SiteModel: any) => {
        const siteModelData: SiteSchemaI = siteData;
        const siteModel = new SiteModel(siteModelData);
        await siteModel.save();
        console.log('siteData: ', siteData.id, ' saved !');
    };

    connect(url: string) {
        const MongoClient = mongodb.MongoClient;
        const uri = url;
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            // console.log('err: ', err);
            const collection = client.db('breeze').collection('sites');
            // console.log('collection: ', collection);

            // perform actions on the collection object
            // collection.save(cucaSiteData);
            // collection.save(deosSiteData);

            collection.deleteMany(function(err: any, r: any) {
                assert.equal(null, err);
                // console.log('deleted r : ', r);

                collection.insertMany([cucaSiteData, deosSiteData], async function(err, r) {
                    assert.equal(null, err);
                    console.log('inserted: ', assert.equal(2, r.insertedCount));
                    await client.close();
                });
            });
        });
    }

    getConn() {
        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
            useUnifiedTopology: true,
        };

        return mongoose.connect(url, options).catch(err => console.log('CONN ERR: ', err));
    }

    getContent() {
        this.getConn().then(() => {
            const SitesModel = mongoose.model('sites');
            return SitesModel.find();
        });
    }

    async getPages(site: string) {
        await this.getConn();
        const SitesModel = mongoose.model('sites');
        const result = await SitesModel.findOne()
            .where('id')
            .equals(site);
        // console.log('result: ', result);
        // console.log('content.pages: ', result ? result.get('content.pages') : null);
        const pages = result ? result.get('content.pages') : null;
        // console.log('pages: ', pages);

        return pages;
    }

    testDB() {
        this.getConn().then(() => {
            var db = mongoose.connection;
            console.log(console, 'connection readyState DB: ', db.readyState);

            // db.on('error', console.error.bind(console, 'connection error:'));
            // db.once('open', function() {
            // we're connected!
            // console.log(console, 'connection OK');
            // });
        });
    }
}
