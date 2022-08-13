const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod;


module.exports.connects = async() => {

    if(!mongod){
        mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();
        const mongooseOpts = {
            useUnifiedTopology: true,maxPoolSize: 10
        }

        mongoose.connect(uri, mongooseOpts);
    }

}


module.exports.closeDb = async() => {

    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if(mongod){
        await mongod.stop();
    }
}


module.exports.clearDb = async() => {
    const collections = mongoose.connection.collections;

    for(const key in collections){
        let collection = collections[key];
        await collection.deleteMany();
    }

}