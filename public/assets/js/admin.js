// firebase.functions().useEmulator("localhost", 5001);
const login = document.querySelector('.login');
const signup = document.querySelector('.signupform');
const signout = document.querySelector('.signout');

// main execution
document.addEventListener('DOMContentLoaded', function () {
  db = firebase.firestore();

  authuser();
  debug();
  if (firebase.auth().currentUser !== null)
    console.log("user id: " + firebase.auth().currentUser.uid);
  else
    console.log("user not logged in");
});

signup.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  console.log(form)
  const name = form.name.value;
  const email = form.email.value;
  const psw = form.psw.value;
  const phone = form.phone.value;
  const role = 'student';
  const batch = form.batch.value;
  const classno = form.classno.value;
  console.log(name, email, psw, phone, role, batch, classno);
  firebase.auth().createUserWithEmailAndPassword(email, psw)
    .then((user) => {
      console.log(user);
      firebase.functions().httpsCallable('createStudent')({
        name: name,
        email: email,
        phone: phone,
        role: role,
        batch: batch,
        classno: classno
      }).then(() => {
        console.log('user created');
        form.reset();
      }).catch((err) => {
        console.log(err);
      })
      //   const uid = user.user.uid;
      //   db.collection(role).doc(uid).set({
      //     name: name,
      //     email: email,
      //     phone: phone
      //   }).then(() => {
      //     if (role == 'student') {
      //       const batch = form.batch.value;
      //       const classno = form.classno.value;
      //       db.collection(role).doc(uid).set({
      //         classno: classno,
      //         batch: batch,
      //         marks: []
      //       }).then()
      //     } else if (role == 'teacher') {
      //       db.collection(role).doc(uid).set({
      //         rating: 0.0,
      //         classes: [],
      //         subjects: []
      //       }).then()
      //     }
      //   }).catch(error => {
      //     log.write(error);
      //   })
      // }).catch(error => {
      //   console.log(error);
    })
});

login.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;
  console.log(email, password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      form.reset();
      setDisplay();
    }).catch(error => {
      console.log(error);
    })
});

signout.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(() => {
    console.log('user signed out');
    setDisplay();
  }).catch(error => {
    console.log(error);
  })
});

// functions 

function authuser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      signout.style.display = 'block';
      // signup.style.display = 'none';
      login.style.display = 'none';

      console.log('User is signed in');
      console.log(user)

      UUID = user.uid
      db.collection('admin').doc(UUID).get().then(function (doc) {
        if (doc.exists) {
          console.log("Logged in as admin");
        }
        else {
          console.log('Not admin');
        }
      })
    } else {
      UUID = false;
      signout.style.display = 'none';
      // signup.style.display = 'block';
      login.style.display = 'block';
    }
  })
}

function debug() {
  db.collection('students').doc('CBLRyMKrvEStF1g2Dkmb8MKOVCP2').get().then(function (doc) {
    if (doc.exists) {
      doc.data().marks.get().then(doc => {
        console.log(doc.data());
      })
    }
  })
}
