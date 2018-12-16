const functions = require("firebase-functions");
const transport = require("nodemailer").createTransport({
  service: "Gmail",
  auth: {
    user: "fixtermailer@gmail.com",
    pass: "Superman77"
  }
});
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: true
});

const config = {
  apiKey: "AIzaSyCfGksHS2BpYH6BXrqznpZWMlAwzrmtttU",
  authDomain: "reactfirebase-b16aa.firebaseapp.com",
  databaseURL: "https://reactfirebase-b16aa.firebaseio.com",
  projectId: "reactfirebase-b16aa",
  storageBucket: "reactfirebase-b16aa.appspot.com",
  messagingSenderId: "113538498979"
};

var conekta = require("conekta");

admin.initializeApp(config);

/*
estoy en la version anterior y tengo una mezcla 
de cosas porque inicializo con la nueva pero el snap es dle viejo =S
*/

exports.enrollUser = functions.database
  .ref("/orders/{userId}/{pushId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to the Realtime Database.
    //   console.log('test', snap.data.val())
    //   console.log('snap', snap)
    const { userId } = snap.params;
    const { courseId } = snap.data.val();
    console.log("user", userId);
    console.log("curso", courseId);
    //   // You must return a Promise when performing asynchronous tasks inside a Functions such as
    //   // writing to the Firebase Realtime Database.
    //   // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    //   //return snapshot.ref.parent.child('uppercase').set(uppercase);
    return admin
      .database()
      .ref("/cursos")
      .child(courseId)
      .child("enrolled")
      .child(userId)
      .set(true)
      .then(() => true);
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* Cobro con Conekta */

exports.applyCoupon = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    //cors

    const coupon = req.body.coupon;
    console.log(coupon);
    if (!coupon)
      return res
        .status(301)
        .send({ message: "No se proporcionó ningun cupon" });
    admin
      .firestore()
      .collection("cupons")
      .doc(coupon)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("no existe D=");
          return res.status(301).send({ message: "El cupon no existe" });
        }
        console.log(doc.data());
        return res.send(doc.data());
      })
      .catch(e => {
        console.log(e);
        return res.status(500).send({ error: e });
      });

    //res.status(200).send({message:"Segun simon"});

    // const coupon = req.body.coupon
    // return admin.firestore().collection('coupons').doc(coupon).get()
    // .then(snap=>{
    //   return res.send(snap.val())
    // })
    // .catch(e=>console.log(e))
  }); // cors
});

exports.makeCharge = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    conekta.api_key = "key_sqCLgHarDSoaR2PWKsTZoA";
    conekta.api_version = "2.0.0";
    //save token,
    const { token, courseId } = req.body;
    //get price
    //functions.firestore.document('courses/' + courseId)
    //get discount

    //make charge
    conekta.Order.create(
      {
        currency: "MXN",
        customer_info: {
          name: "Héctor BlisS",
          phone: "+527712412825",
          email: "bliss@ironhack.com"
        },
        line_items: [
          {
            name: "Box of Cohiba S1s",
            unit_price: 350,
            quantity: 1
          }
        ],
        charges: [
          {
            payment_method: {
              type: "card",
              payment_source_id: token
            }
          }
        ]
      },
      function(err, order) {
        if (err) return res.send(err);
        console.log(order.toObject());
        return res.send(order.toObject());
      }
    );
  });

  //on success, add the course to user,
  //answere

  //res.json({body:req.body,query:req.query})

  // functions.firestore.document('courses/' + req.query.id)
  // .get(snap=>{
  //   res.send(snap.val());
  // })
});

/* Cobro con Conekta */

//free courses enrollment

exports.enrollFreeUser = functions.https.onRequest((req, res) => {
  console.log(req.body);
  //enrolling
  cors(req, res, () => {
    const course = admin
      .firestore()
      .collection("courses")
      .doc(req.body.courseId);
    const user = admin
      .firestore()
      .collection("users")
      .doc(req.body.userId);
    Promise.all([user.get(), course.get()])
      .then(result => {
        const u = result[0].data();
        const c = result[1].data();
        console.log("user: ", u);
        console.log("course: ", c);
        if (!c.enrolled) c.enrolled = {};
        if (!u.enrolled) u.enrolled = {};
        c.enrolled[u._id] = true;
        u.enrolled[c._id] = true;
        course.set(c);
        user.set(u);
        return res.status(200).send(u);
      })
      .catch(e => {
        console.log(e);
        return res.status(500).send(e);
      });
  });
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return sendWelcomeMail().then(r => {
      return res.send("Enviado");
    });
  });
});

function sendWelcomeMail() {
  return transport
    .sendMail({
      to: "bliss@ironhack.com",
      subject: "test",
      html: template1
    })
    .then(r => console.log(r))
    .catch(e => console.log(e));
}

const template1 = `
<html >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">


    <style type="text/css">
        img { max-width: 600px; outline: none; text-decoration: none;
            -ms-interpolation-mode: bicubic;}
        a img { border: none; }
        table { border-collapse: collapse !important; }
        #outlook a { padding:0; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass {width:100%;}
        .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
        table td {border-collapse: collapse;}
        .ExternalClass * {line-height: 115%;}
        /* Estilos */
        td {
            font-family: Arial, sans-serif;
        }
        body {
            -webkit-font-smoothing:antialiased;
            -webkit-text-size-adjust:none;
            width: 100%;
            height: 100%;
            color: #6f6f6f;
            font-weight: 400;
            font-size: 18px;
        }
        h1 {
            margin: 10px 0;
        }
        a {
            color: #27aa90;
            text-decoration: none;
        }
        .force-full-width {
            width: 100% !important;
        }
        .body-padding {
            padding: 0 75px;
        }
        .force-width-80 {
            width: 80% !important;
        }
    </style>

    <style type="text/css" media="screen">
        @media screen {
        @import
        url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
            /* Shit para Outlook 2013! */
            * {
                font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial',
                'sans-serif' !important;
            }
            .w280 {
                width: 280px !important;
            }
        }
    </style>

    <style type="text/css" media="only screen and (max-width: 480px)">
        /* Estilos para celular */
        @media only screen and (max-width: 480px) {
            table[class*="w320"] {
                width: 320px !important;
            }
            td[class*="w320"] {
                width: 280px !important;
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            img[class*="w320"] {
                width: 250px !important;
                height: 67px !important;
            }
            td[class*="mobile-spacing"] {
                padding-top: 10px !important;
                padding-bottom: 10px !important;
            }
            *[class*="mobile-hide"] {
                display: none !important;
            }
            *[class*="mobile-br"] {
                font-size: 12px !important;
            }
            td[class*="mobile-w20"] {
                width: 20px !important;
            }
            img[class*="mobile-w20"] {
                width: 20px !important;
            }
            td[class*="mobile-center"] {
                text-align: center !important;
            }
            table[class*="w100p"] {
                width: 100% !important;
            }
            td[class*="activate-now"] {
                padding-right: 0 !important;
                padding-top: 20px !important;
            }
            td[class*="mobile-resize"] {
                font-size: 22px !important;
                padding-left: 15px !important;
            }
        }
    </style>
</head>
        <body  offset="0" class="body" style="padding:0; margin:0;
        display:block; background:#eeebeb; -webkit-text-size-adjust:none"
               bgcolor="#eeebeb">
        <table align="center" cellpadding="0" cellspacing="0" width="100%"
               height="100%">
            <tr>
                <td align="center" valign="top" style="background-color:#eeebeb"
                    width="100%">

                    <center>

                        <table cellspacing="0" cellpadding="0" width="600" class="w320">
                            <tr>
                                <td align="center" valign="top">


                                    <table style="margin:0 auto;" cellspacing="0"
                                           cellpadding="0" width="100%"></table>
                                    <table cellspacing="0" cellpadding="0" width="100%"
                                           style="">
                                        <tr>
                                            <td >
                                                <table cellspacing="0" cellpadding="0" width="100%">
                                                    <tr>
                                                        <td>
                                                            <img width="100%" src="./banner.png" alt="">
                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>
                                    </table>

                                    <table cellspacing="0" cellpadding="0"
                                           class="force-full-width" bgcolor="#ffffff" >
                                        <tr>
                                            <td style="background-color:#ffffff;">
                                                <br><br>

                                                <center>

                                                    <table style="margin: 0 auto" cellpadding="0"
                                                           cellspacing="0" class="force-width-80">




                                                        <tr><td class="mobile-resize" style="
        font-size: 20px; font-weight: 600;  text-align: center;
        vertical-align: top;">
                                                        </td></tr>
                                                        <tr>
                                                            <td class="mobile-resize" style="color:#ffa711;
        <!--font-size: 20px; font-weight: 600;  text-align: center;
        <!--vertical-align: top;">
                                                                ¡Bienvenido a FirebaseMx!
                                                            </td>
                                                        </tr>
                                                        <!-- <tr>
                                                      <td class="mobile-resize" style="color:#27aa90;
                                   font-size: 20px; font-weight: 600;  text-align: center;
                                   vertical-align: top;">
                                                          Felicidades! Has obtenido una beca del 20% para el FixterCamp#4
                                                      </td>
                                                        </tr> -->
                                                    </table>

                                                    <table style="margin: 0 auto;" cellspacing="0"
                                                           cellpadding="0" class="force-width-80">
                                                        <tr>
                                                            <td style="text-align:justify; color: #6f6f6f;">
                                                                <br>
                                                                Estamos felices de que te hayas unido a FirebaseMx Learning Platform,
                                                                ahora eres parte de la comunidad más grande de Firebase en México.
                                                                <br>
                                                                <br>
                                                                ¿Empezamos?
                                                                <br>
                                                                <br>
                                                                Entra a firebasemx.com y explora todos los beneficios que tenemos para ti:
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </center>

                                                <br>


                                                <table style="margin: 0 auto;" cellspacing="0"
                                                       cellpadding="0" class="force-width-80">
                                                    <tr>
                                                        <td style="display:flex; margin-top: 15px; font-size:12px; text-align: center;
        padding-right: 20px;">
                                                            <img width="100" height="80"
                                                                 src="./curso.png"
                                                                 alt="User Profile">
                                                        </td>
                                                        <td style="text-align:justify; color: #6f6f6f;">

                                                            <b>Cursos en línea</b>

                                                            <br>
                                                            Encuentra cursos básicos, intermedios y avanzados sobre la integración de
                                                            Firebase con otras herramientas.
                                                        </td>
                                                    </tr>
                                                </table>

                                                <table style="margin: 0 auto;" cellspacing="0"
                                                       cellpadding="0" class="force-width-80">
                                                    <tr>
                                                        <td style="margin-top:35px; display:flex;font-size:12px; text-align: left;
        padding-right: 20px;">
                                                            <img  style="margin-left: 10px; margin-right: 10px"  width="80" height="70"
                                                                 src="./certy.png"
                                                                 alt="User Profile">
                                                        </td>
                                                        <td style="text-align:justify; color: #6f6f6f;">
                                                            <br>
                                                            <b>Certificados</b>
                                                            <br>
                                                            Después de finalizar cada curso, podrás descargar un certificado de que
                                                            has concluido satisfactoriamente el curso.
                                                        </td>
                                                    </tr>
                                                </table>

                                                <table style="margin: 0 auto;" cellspacing="0"
                                                       cellpadding="0" class="force-width-80">
                                                    <tr>
                                                        <td style="margin-top:75px; display:flex; font-size:12px; text-align: center;
        padding-right: 20px;">
                                                            <img width="100" height="80"
                                                                 src="./comunity.png"
                                                                 alt="User Profile">
                                                        </td>
                                                        <td style="text-align:justify; color: #6f6f6f;">
                                                            <br>
                                                            <b>Comunidad</b>

                                                            <br>
                                                            Como desarrolladores nos enfrentemos a bugs y errores que en ocasiones
                                                            nos lleva tiempo resolvaer, pero, resolverlo en comunidad es mucho más sencillo.
                                                            Así que sé parte de nuestros grupos privados y acude a todos nuestros eventos.

                                                        </td>
                                                    </tr>
                                                </table>

                                                <table style="margin: 0 auto;" cellspacing="0"
                                                       cellpadding="0" class="force-width-80">
                                                    <tr>
                                                        <td style="margin-top:45px; display:flex; font-size:12px; text-align: center;
        padding-right: 20px;">
                                                            <img style="margin-left: 10px; margin-right: 10px" width="80" height="100"
                                                                 src="./calendar.png"
                                                                 alt="User Profile">
                                                        </td>
                                                        <td style="text-align:justify; color: #6f6f6f;">
                                                            <br>
                                                            <b>Eventos</b>
                                                            <br>
                                                            Somos una comunidad muy activa, así que tenemos eventos mensuales a los que podrás registrarte de forma preferente.
                                                            Y no importa que no estes en CDMX, hacemos eventos en diversos estados de la república.
                                                            <br><br>
                                                            <br>
                                                            <br>

                                                        </td>
                                                    </tr>
                                                </table>
                                                <center>
                                                    <table style="margin: 0 auto;" cellspacing="0"
                                                           cellpadding="0" class="force-width-80">
                                                        <tr>
                                                            <td style="text-align:justify; color: #6f6f6f;">

                                                                <center>Entra a tu cuenta                                                                  y empieza ya a disfrutar los cursos que tenemos para ti.
                                                                    <b style="color:orange"></b></center>

                                            </td>
                                        </tr>
                                    </table>
                                    <br>

                                    <table style="margin: 0 auto" cellpadding="0"
                                           cellspacing="0" class="force-width-80">
                                        <tr>

                                        </tr>
                                        <tr>

                                        <tr>
                                            <td class="mobile-resize" style="color:#27aa90;
        font-size: 20px; font-weight: 600;  text-align: center;
        vertical-align: top;">

                                                <a href="https://www.firebasemx.com"

                                                   style="background-color:#ffa711;color:#ffffff;display:inline-block;font-family:'Source
        Sans Pro', Helvetica, Arial,
        sans-serif;font-size:18px;font-weight:400;line-height:45px;tex80align:center;text-decoration:none;width:250px;-webkit-text-size-adjust:none;">¡Empieza ahora!</a>



                                            </td>
                                        </tr>


                                    </table>
                    </center>
                    <center>
                        <table style="margin: 0 auto;" cellspacing="0"
                               cellpadding="0" class="force-width-80">
                            <tr>
                                <td style="text-align:justify; color: #6f6f6f;">
                                    Convierte el 2019 en tu año, obten un mejor empleo,
                                    comienza tu propio negocio, funda tu startup o hazla crecer,
                                    en FirebaseMx te daremos las herramientas necesarias para hacerlo.  🍕
                                </td>
                                <br>
                            </tr>
                            <tr>

                            </tr>
                            <tr>
                                <td><br></td>
                            </tr>
                        </table>
                    </center>
                    <table cellspacing="0" cellpadding="0"
                           bgcolor="#363636"  class="force-full-width">
                        <tr>
                            <td style="background-color:#363636; text-align:center;">
                                <br>
                                <br>
                                <a href="https://www.facebook.com/firebasemexico/" target="_blank">
                                    <img
                                     style="margin:0 3px" height="20" color="green"
                                        src="./facebook.png"></a>
                                <a href="https://twitter.com/FirebaseMexico_?lang=es_" target="_blank">
                                    <img  style="margin:0 3px"
                                             height="20" color="green"
                                            src="./twitter-brands.png">
                                </a>
                                <a href="https://www.linkedin.com/company/firebase-mexico/" target="_blank">
                                    <img  style="margin:0 3px"
                                             height="20" color="green"
                                            src="./linkedin-in-brands.png">
                                </a>
                                <a href="http://www.twitter.com/fixter_" target="_blank">
                                    <img  style="margin:0 3px"
                                             height="20" color="green"
                                            src="./u2.png">

                                </a>              <br>
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td style="color:#f0f0f0; font-size: 14px;
        text-align:center; padding-bottom:4px;">
                                © 2016 Todos los derechos reservados
                            </td>
                        </tr>
                        <tr>
                            <td style="color:#ffa711; font-size: 14px;
        text-align:center;">
                                <a href="http://www.firebasemx.com" style="color:#ffa711">FirebaseMx</a>
                                | <a href="mailto:admin@fixter.org" style="color:#ffa711">Contacto</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size:12px;">
                                &nbsp;
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        </td>
        </tr>
        </table>
        </center>
        </td>
        </tr>
        </table>
        </body>
</html>
`;
