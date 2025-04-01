const express = require("express");
const router = express.Router();
const knex = require("../db");

// Story #1 - create an account
router.post("/register", async (req, res) => {
  try {
  const { first_name, last_name, username, password } = req.body;
  const [newUser] = await knex("users")
    .insert({ first_name, last_name, username, password })
    .returning("*");
  res.status(201).json(newUser);
  } catch (error) {
    console.log("Error in /register", error);
    res.status(500).json({ error: error.message });
  }
});

// Story #2 - login to an account
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knex("users").where({ username, password }).first();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json(user);
  } catch (error) {
    console.log("Error in /login", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
