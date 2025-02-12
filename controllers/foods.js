const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab

// Index
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.locals.pantry = currentUser.pantry;

    res.render("foods/index.ejs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

// Delete

router.delete("/:itemId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.pantry.id(req.params.itemId).deleteone();

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    res.redirect("/");
  }
});

// Update

router.put("/:itemId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentFood = currentUser.pantry.id(req.params.itemId);

    currentFood.set(req.body);

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.pantry.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Edit

router.get("/:itemId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentFood = currentUser.pantry.id(req.params.itemId);

    res.locals.food = currentFood;
    res.render("foods/edit.ejs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Show

module.exports = router;
