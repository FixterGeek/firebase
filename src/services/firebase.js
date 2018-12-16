import firebase from 'firebase/app'
//migracion a firestore
import "firebase/firestore"
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
//fetching
import axios from 'axios'

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
  //const db = firebase.database().ref()
  const db = firebase.firestore()
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);

/* Configuración importante */
    // Old:
    // const date = snapshot.get('created_at');
    // // New:
    // const timestamp = snapshot.get('created_at');
    // const date = timestamp.toDate();



  //const coursesRef = firebase.database().ref('cursos')
  const coursesRef = db.collection('courses')
  //const coursesInfoRef = firebase.database().ref('cursosInfo')
  const coursesInfoRef = db.collection('coursesInfo')
  //const ordersRef = firebase.database().ref('orders')



  // export const getCourses = () => {
  //   return coursesRef.once('value')
  //   .then(snap=>{
  //     return snap.val()
  //   })
  //   .catch(e=>e)
  // }


  /* Public courses info and authors */

  export const getCoursesInfo = () => {
    return coursesInfoRef.get()
    .then(snap=>{
      const courses= []
      snap.forEach(doc=>{
        courses.push(doc.data())
      })
      return courses
    })
    .catch(e=>{
      console.log(e)
      return e
    })
  }

  export const getCourseInfo = (id) => {
    return coursesInfoRef.doc(id).get()
    .then(doc=>{
      return courseInfo(doc.data())
    })
    .catch(e=>{
      console.log(e)
      return e
    })
  }

  /* Public courses info and authors */


  export const getCourses = () => {
      const courses = []
      return coursesRef.get()
      .then(snap=>{
        snap.forEach(doc=>{
          const course = doc.data()
          course.uid = doc.id
          courses.push(course)
        })
        return courses
      })
      .catch(e=>e)
  }


  export const getCourse = (key) => {
    return coursesRef.doc(key).get()
    .then(doc=>{
      if(doc.exists) {
        return doc.data()
      }
      return null
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
    const key = coursesRef.doc().id
    course._id = key

    //de paso asignamos el autor
    const user = JSON.parse(localStorage.getItem('user'))
    course.author = user
    //
    return saveCourse(course)
  }

  const updateCourse = (course) => {
    const key = course._id
    return coursesRef.doc(key).set(course)
    .then(()=>{
      //add info
      //courseInfo(course)
      return key
    })
  }

  const courseInfo = (course) => {
    //tenemos un problema de deep relations !!!*****!!!!

    //do enaything necessary
    const c = {...course}
    //no queremos borrar los modulos, solo los links de los recursos
    //delete c.modules
    const modulesKeys = Object.keys(c.modules)
    for(let key of modulesKeys){
      const materialKeys = Object.keys(c.modules[key].materials)
      for(let i of materialKeys){
        delete c.modules[key].materials[i].link
      }
    }

    //solucion provisional - borrar links en el frontend
    return c
    //coursesInfoRef.doc(c._id).set(c)
  }

  //users DB
  const getOrCreateUser = (user) => {
    const newUser = {
      enrolled: [],
      _id: user.uid,
      uid: user.uid,
      displayName: user.displayName || null,
      email: user.email,
      photoURL: user.photoURL || null
    }
    return db.collection('users').doc(user.uid)
    .get()
    .then(doc=>{
      if(doc.exists) {
        localStorage.setItem('user', JSON.stringify(doc.data()))
        return doc.data()
      }
      db.collection('users').doc(newUser.uid).set(newUser)
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


  //Ventas

  // crear orden
  export const paymentAccepted = (data) => {
    const updates = {}
    //faking
    data.amount = 1000
    data.status = "PAID"
    data.date = Date.now()
    //const key = ordersRef.child(data.userId).push().key
    updates[`/orders/${data.userId}/${data.courseId}`] = data
    return db.update(updates)
    .then(()=>true)

   // return enrollUser(data)
  }
  // cambiar status de orden
  // reembolso
  // asignar ordenes a usuario
  // enrolar usuario

  //Esto se debe transformar en un cloud function!!! !!! !!! !!! urgente
  /*
  Ya es una cloud function
  */
  // const enrollUser = (data) => {
  //   const updates = {}
  //   updates[`/cursos/${data.courseId}/enrolled/${data.userId}`] = true
  //   return db.update(updates)
  //   .then(()=>{
  //     return data.courseId
  //   })
  // }
  


  /** Cupones
   * 
   */

   export const applyCoupon = (cupon) => {
    const url = 'https://us-central1-reactfirebase-b16aa.cloudfunctions.net/applyCoupon'
    return fetch(url, {
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({coupon:cupon})
    })
    .then(r=>{
        if(!r.ok) {
            return Promise.reject(r.statusText)
        }
        return r.json()
    })
    .then(res=>{
        return res
    })
   }

   export const enrollFreeUser = (user, course) => {
    const url = 'https://us-central1-reactfirebase-b16aa.cloudfunctions.net/enrollFreeUser'
    const body = {
      userId: user._id,
      courseId: course._id
    }
    return axios.post(url, body)
    .then(res=>{
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    })
    .catch(e=>{
      console.log(e)
      return e
    })
   }

  





