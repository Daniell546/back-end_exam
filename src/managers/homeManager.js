const Animal = require("../models/Animal");


exports.getLastThree = async () => {
    const animals = await Animal.find().lean();
    const lastThree = (animals.slice(-3)).reverse();
    return lastThree;
}

exports.getAll = async (location) => {
    let result = await Animal.find().lean();
  
    if(location) {
        result = result.filter(a => a.location.toLocaleLowerCase().includes(location.toLocaleLowerCase()));
    }
    return result;
  };