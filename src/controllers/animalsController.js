const express = require("express");
const router = express.Router();
const homeManager = require("../managers/homeManager");
const { getDifficultyOptions } = require("../utils/viewHelpers");
const animalManager = require("../managers/animalManager");
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require("../utils/errorHelpers");
const { MongooseError } = require("mongoose");

router.get("/", async (req, res) => {
  const animals = await animalManager.getAll().lean();
  res.render("animals/dashboard", { animals });
});

router.get("/create", isAuth, (req, res) => {
  res.render("animals/create");
});

router.post("/create", isAuth,  async (req, res) => {
  const data = {
    ...req.body,
    owner: req.user._id,
  };
  console.log(req.body.years);
  try {
    await animalManager.create(data);
    res.redirect("/animals");
  } catch (error) {
    if(req.body.years < 1) {
      throw Error('Age must be bigger than 0!');
    }
    res.render("animals/create", { error: getErrorMessage(error) });
  }
});

router.get("/:id/details", async (req, res) => {
  const id = req.params.id;
  const animal = await animalManager.getById(id).lean();
  const isOwner = req.user?._id == animal.owner._id;
  const hasDonated = await animalManager.checkDonation(id, req.user?._id);
  res.render("animals/details", { animal, isOwner, hasDonated });
});

router.get("/:id/edit",  isAuth,  async (req, res) => {
  const id = req.params.id;
  const animal = await animalManager.getById(id).lean();
  res.render("animals/edit", { animal });
});

router.post("/:id/edit", isAuth,  async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await animalManager.edit(id, data);
    res.redirect(`/animals/${id}/details`);
  } catch (error) {
    res.render(`animals/edit`, { error: getErrorMessage(error) });
  }
});

router.get("/:id/delete", isAuth,  async (req, res) => {
  const id = req.params.id;
  await animalManager.delete(id);
  res.redirect(`/animals`);
});

router.get('/:id/donate',  isAuth, async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    const hasDonated = await animalManager.checkDonation(id, userId);

    try {
        if(!hasDonated){
            await animalManager.addDonate(id, userId);
        }
        res.redirect(`/animals/${id}/details`);
      } catch (error) {
        res.render(`animals/details`, { error: getErrorMessage(error) });
      }

})

module.exports = router;
