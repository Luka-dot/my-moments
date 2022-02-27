const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = functions.config();

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

// const gettingTeamsList = () => {
//     const docRef = firestore.collection('teams');
//     docRef.get().then((snapshot) => {
//         const teamsList = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }))

//         setTeams(teamsList)
//     }) //  !member.memberOfTeam.includes(props.selectedTeam)
// }

exports.getAvailableTeamsForUser = functions.https.onCall(async (userId, context) => {
    console.log(context)
    const docRef = admin.firestore().collection('teams');
    const availableTeams = await docRef.get().then((snapshot) => {
        snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
    })
    return availableTeams
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

//  - ********** PUSH NOTIFICATION ************
exports.setToTriggerNotification = functions.firestore.document(`teams/ChqpoDJN60KM14Lu7lX4/events/{eventId}`)
    .onCreate((snapshot, context) => {


        var sendNotification = function (data) {
            var headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": config.onesignal.key
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
            include_external_user_ids: ["3mr5zzpwW5RvXfrY8Uen41h8Mtu1", "Am7UbLDeg4TOy5zdgRH89JwsNvx1"]
        };

        return sendNotification(message);

        // return admin.firestore().doc(`teams/evzgZALsibxzoiufIApG/events/${context.params.eventId}`)
        //     .update({
        //         testinFunctions: 'KURVAAA',
        //     })
    })