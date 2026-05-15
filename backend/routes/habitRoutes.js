const express = require("express");
const router = express.Router();

const {createHabit,getHabits,updateHabit,deleteHabit} = require("../controllers/habitController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.post("/",createHabit);

router.get("/",getHabits);

router.put("/:id", updateHabit);

router.delete("/:id",deleteHabit);

module.exports = router;