const Habit = require("../models/Habit");

const createHabit = async (req,res) => {
    try{
        const {name} = req.body;

        const habit = await Habit.create({
            userId:req.user.id,
            name
        })

        res.status(201).json({
            message:"Habit Created",
            habit
        })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getHabits = async (req,res) => {
    try{
        const habits = await Habit.find({userId: req.user.id});

        res.status(200).json({
            message:"Habits fetched successfully",
            habits
        })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


//update habit

const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOne({
      _id: id,
      userId: req.user.id
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // 🔥 HELPER: remove time part
    const getDateOnly = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const today = new Date();
    const todayDate = getDateOnly(today);

    const lastDate = habit.lastCompleted
      ? getDateOnly(new Date(habit.lastCompleted))
      : null;

    // 🔥 TOGGLE LOGIC
    if (!habit.completed) {
      if (lastDate) {
        const diffDays =
          (todayDate - lastDate) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          habit.streak += 1; // continue streak
        } else if (diffDays > 1) {
          habit.streak = 1; // reset streak
        }
        // if diffDays === 0 → do nothing (same day)
      } else {
        habit.streak = 1; // first time
      }

      habit.lastCompleted = today;
      habit.completed = true;

    } else {
      habit.completed = false;
    }

    await habit.save();

    res.status(200).json({
      message: "Habit updated",
      habit
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete habit

const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;

        const habit = await Habit.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        res.status(200).json({
            message: "Habit deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createHabit,getHabits,updateHabit,deleteHabit};