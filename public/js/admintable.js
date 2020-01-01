(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyBccDQ6QGWPzb5ofof6i0nsEfOHvG-_GO0",
        authDomain: "pict-alumni.firebaseapp.com",
        databaseURL: "https://pict-alumni.firebaseio.com",
        projectId: "pict-alumni",
        storageBucket: "pict-alumni.appspot.com",
        messagingSenderId: "431820732325",
        appId: "1:431820732325:web:6ae194217d83c5b48f9a4c",
        measurementId: "G-PEYBQGG802"
      };


      firebase.initializeApp();
firebase.analytics();
      database = firebase.database();

      var ref = database.ref('form1');
      ref.on('value',gotData,errData);
}) ();

    function gotData() {
        console.log(data);
    }

    function errData(err) {
        console.log(err);
    }