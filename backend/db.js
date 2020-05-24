
// Cut to db.js file

const MongoClient = require('mongodb').MongoClient;
//const URI = "mongodb+srv://alaomichael:babatunde_2@measurement1-zsaz7.gcp.mongodb.net/test?retryWrites=true&w=majority";

const URI = "mongodb+srv://alaomichael:babatunde2@measurementcluster-op09y.gcp.mongodb.net/test?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(URI, { useNewUrlParser: true}, function (err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};

