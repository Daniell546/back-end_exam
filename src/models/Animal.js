const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: [true, "Name is required!"],
  },
  years: {
    type: Number,
    minValue: 1,
    minLength: 1,
    maxLength: 100,
    required: [true, "Years are required!"],
  },
  kind: {
    type: String,
    minLength: 3,
    required: [true, "kind is required!"],
  },
  image: {
    type: String,
    match: /^(http:\/\/|https:\/\/)/,
    required: [true, "image is required!"],
  },
  need: {
    type: String,
    required: [true, "need is required!"],

    minLength: 3,
    maxLength: 20,
  },
  location: {
    type: String,
    required: [true, "location is required!"],

    minLength: 5,
    maxLength: 15,
  },
  description: {
    type: String,
    required: [true, "description is required!"],

    minLength: 5,
    maxLength: 50,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  donations: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;
