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
    //aggiunge al primo
    // Teacher.findOneAndUpdate(
    //     {"_id": req.user.id,
    // "classes._id": req.body.classe,
    // "classes.student._id": req.params.id},
    // {"$addToSet": {"classes.$.student.0.grades": vote}},
    // {"upsert": true},
    // (err, doc) => {
    //             if (err) {console.log(err)}
    //             else {console.log(doc); res.json(doc)}
    //         }
    // )

    //trovato ma non modificato
    // Teacher.update(
    //     {
    //         "_id": req.user.id,
    //         "classes": {
    //             "$elemMatch": {"_id": req.body.classe, "student._id": req.params.id }
    //         }
    //     },
    //     {
    //         "$addToSet": { "classes.$[a].student.$[b].grades": vote }
    //     },
    //     { "arrayFilters": [{ "a._id": req.body.classe }, { "b._id": req.params.id }] , "upsert": true, "new": true},
        
    //     (err, doc) => {
    //         if (err) { console.log(err) }
    //         else { console.log(doc); res.json(doc) }
    //     }
    // )

    Teacher.updateOne(
        {
            "_id": req.user.id,
            "classes": {
                "$elemMatch": {_id: classe, "student._id": req.params.id}
            }
            
        },
        {
            "$push": { "classes.$[a].student.$[b].grades": parseInt(data.vote) }
        },
        { "arrayFilters": [{ "a.id": classe }, { "b.id": req.params.id }]},
        
        (err, doc) => {
            if (err) { console.log(err) }
            else { console.log(doc); res.json(doc) }
        }
    )
    
})

module.exports = router;