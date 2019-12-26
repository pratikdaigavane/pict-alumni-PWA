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

function validate(data) {
    for (let i = 1; i <= 14; i++) {
        if (!data.hasOwnProperty('q' + i.toString())) {
            console.log('q' + i.toString());
            return new Promise((res, err) => {
                res(false)
            });
        }
    }
    return new Promise((res, err) => {
        res(true)
    });
}

exports.form2 = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req.body);
        let data = req.body;
        validate(data).then((status) => {
            if (status) {
                admin.database().ref('/form2').push(data).then(() => {
                    res.status(200).json({
                        status: "success"
                    })
                });
            } else {
                res.status(400).json({
                    status: "Invalid form data!"
                })
            }

        })

    });
});

exports.form1 = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req.body);
        let data = req.body;
        let status = data;
        // validate(data).then((status) => {
            if (status) {
                admin.database().ref('/form1').push(data).then(() => {
                    res.status(200).json({
                        status: "success"
                    })
                });
            } else {
                res.status(400).json({
                    status: "Invalid form data!"
                })
            }

        // })

    });
});