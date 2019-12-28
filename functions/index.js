'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const request = require('request');
admin.initializeApp();


var secretKey = "6LehkMoUAAAAADn2qT8GVCkg12MJ3Cwq8d2FebKn";


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

function valRecaptcha(grepres, remoteip) {
    var verificationUrl = "https://recaptcha.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + grepres + "&remoteip=" + remoteip;

    // Hitting GET request to the URL, Google will respond with success or error scenario.
    return new Promise((res, err) => {
        request(verificationUrl, function (error, response, body) {
            console.log(response);
            console.log(error);
            console.log(body);
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if (body.success !== undefined && !body.success) {
                console.log("recaptcha err");
                // return res.status(400).json({"responseCode": 1, "status": "Failed captcha verification"});

                res(false)

            } else {
                console.log("recaptcha OK");
                res(true);
            }
        });
    });
}

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
        res(true);
    });
}

exports.form2 = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req.body);
        let data = req.body;
        validate(data).then((status) => {
            if (status) {
                valRecaptcha(data['g-recaptcha-response'], req.connection.remoteAddress).then((status)=>{
                    if(status){
                        console.log("pushing into db");
                        admin.database().ref('/form2').push(data).then(() => {
                            res.status(200).json({
                                status: "success"
                            });
                        });
                    }else {
                        res.status(400).json({
                            status: "Recaptcha verification error"
                        })
                    }
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
