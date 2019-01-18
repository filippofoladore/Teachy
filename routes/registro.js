const express = require('express');
const router = express.Router();

let Teacher = require('../models/teacher');

//home di registro
router.get('/', function(req,res){
    res.render('registro');
})
 
//prende in input l'id dello studente con il voto e la classe inserisce nel db il voto
router.post('/addVote/:id', function (req, res){
    var vote = req.body.voto;
    var classe = req.body.classe;
    var data = {vote:vote};
    // Teacher.findByIdAndUpdate(
    //     {
    //         _id: req.user.id,
    //         "classes": {$elemMatch: {_id:req.body.classe}},
    //         "classes.student": {$elemMatch: {_id: req.params.id}}
    //     },
    //     {$addToSet: {"classes.0.student.$.grades": vote}},
    //     (err, doc) => {
    //         if (err) {console.log(err)}
    //         else {console.log(doc); res.json(doc)}
    //     }
    // )
    // Teacher.updateOne(
    //     {_id: req.user.id, 
    //     "classes": {
    //         "$elemMatch": {
    //             "_id": req.body.classe, "student._id":req.params.id
    //         }
    //     }},
    //     {
    //         $push: {"classes.$[outer].student.$[inner].grades": vote}

    //     },
    //     {
    //         "arrayFilters": [{"outer._id": req.body.classe}, {"inner._id": req.params.id}],
    //     },
    //     (err, doc) => {
    //         if (err) {console.log(err)}
    //         else { console.log(doc); res.json(doc)}
    //     }
    // )
   
    Teacher.findOneAndUpdate(
        {
            "_id": req.user.id,
            "classes": {
                "$elemMatch": {
                    "_id": req.body.classe,
                    "student._id": req.params.id
                }
            }
        },

        {
            "$push": {
                "classes.$[a].student.$[b].grades": vote
            },
        },
        {
            "upsert":true,
            "new":true,
            "arrayFilters": [
              { "a._id": classe },
              { "b._id": req.params.id }
            ]
          },
        
        (err, doc) => {
            if (err) {console.log(err)}
            else {console.log(doc); res.json(doc)}
        }
    );

    
})

module.exports = router;