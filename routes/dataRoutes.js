const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schemas
const dateSchema = new mongoose.Schema({ date: { type: String, required: true } });
const foodSchema = new mongoose.Schema({ food: { type: String, required: true } });
const dessertSchema = new mongoose.Schema({ dessert: { type: String, required: true } });
const activitySchema = new mongoose.Schema({ activities: { type: String, required: true } });

// Models
const DateModel = mongoose.model("Date", dateSchema);
const FoodModel = mongoose.model("Food", foodSchema);
const DessertModel = mongoose.model("Dessert", dessertSchema);
const ActivityModel = mongoose.model("Activity", activitySchema);

// Routes
router.post("/date", async (req, res) => {
  try {
    const newDate = new DateModel(req.body);
    await newDate.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/food", async (req, res) => {
  try {
    const newFood = new FoodModel(req.body);
    await newFood.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/dessert", async (req, res) => {
  try {
    const newDessert = new DessertModel(req.body);
    await newDessert.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/activity", async (req, res) => {
  try {
    const newActivity = new ActivityModel(req.body);
    await newActivity.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;