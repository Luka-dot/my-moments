const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.contacts = functions.https.onRequest(async (request, response) => {
    const name = request.query.name;
    const phone = request.query.phone;

    const addContact = await admin.firestore().collection('contacts').add({
        name,
        phone
    })

    response.json({
        result: `${addContact.id}`
    })
})