
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Admin:Onkar123@cluster0.ekff9.mongodb.net/DonateDB", {useNewUrlParser: true})

const donatesSchema = mongoose.Schema({
    name: String,
    email: String,
    phoneNo: Number,
    address: String,
    amount: Number,
    otheramount: Number
});

const Donate = mongoose.model("Donate" , donatesSchema);

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html");
})

app.get("/Donate" , function(req , res){
    res.sendFile(__dirname + "/Donate.html");
})

app.post("/Donate" , function(req,res){
    console.log(req.body.Donation)
    const donateName = (req.body.Name);
    const donateEmail = (req.body.Email);
    const donatePhoneNumber = (req.body.PhoneNo);
    const donateAddress = (req.body.Address);
    const donateAmount = (req.body.Donation);
    const donateOtherAmount = (req.body.Manual_Donation);
    const donate = new Donate({
        name:donateName,
        email:donateEmail,
        phoneNo: donatePhoneNumber,
        address: donateAddress,
        amount: req.body.Donation,
        otheramount: donateOtherAmount
    });
    donate.save(function(err){
        if(!err){
            res.redirect("https://rzp.io/l/ppomtk7E")
        }else{
            console.log(err);
        }
    });
});

app.listen(process.env.PORT || 3000 , function(){
    console.log("Server has Started");
});