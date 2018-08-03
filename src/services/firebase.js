import firebase from 'firebase'
import { rejects } from 'assert';

const config = {
    apiKey: "AIzaSyCfGksHS2BpYH6BXrqznpZWMlAwzrmtttU",
    authDomain: "reactfirebase-b16aa.firebaseapp.com",
    databaseURL: "https://reactfirebase-b16aa.firebaseio.com",
    projectId: "reactfirebase-b16aa",
    storageBucket: "reactfirebase-b16aa.appspot.com",
    messagingSenderId: "113538498979"
  };
  firebase.initializeApp(config);
  export default firebase

  //API
  const db = firebase.database().ref()
  const coursesRef = firebase.database().ref('cursos')


  export const getCourses = () => {
    return coursesRef.once('value')
    .then(snap=>{
      return snap.val()
    })
    .catch(e=>e)
  }

  export const getCourse = (key) => {
    return coursesRef.child(key).once('value')
    .then(snap=>{
      return snap.val()
    })
    .catch(e=>{
      console.log(e)
      return e
    })
  }

  export const saveCourse = (course) => {
    if(course._id) return updateCourse(course)
    return getKey(course)
  }

  const getKey = (course) => {
    const key = coursesRef.push().key
    course._id = key
    return saveCourse(course)
  }

  const updateCourse = (course) => {
    const key = course._id
    return coursesRef.child(key).set(course)
    .then(()=>{
      return key
    })
  }

  //users DB
  const getOrCreateUser = (user) => {
    const newUser = {
      _id: user.uid,
      uid: user.uid,
      displayName: user.displayName || null,
      email: user.email,
      photoURL: user.photoURL || null
    }
    return db.child('users').child(user.uid)
    .once('value')
    .then(snap=>{
      if(snap.val()) {
        localStorage.setItem('user', JSON.stringify(snap.val()))
        return snap.val()
      }
      db.child('users').child(newUser.uid).set(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      return newUser
    })
  }


  //Login
  export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      return getOrCreateUser(result.user)
    })

  }

  export const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      return getOrCreateUser(result.user)
    })

  }

  export const signInWithEmail = (auth) => {
    return firebase.auth()
    .createUserWithEmailAndPassword(auth.email, auth.password)
    .then(function(result) {
      auth.uid = result.user.uid
      return getOrCreateUser(auth)
      //return getOrCreateUser(result.user)
    })

  }


  export const logInWithEmail = (auth) => {
    return firebase.auth()
    .signInWithEmailAndPassword(auth.email, auth.password)
    .then(function(result) {
      return getOrCreateUser(result.user)
    })

  }

  





