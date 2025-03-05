// const express = require('express');
// const mongoos = require('mongoose');
// const bodyParser = require('body-parser');
// const homeRoutes = require('./routers/home');

// const app = express();
// const port =3002;

// mongoos.connect("mongodb://localhost:27017/studentdetails", {useNewUrlParser : true})
// const db = mongoos.connection;
// db.on('eror',()=>{
//     console.log("Err is ");
// })
// db.once('open',()=>{
//     console.log("Connected");
// })

// app.set('view engine','ejs');
// app.use(express.static('public'))

// // body parser 
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())



// app.use('/' , homeRoutes)

// app.listen(port)



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRoutes = require('./routers/home');
const serverless = require('serverless-http');  // Import serverless-http


const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 3002; // Netlify assigns the PORT dynamically
=======
const port =3004;
app.use('/uploads', express.static('uploads'));

>>>>>>> 12c2209c266d588f9e452c5b706dd1a3da883db1

mongoose.connect("mongodb://localhost:27017/studentdetails", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => {
    console.log("Error is ");
});
db.once('open', () => {
    console.log("Connected");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', homeRoutes);

// Wrap your app with serverless-http
module.exports.handler = serverless(app);
