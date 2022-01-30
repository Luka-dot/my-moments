const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

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

//TRIGGERS
exports.addDate = functions.firestore.document(`contacts/{contactId}`)
    .onCreate((snapshot, context) => {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();

        return admin.firestore().doc(`contacts/${context.params.contactId}`)
            .update({
                dateAdded: timestamp,
            })
    })

exports.setToTriggerNotification = functions.firestore.document(`teams/evzgZALsibxzoiufIApG/events/{eventId}`)
    .onCreate((snapshot, context) => {


        var sendNotification = function (data) {
            var headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Basic Y2MzOWZhOWEtYTlmZi00ZDNkLThkYmItZmViNWE2M2IyNzNl"
            };

            var options = {
                host: "onesignal.com",
                port: 443,
                path: "/api/v1/notifications",
                method: "POST",
                headers: headers
            };

            var https = require('https');
            var req = https.request(options, function (res) {
                res.on('data', function (data) {
                    console.log("Response:");
                    console.log(JSON.parse(data));
                });
            });

            req.on('error', function (e) {
                console.log("ERROR:");
                console.log(e);
            });

            req.write(JSON.stringify(data));
            req.end();
        };

        var message = {
            app_id: "fb954bfe-7d60-443d-a7dd-695ffd616880",
            contents: {
                "en": "English Message"
            },
            channel_for_external_user_ids: "push",
            include_external_user_ids: ["yjsI329VY3P8NX0VXT5ACnX8m1b2", "FTbSwdpPhTSXmEZTFi0t4KDXGZA3"]
        };

        return sendNotification(message);

        // return admin.firestore().doc(`teams/evzgZALsibxzoiufIApG/events/${context.params.eventId}`)
        //     .update({
        //         testinFunctions: 'KURVAAA',
        //     })
    })