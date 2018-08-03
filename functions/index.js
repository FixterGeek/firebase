const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

const config = {
    apiKey: "AIzaSyCfGksHS2BpYH6BXrqznpZWMlAwzrmtttU",
    authDomain: "reactfirebase-b16aa.firebaseapp.com",
    databaseURL: "https://reactfirebase-b16aa.firebaseio.com",
    projectId: "reactfirebase-b16aa",
    storageBucket: "reactfirebase-b16aa.appspot.com",
    messagingSenderId: "113538498979"
  };

admin.initializeApp(config);

/*
estoy en la version anterior y tengo una mezcla 
de cosas porque inicializo con la nueva pero el snap es dle viejo =S
*/

exports.enrollUser = functions.database.ref('/orders/{userId}/{pushId}')
    .onCreate((snap, context) => {
       // Grab the current value of what was written to the Realtime Database.
    //   console.log('test', snap.data.val())
    //   console.log('snap', snap)
      const {userId} = snap.params
      const {courseId} = snap.data.val()
      console.log('user', userId)
      console.log('curso',courseId)
    //   // You must return a Promise when performing asynchronous tasks inside a Functions such as
    //   // writing to the Firebase Realtime Database.
    //   // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    //   //return snapshot.ref.parent.child('uppercase').set(uppercase);
      return admin.database().ref('/cursos')
        .child(courseId)
        .child('enrolled')
        .child(userId)
        .set(true)
        .then(()=>true)
    });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
