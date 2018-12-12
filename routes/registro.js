const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

router.get('/', function(req,res){
    res.render('registro')
})

router.post('/getStudents/:id', function(req,res){

    // Teacher.findById(
    //     {_id: req.user.id, "classes._id": req.body.classid, "classes.student._id": req.params.id},
        
    //     (err, result) => {
    //         if (err) {console.log("err"); console.log(err)}
    //         else {
    //             console.log(result)
    //             res.json(result)
    //         }
    //     }
    // )
    Teacher.findById(
        {"classes._id": req.body.classid},
        'classes',
     (err, result) => {
        if (err) {console.log(err)}
        else {console.log(result); res.json(result)}
    }
    )
})

module.exports = router;