const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const email = data.email;
    const name = data.name;
    const phno = data.phno;
    const role = data.role;
    db.collection('users').doc(uid).set({
        name: name,
        email: email,
        phno: phno,
        role: role
    }).then(() => {
        if (role == 'student') {
            db.collection('students').doc(uid).set({
                class: '',
                regno: '',
                marks: []
            }).then()
        } else if (role == 'teacher') {
            db.collection('teacher').doc(uid).set({
                rating: 0.0,
                classes: [],
                subjects: []
            }).then()
        } else if (role == 'admin') {
            db.collection('admin').doc(uid).set({
                position: ''
            }).then()
        }
    }).catch(error => {
        log.write(error);
    })
})
