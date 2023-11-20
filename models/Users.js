const mongoose = require('mongoose');
const validator = require('validator');
const Thought = require('./Thoughts')

// The librarySchema defines the schema of the parent document
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true,}, //{ $trim: { input: "$description", chars: string}}},
  // This will include an array that holds all the books
  email: { 
    type: String,
    required: true,
    unique: true,
    validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false
      }
  },
  thoughts: [Thought],
   // Use built in date method to get current date
   friends: [Users],
   // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
   toJSON: {
    virtuals: true,
  },
});

usersSchema.virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

// Uses mongoose.model() to create model
const Users = mongoose.model('Users', usersSchema);

// Uses model to create new instance including subdocument
const thoughtData = [
  { title: 'Diary of Anne Frank', price: 10 },
  { title: 'One Thousand Years of Solitude', price: 20 },
  { title: 'History of Hogwarts', price: 5 },
];

Users
  .create({ name: 'Thoughts', thoughts: thoughtData })
  .then(data => console.log(data))
  .catch(err => console.log(err));

module.exports = Users;
