const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin');
const Form = mongoose.model("Form");
const fs = require('fs');

require('dotenv').config();


router.post('/form/create', requirelogin, (req, res) => {

    console.log(req.body)
    const newform = new Form({
        formname:req.body.name,
        students:req.body.students,
        questions:req.body.questions,
        created_by: req.user.email
    });
    newform.save().then(doc => {
        res.json({ newform: doc })
    }).catch(err => {
        console.log(err)
    })
})

//get forms of admin
router.get('/getallform', requirelogin, (req, res) => {
    if(!req.user){
        console.log("no logged")
    }else{
        console.log("hiii")
        Form.find({ created_by: req.user.email }, function (err, doc) {
            if (!doc) {
                console.log("no docs")
                res.json({ message: "You haven't added any form yet" })
            }
            console.log(err)
            res.json({ myforms: doc })
            console.log(doc)
        })
    }
    
})

//get form by id
router.get('/getformbyid/:id', requirelogin, (req, res) => {
    Form.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);

        } else {
            console.log(err);
        }

    });
})

router.post('/addResponse/:id',requirelogin,function(req,res){
    var obj = req.body.row;
    path = './'+req.params.id+'.csv'
    if(fs.existsSync(path)){
        fs.appendFile(path,"\n" +obj, (err) => {
            if (err) console.error('Couldn\'t append the data');
            console.log('The data was appended to file!');
        });
    }
    else{
        var headers = ["Score","Summary","Text"]
        for(var i =0;i<req.body.len;i++){
            if(i=0){
                headers.push("ans")
            }else{
                headers.push("ans"+i)
            }
        }
        var res = headers.join(",")+"\n"+obj
        fs.appendFile(path,res, (err) => {
            if (err) console.error('Couldn\'t append the data');
            console.log('The data was appended to file!');
        });
    }

})


router.get('/analyse/:id',requirelogin,(req,res)=>{
    if (fs.existsSync("../frontent/src/"+req.params.id)) {
        console.log('Directory exists!');
    } else {
        console.log('Directory not found.');
    }
    var spawn = require("child_process").spawn;
    var process = spawn('py',["./csv_to_pdf.py", req.params.id] );
    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.json({messsage:"done"})
      });
})

module.exports = router
