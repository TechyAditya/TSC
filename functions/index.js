const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();


exports.test = functions.https.onCall((data, response) => {
    functions.logger.log("Hello logs!", {structuredData: true});
    return {
        message: "Hello from Firebase!"
    };
});

exports.createStudent = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const email = data.email;
    const name = data.name;
    const phone = data.phone;
    const role = 'student';
    const classno = data.classno;
    const batch = data.batch;

    db.collection(role).doc(uid).set({
        name: name,
        email: email,
        phone: phone,
        classno: classno,
        batch: batch,
        marks: []
    }).then()
        .catch(error => {
            functions.logger.log(JSON.stringify(error));
        })
})

exports.createTeacher = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const email = data.email;
    const name = data.name;
    const phone = data.phone;
    const role = 'teacher';
    const rating = data.rating;
    const subject = data.subject;

    db.collection(role).doc(uid).set({
        name: name,
        email: email,
        phone: phone,
        rating: rating,
        subject: subject,
        classes: []
    }).then()
        .catch(error => {
            functions.logger.log(JSON.stringify(error));
        })
})

exports.updateStudentProfile = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const classs = data.class;
    const regno = data.regno;
    const marks = data.marks;
    db.collection('students').doc(uid).set({
        class: classs,
        regno: regno,
        marks: marks
    }).then(() => {
        for (const [key, value] of Object.entries(marks)) {
            db.collection(`class/${classs}/${uid}/marks`).doc(key).set(value).then()
        }
        return true;
    }
    ).catch(error => {
        functions.logger.log(JSON.stringify(error));
        return false;
    })
})

exports.updateTeacherProfile = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const cv = data.cv;
    db.collection('teacher').doc(uid).set({
        cv: cv
    }).then(() => {
        return true;
    }
    ).catch(error => {
        functions.logger.log(JSON.stringify(error));
        return false;
    })
})

exports.deleteUserData = functions.https.onCall((data, context) => {
    const usr = context.auth.uid;
    const uid = [...data.uid]; // array of uid
    const role = data.role;
    
    db.collection('admin').doc(usr).get().then((doc) => {
        if (doc.exists) {
            functions.logger.log("Logged in as admin");
            for(let i=0; i<uid.length; i++){
                functions.logger.log("Deleting", role, uid[i]);
                db.collection(role).doc(uid[i]).delete().then(() => {
                    functions.logger.log("Docs deleted");
                    admin.auth().deleteUser(uid[i]).then(() => {
                        functions.logger.log("User deleted:", uid[i]);
                    })
                })
            }
        }
        else {
            functions.logger.log("Not logged in as admin");
        }
    })
})

exports.setTimeTable = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const classs = data.class;
    const timetable = data.timetable;
    db.collection('admin').doc(uid).get().then((doc) => {
        if (doc.exists) {
            db.collection('timetable/${classs}/monday').doc('timetable').set({
                timetable: timetable
            }).then(() => {
                return true;
            })
        }
    })
})

exports.deleteStudents = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    db.collection('admin').doc(uid).get().then((doc) => {
        if (doc.exists) {
            for (const user of data) {
                db.collection('students').doc(user).delete().then();
                admin.auth().deleteUser(user).then(() => {
                    return true;
                })
            }
        }
    })
})