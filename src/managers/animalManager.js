const Animal = require("../models/Animal");

exports.create = (AnimalData) => Animal.create(AnimalData);

exports.getAll = () => Animal.find();

exports.getById = (id) => Animal.findById(id).populate("owner");

exports.edit = (id, newData) => Animal.findByIdAndUpdate(id, newData);

exports.delete = (id) => Animal.findByIdAndDelete(id);

exports.addDonate = async (id, userId) => {
  const animal = await Animal.findById(id).populate("donations.user");
  animal.donations.push({ user: userId });
  return animal.save();
};



exports.checkDonation = async (animalId, userId) => {
  const animal = await Animal.findOne({
    _id: animalId,
    donations: { $elemMatch: { user: userId } },
  });

  if (animal) {
    // User has already bought the game
    return true;
  }

  // User has not bought the game
  return false;
};
