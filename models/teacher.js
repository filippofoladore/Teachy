const mongoose = require('mongoose');

// Teacher Schema
const TeachSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  created: {type: Date, default: Date.now},
  classes: [
    {
      cName: String,
      student: [
        {
          name: { type: String, required: true },
          lname: { type: String, required: true },
          gender: { type: String, enum: ['M', 'F'] },
          grades:{ type: [Number]} 
        }
      ]
    }]
}); 


const Teacher = module.exports = mongoose.model('Teacher', TeachSchema); //esportazione modulo per poterlo usare dovunque nell'app
 
