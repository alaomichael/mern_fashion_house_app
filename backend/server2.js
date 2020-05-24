
// << db setup >>
const db = require("./db");
const dbName = "data";
const collectionName = "measurements"

db.initialize(dbName, collectionName, function (dbCollection) {
    // success callback
    // get all items
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}, function (err) { //failureCallback
    throw (err);
}

);