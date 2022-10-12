
const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const signout = document.querySelector('.signout');

// main execution
document.addEventListener('DOMContentLoaded', function () {
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

  try {
    let app = firebase.app();
    let features = [
      'auth',
      'database',
      'firestore',
      'functions',
      'messaging',
      'storage',
      'analytics',
      'remoteConfig',
      'performance',
    ].filter(feature => typeof app[feature] === 'function');
    console.log('Firebase SDK loaded with features:', features);
  } catch (e) {
    console.error(e);
  }

  authuser();
  debug();
});

// button events

document.querySelector('.test').addEventListener('click', (e) => {
  const test = firebase.functions().httpsCallable('test');
  test().then(response => {
    console.log("Function executed");
    console.log(response.data);
  })
  console.log("Test function executed");
})

signup.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const phno = form.phno.value;
  const role = form.role.value;
  console.log(name, email, password, phno, role);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      firebase.functions().httpsCallable('createUser')({
        name: name,
        email: email,
        phno: phno,
        role: role
      }).then(() => {
        console.log('user created');
        form.reset();
        setDisplay();
      }).catch((err) => {
        console.log(err);
      })
    }).catch(error => {
      console.log(error);
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
      signup.style.display = 'none';
      login.style.display = 'none';

      console.log('User is signed in');
      console.log(user)

      UUID = user.uid
      db.collection('users').doc(UUID).get().then(function (doc) {
        if (doc.exists) {
          console.log('Role: ', doc.data().role);
          if (doc.data().role == 'new') {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }
        else {
          console.log('New user!');
          document.addEventListener
        }
      })
    } else {
      UUID = false;
      signout.style.display = 'none';
      signup.appendChild(signupdoc);
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
}

