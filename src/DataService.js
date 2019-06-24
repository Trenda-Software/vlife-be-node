const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cucaSiteData = require('../public/data/cuca/siteData_sp_ar.json');
const deosSiteData = require('../public/data/deos/siteData.json');
const assert = require('assert');

const url = process.env.MONGO_URL;

class DataService {
  constructor() {
    // this.mongoose = null;

    this.connectWithMongoose(url);
    // this.connect(url);
  }

  connect(url) {
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

      collection.deleteMany(function(err, r) {
        assert.equal(null, err);
        // console.log('deleted r : ', r);

        collection.insertMany([cucaSiteData, deosSiteData], function(err, r) {
          assert.equal(null, err);
          console.log('inserted: ', assert.equal(2, r.insertedCount));
          client.close();
        });
      });
    });
  }

  connectWithMongoose(url) {
    this.getConn().then(() => {
      const SitesModel = mongoose.model('sites', { content: Object });
      SitesModel.deleteMany({}, err => {
        if (err) {
          console.log('all items CANT be deleted from sites collection');
        } else {
          console.log('all items deleted from sites collection');
        }
      });
      const cucaSite = new SitesModel({ content: cucaSiteData });
      const deosSite = new SitesModel({ content: deosSiteData });

      // cucaSite.markModified('content');
      cucaSite.save().then(() => {
        console.log('cucaSite saved');
        // deosSite.markModified('content');
        deosSite.save().then(() => {
          console.log('deosSite saved');
          mongoose.disconnect();
        });
      });
    });
  }

  getConn() {
    return mongoose
      .connect(url, {
        useNewUrlParser: true,
      })
      .catch(err => console.log('CONN ERR: ', err));
  }

  getContent() {
    this.getConn().then(() => {
      const SitesModel = mongoose.model('sites');
      return SitesModel.find();
    });
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

module.exports = DataService;
