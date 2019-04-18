const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cucaSiteData = require('./../data/cuca/siteData.json');

const url =
  'mongodb+srv://breeze:lnpEBeSOaijcNxsT@clustermongoatlas0-wiy2i.mongodb.net/breeze?retryWrites=true';

class DataService {
  constructor() {
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
    mongoose.connect(url, {
      useNewUrlParser: true,
    });

    const SitesModel = mongoose.model('sites', { content: Object });

    const cucaSite = new SitesModel({ content: cucaSiteData });
    cucaSite.save().then(() => console.log('cucaSite saved'));
  }
}

module.exports = DataService;
