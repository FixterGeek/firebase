const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const cors = require('cors')({
  origin: true,
});

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



/* Cobro con Conekta */

var conekta = require('conekta');
conekta.api_key = 'key_sqCLgHarDSoaR2PWKsTZoA';
conekta.api_version = '2.0.0';

exports.applyCoupon = functions.https.onRequest((req,res)=>{

cors(req, res, () => { //cors

    const coupon = req.body.coupon
    console.log(coupon)
    if(!coupon) return res.status(301).send({message:"No se proporcionó ningun cupon"})
    admin.firestore().collection('cupons').doc(coupon).get()
    .then(doc=>{ 
      if(!doc.exists) {
        console.log("no existe D=")
        return res.status(301).send({message:"El cupon no existe"})
        
      }
      console.log(doc.data())
      return res.send(doc.data())
      
     })
    .catch(e=>{
      console.log(e)
      return res.status(500).send({error:e})
      
    })

    //res.status(200).send({message:"Segun simon"});


    // const coupon = req.body.coupon
    // return admin.firestore().collection('coupons').doc(coupon).get()
    // .then(snap=>{
    //   return res.send(snap.val())
    // })
    // .catch(e=>console.log(e))

})// cors

});

exports.makeCharge =  functions.https.onRequest((req, res) => {
  
  res.json({body:req.body,query:req.query})

  // functions.firestore.document('courses/' + req.query.id)
  // .get(snap=>{
  //   res.send(snap.val());
  // })

//   const order = conekta.Order.create({
//     "line_items": [{
//         "name": "Tacos",
//         "unit_price": 1000,
//         "quantity": 12
//     }],
//     "shipping_lines": [{
//         "amount": 1500,
//         "carrier": "FEDEX"
//     }], //shipping_lines - physical goods only
//     "currency": "MXN",
//     "customer_info": {
//      "customer_id": "cus_2fkJPFjQKABcmiZWz"
//     },
//     "shipping_contact":{
//      "address": {
//        "street1": "Calle 123, int 2",
//        "postal_code": "06100",
//        "country": "MX"
//      }
//    },  //shipping_contact - required only for physical goods
//   "metadata": { "description": "Compra de creditos: 300(MXN)", "reference": "1334523452345" },
//   "charges":[{
//     "payment_method": {
//       "type": "default"
//     }  //payment_methods - use the customer's default - a card
//        //to charge a card, different from the default,
//        //you can indicate the card's source_id as shown in the Retry Card Section
//   }]
// }, function(err, res) {
//     if(err){
//       console.log(err);
//       return;
//     }
//     console.log(res.toObject());
// });

  
 
}); 

/* Cobro con Conekta */


//free courses enrollment

exports.enrollFreeUser =  functions.https.onRequest((req, res) => {
  console.log(req.body)
  //enrolling
  cors(req,res,()=>{
    const course = admin.firestore().collection('courses').doc(req.body.courseId)
    const user = admin.firestore().collection('users').doc(req.body.userId)
    Promise.all([user.get(), course.get()])
    .then(result=>{
      const u = result[0].data()
      const c = result[1].data()
      console.log("user: ", u)
      console.log("course: ", c)
      if(!c.enrolled) c.enrolled={}
      if(!u.enrolled) u.enrolled={}
      c.enrolled[u._id] = true
      u.enrolled[c._id] = true
      course.set(c)
      user.set(u)
      return res.status(200).send(u)
    })
    .catch(e=>{
      console.log(e)
      return res.status(500).send(e)
    })

  })
})

