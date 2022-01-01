const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const favicon = require('serve-favicon');
const port = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/login-api').then( ()=>{ console.log('db connected') } ).catch( (err)=>{ console.log(err) } );

const schema = new mongoose.Schema({
    Username: String,
    EmailId: String,
    Password: String,
});

const Api = new mongoose.model('Api',schema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'/views')));
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,'/partials'));

app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/',async(req,res)=>{
    try
    {
        const user = new Api({
            Username: req.body.Username,
            EmailId: req.body.EmailId,
            Password: req.body.Password
        });
        const result = await user.save();
        const data = await Api.find({});
        res.send(data);
    }
    catch(err){
        res.status(400).send(err);
    }
});
app.listen(port,(err)=>{
    if(err)
        console.log(err);
    else    
        console.log('listning');
});