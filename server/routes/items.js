const express = require("express");
const router = express.Router();
const knex = require("../db");

//Story #3 - create a new item
router.post("/", async (req, res) => {
  try {
    const { user_id, item_name, description, quantity } = req.body;
    const [newItem] = await knex("items")
      .insert({ user_id, item_name, description, quantity })
      .returning("*");
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Story #4 - get all items
router.get("/", async (req, res) => {
  try {
    let query = knex("items").select("*");
    if (req.query.user_id) {
      query = query.where({ user_id: req.query.user_id });
    }
    const items = await query;
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Story #5 - get individual item
router.get("/:id", async (req, res) => {
  try {
    const item = await knex("items").where({ id: req.params.id }).first();
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Story #6 - edit an item
router.put("/:id", async (req, res) => {
  try {
    const [updatedItem] = await knex("items")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Story #7 - delete an item
router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await knex("items").where({ id: req.params.id }).del();
    if (!rowsDeleted) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
