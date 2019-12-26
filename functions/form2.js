'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();


exports.form2 = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req.body);
        let data = req.body;
        for(let i=0; i<14; i++)
            if(!('q' + toString(i) in data))
                res.status(400).json({
                    status: "invalid form data"
                });
        admin.database().ref('/form2').push(data).then(() => {
            res.status(200).json({
                status : "success"
            })
        });
    });
});
