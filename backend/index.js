const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();
require("./models/userDetails");
const User = mongoose.model("UserDetail");

const MongoClient = require('mongodb').MongoClient;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



 
const loginRouter = require ('./routes/login')
app.use ('/login', loginRouter); 
const accountRouter = require ('./routes/account')
app.use ('/account', accountRouter);
const registerRouter = require ('./routes/register')
app.use ('/signup', registerRouter); 

const jwt = require("jsonwebtoken"); 
var nodemailer = require("nodemailer");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const port =  5000;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
mongoose.connection.once('open', () => {console.log("MongoDB database connection established successfully");})

 

const newPromise = new Promise((resolve, reject) => {
  let ttcBus = [];
   
   fetch('https://alerts.ttc.ca/api/alerts/list', {
    method: "GET",
    crossDomain: true,
  })
  .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        
        for (let i = 0; i < data.routes.length; i++){ 
        const route = data.routes[i].route;
        ttcBus.push(route);
        }        
        resolve( ttcBus);      
      })
      .catch((err) => {
        console.log(err);
      });      
})
.then ((ttcBus) =>{
  const client = new MongoClient(uri, { useNewUrlParser: true });
  let userBus = [];
  let userEmail = [];

  const collection2 = client.db("test").collection("TTCInfo").find()
  console.log ("Prefrences: ");
  collection2.forEach(function(doc) {
      if (typeof doc.bus =='object' && doc.bus != null){
        userBus.push(doc.email);
        userBus.push(doc.bus);   
        } 

    
  }); 
  setTimeout(() => {
        console.log(userBus, ttcBus)
      for (let i = 1; i < (userBus.length); i=i+2) {

        for (let j = 0; j < userBus[i].length; j++) {
         
                ttcBus.forEach((element) => {
                  if ( (typeof userBus[i][j].value) != null && ( userBus[i][j].value) == element) {
                    console.log ("We need to email     " + userBus[i-1]+"    since an alert was DETECTED for: ",element)
                                                


                           

                  } 
                }) 
        }
      }
      }, 2000);
})




const msg = {
  // to: userBus[i-1],
  to: 'ar.azam2003@gmail.com',
  from: 'aazam.amirreza@gmail.com',
  subject: 'ALERT',
  text: "We need to email       since an alert was DETECTED for: ",
  html: '<p>Hello HTML world!</p>',
};

sgMail.send(msg).then(() => {
  console.log('Email sent successfully');
}).catch((error) => {
  console.log('Email was not sent successfully');
  console.error(error);
});




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Unused code for now but I will make the routes for them later.
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User does not exist!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adarsh438tcsckandivali@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});




// const nodemailer = require('nodemailer');

async function sendEmail() {
  // Create a transporter object
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true,
    auth: {
      user: 'aazam.amirreza@yahoo.com',
      pass: 'a9174734903'
    }
  });

  // Define the email options
  let mailOptions = {
    from: '"Amir" aazam.amirreza@gmail.com',
    to: 'ar.azam2003@gmail.com',
    subject: 'ALERT',
    text: 'We need to email       since an alert was DETECTED for:',
    html: '<p>HTML hellowww</p>'
  };

  // Send the email
  let info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);
}

//  sendEmail();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDsWHjAF6S5t_60sFIAjr2-siWsm6xo4ac",
//   authDomain: "tracktc-70ee2.firebaseapp.com",
//   projectId: "tracktc-70ee2",
//   storageBucket: "tracktc-70ee2.appspot.com",
//   messagingSenderId: "1046834745197",
//   appId: "1:1046834745197:web:64faf1c7cf398677209464",
//   measurementId: "G-B78HM6MX3F"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


//  client.connect(err => {
//     console.log("MongoDB database connection established successfully");
// // const collection = client.db("test").collection("TTCInfo").countDocuments()
// //   collection.then((data)=>{
// //     console.log(data)
// //     for (let i = 0; i < data; i++){
// //       client.db("test").collection("TTCInfo").
// //     }
// //   })
// const collection2 = client.db("test").collection("TTCInfo").find()
// console.log ("Prefrences: ");
// collection2.forEach(function(doc) {
//   // console.log(doc.bus);
//   const userBus = doc.bus;
//   // console.log(typeof doc.bus)
//   if (typeof doc.bus =='object' && doc.bus != null){
//     const userBus = doc.bus;
//     console.log(userBus); 
//     for (const obj of userBus) {
//       console.log(obj.value);
//     }
//   }
// });
// });




   // const collection = client.db("test").collection("TTCInfo").countDocuments()
      //   collection.then((data)=>{
      //     console.log(data)
      //     for (let i = 0; i < data; i++){
      //       client.db("test").collection("TTCInfo").
      //     }
      //   })











      /* 
      async function mongooseConnection(){
        let ttcBus = [];
    await function ttcAlerts(){
     fetch('https://alerts.ttc.ca/api/alerts/list', {
      method: "GET",
      crossDomain: true,
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
    })
    .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          
          for (let i = 0; i < data.routes.length; i++){ //meant to store all ttc alerts in a global array
          const route = data.routes[i].route;
          ttcBus.push(route);
          }
          ///FIXME: alert bus export
          // console.log(ttcBus);
          console.log ("Alert busses: ")
          // for (const obj of ttcBus) {
          //   console.log(obj);
          // }
                    
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(ttcBus);
        return ttcBus;
  }
      const client = new MongoClient(uri, { useNewUrlParser: true });
      // const ttcAlerts = ttcAlerts();
      setTimeout(()=>{console.log(ttcBus)}, 3000)
      // console.log(ttcBus)
      let userBus = [];
      let userEmail = [];

      const collection2 = client.db("test").collection("TTCInfo").find()
      console.log ("Prefrences: ");
      collection2.forEach(function(doc) {
        for (const obj of doc.email) {
          userEmail.push(obj)
        }
        for (const obj of doc.bus) {
          if (typeof obj =='object' && obj != null){
            userBus.push(obj);   
            }
        }
        
        // console.log(doc)
        // for (const obj of doc) {
        //   console.log(doc.email);}
        ///FIXME: email export
        // console.log(doc.email)
        if (typeof doc.bus =='object' && doc.bus != null){
          ///FIXME: pref export
          for (const obj of doc.bus) {
            // console.log(obj.value);  
          }
          
        }
      });
}
      */