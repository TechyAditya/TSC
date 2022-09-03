// // const signout = document.querySelector('.signout');
// console.log(login)
// // main execution
document.addEventListener('DOMContentLoaded', function () {
    role = false
    db = firebase.firestore();

    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.firestore().doc('/foo/bar').get().then(() => { });
    // firebase.functions().httpsCallable('yourFunction')().then(() => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    // try {
    //     let app = firebase.app();
    //     let features = [
    //         'auth',
    //         'database',
    //         'firestore',
    //         'functions',
    //         'messaging',
    //         'storage',
    //         'analytics',
    //         'remoteConfig',
    //         'performance',
    //     ].filter(feature => typeof app[feature] === 'function');
    //     console.log('Firebase SDK loaded with features:', features);
    // } catch (e) {
    //     console.error(e);
    // }

    firebase.auth().onAuthStateChanged((user) => {
        const btn = document.getElementById('loginpg');
        if (user) {
            if (role == false) {
                firebase.auth().signOut().then()
            }
            else {
                db.collection(role).doc(user.uid).get().then((doc) => {
                    if (doc.exists) {
                        if (role == 'students') {
                            window.open("assets/student.html", "_self")
                        } else if (role == 'teachers') {
                            window.open("assets/teacher.html", "_self")
                        } else if (role == 'admin') {
                            window.open("assets/admin.html", "_self")
                        }
                    } else {
                        btn.innerHTML = "Log in";
                        btn.disabled = false;
                        warn.style.display = "block";
                        warn.innerHTML = "You are not registered as a " + role;
                        firebase.auth().signOut().then();
                    }
                })
            }
        }
    })

    const trigger = document.getElementById('loginbtn');
    trigger.addEventListener('click', (e) => {
        const btn = document.getElementById('loginpg');
        e.preventDefault();
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const form = document.getElementById('login');
            const emaill = form.email.value;
            const passwordd = form.password.value;
            const warn = document.getElementById('warn');
            console.log(emaill, passwordd, role);

            btn.innerHTML = "Logging in...";
            btn.disabled = true;
            role = form.role.value;
            console.log(emaill, passwordd, role);
            firebase.auth().signInWithEmailAndPassword(emaill, passwordd)
                .then(() => {
                }).catch((error) => {
                    warn.style.display = "block";
                    warn.innerHTML = error.message;
                    console.log(error)
                    btn.innerHTML = "Log in";
                    btn.disabled = false;
                });
        })
    });

    // debug();
});

function debug() {
    db.collection('admin').doc('xtnZlO0ewrfuzjuDbDBbZFAIkf33').get().then(function (doc) {
        if (doc.exists) {
            console.log(doc.data());
        }
    })

    //   authuser();
    //   debug();
};

// button events

// signup.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const form = e.target;
//   const name = form.name.value;
//   const email = form.email.value;
//   const password = form.password.value;
//   const phno = form.phno.value;
//   const role = form.role.value;
//   console.log(name, email, password, phno, role);
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((user) => {
//       console.log(user);
//       firebase.functions().httpsCallable('createUser')({
//         name: name,
//         email: email,
//         phno: phno,
//         role: role
//       }).then(() => {
//         console.log('user created');
//         form.reset();
//         setDisplay();
//       }).catch((err) => {
//         console.log(err);
//       })
//     }).catch(error => {
//       console.log(error);
//     })

// });

// login.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     console.log(email, password);
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((user) => {
//             console.log(user);
//             form.reset();
//             setDisplay();
//         }).catch(error => {
//             console.log(error);
//         })
// });
// const signout = document.getElementById('signoutbtn');
// signout.addEventListener('click', (e) => {
//   e.preventDefault();
//   firebase.auth().signOut().then(() => {
//     console.log('user signed out');
//   }).catch(error => {
//     console.log(error);
//   })
// });

// functions 

// function authuser() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             signout.style.display = 'block';
//             signup.style.display = 'none';
//             login.style.display = 'none';

//             console.log('User is signed in');
//             console.log(user)

//             UUID = user.uid
//             db.collection('users').doc(UUID).get().then(function (doc) {
//                 if (doc.exists) {
//                     console.log('Role: ', doc.data().role);
//                     if (doc.data().role == 'new') {
//                         // doc.data() will be undefined in this case
//                         console.log('No such document!');
//                     }
//                 }
//                 else {
//                     console.log('New user!');
//                     document.addEventListener
//                 }
//             })
//         } else {
//             UUID = false;
//             signout.style.display = 'none';
//             signup.appendChild(signupdoc);
//             login.style.display = 'block';
//         }
//     })
// }



    // let mm = db.collection('class/10/CBLRyMKrvEStF1g2Dkmb8MKOVCP2').doc('marks');
    // db.collection('students/CBLRyMKrvEStF1g2Dkmb8MKOVCP2/marks').add({marks: mm})

    // db.collection('users').doc('aditya').get().then(function (doc) {
    //   if (doc.exists) {
    //     console.log('Document data:', doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log('No such document!');
    //   }
    // }
    // );
// }

