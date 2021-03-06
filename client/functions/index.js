//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Michael Alao!");
});

const createNotification = ( notification => {
    return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
})

exports.projectCreated = functions.firestore
.document('projects/{project}')
.onCreate(doc => {

    const project = doc.data();
    const notification = {
        content: 'Added a new measurement',
        user: `${project.name} ${project.email}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
return createNotification(notification);

});

exports.userJoined = functions.auth.user()
.onCreate( user => {
return admin.firestore().collection('users')
.doc(user.uid).get().then( doc => {

    const newUser = doc.data();
    const notification = {
        content: 'Joined the App',
        user: `${newUser.firstName} ${newUser.lastName}`,
         time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
})

}

)


