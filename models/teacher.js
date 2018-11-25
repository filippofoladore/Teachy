const mongoose = require('mongoose');

// Teacher Schema
const TeachSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  classes: [
    {
      cName: String,
      student: [
        {
          Name: { type: String, required: true },
          sEmail: { type: String, required: true },
          gender: { type: String, enum: ['M', 'F'] },
          grades: { type: Array }
        }
      ]
    }]
});


const Teacher = module.exports = mongoose.model('Teacher', TeachSchema);
 