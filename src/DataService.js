const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cucaSiteData = require('../public/data/cuca/siteData_sp_ar.json');
const deosSiteData = require('../public/data/deos/siteData.json');

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
      console.log('err: ', err);
      const collection = client.db('breeze').collection('sites');
      console.log('collection: ', collection);

      // perform actions on the collection object
      client.close();
    });
  }

  connectWithMongoose(url) {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
      })
      .catch(err => console.log('CONN ERR: ', err));

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

    cucaSite.save().then(() => console.log('cucaSite saved'));
    deosSite.save().then(() => console.log('deosSite saved'));
  }

  getContent(siteId) {
    const SitesModel = mongoose.model('sites');
    return SitesModel.find({ 'content.id': siteId });
  }
}

module.exports = DataService;
