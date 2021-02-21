const express=require('express');
const app=express();
const address='127.0.0.1';
const port=8000;
const pug=require('pug');
const path=require('path');
const bodyParser=require("body-parser")

// connection to mogodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rAju', {useNewUrlParser: true,useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
  // console.log("we're connected!")
// });

// schema for data formate
const danceSchema = new mongoose.Schema({
    name: String,
    gender: String,
    address: String,
    phone: String,
    email: String,
  });

const contact = mongoose.model('contact', danceSchema);


// middleware
app.use('/static',express.static('static'));
app.use(express.urlencoded());
// app.use(bodyParser);

// pug realated stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const  params={};
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const  params={};
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    // console.log(req.body)
    // const  params={};
    // res.status(200).render('contact.pug');
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("ur data has been saved")
    }).catch(()=>{
        res.status(404).send("ur data was not saved in database")
    })


})

app.listen(port,address,()=>{
    console.log(`Server is running at https://${address}:${port}`)
})