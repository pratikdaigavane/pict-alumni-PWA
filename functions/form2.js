'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();


exports.messageMe = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req.body);
        let data = req.body;
        admin.database().ref('/formData').push({
            text: data
        }).then(() => {
            res.status(200).json({
                message: hello
            })
        })

    });
});
