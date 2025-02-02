const mongoose = require("mongoose");

//schema
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    city: String,
    job: String,
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
    role: { 
      type: String, 
      enum: ['admin', 'teacher', 'user'], // Allowed values
      default: 'user' // Default value
    },
    image: String,
    isPromotion: Boolean
  },
  {
    versionKey: false,
  }
);

//model
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};