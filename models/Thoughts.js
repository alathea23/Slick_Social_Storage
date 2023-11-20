const mongoose = require("mongoose");
const validator = require("validator");

// Child documents or subdocuments can be embedded into a parent document
// The bookSchema defines the schema of the subdocument
const reactionSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: { type: String, required: true },
  // Use built in date method to get current date
  createdAt: { type: Date, default: Date.now },
  toJSON: {
    virtuals: true,
  },
});

// The librarySchema defines the schema of the parent document
const thoughtsSchema = new mongoose.Schema({
  // This will include an array that holds all the books
  thoughtText: {type: String, required: true, maxlength: 280, minlength: 1},
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema],
  // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
  toJSON: {
    id: false,
  },
});

reactionSchema
  .virtual("createdAt")
  // Getter
  .get(function () {
    return this.createdAt //format timestamp????
  });

// Uses mongoose.model() to create model
const Thought = mongoose.model("Thoughts", thoughtsSchema);

// Uses model to create new instance including subdocument
const reactionData = [
 
];

Thought.create({ name: "Reactions", reactions: reactionData })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

module.exports = Thought;
