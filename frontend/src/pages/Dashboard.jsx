import { useEffect, useState } from "react";
import API from "../api/axios";
import { getToken } from "../utils/auth";
const user = JSON.parse(localStorage.getItem("user") || "null");

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  // 🔥 FETCH HABITS ON LOAD
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await API.get("/habits", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        setHabits(res.data.habits);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHabits();
  }, []);

  // 🔥 ADD HABIT
  const addHabit = async () => {
    if (!newHabit.trim()) return;

    try {
      const res = await API.post(
        "/habits",
        { name: newHabit },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      setHabits((prev) => [...prev, res.data.habit]);
      setNewHabit("");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // 🔥 TOGGLE HABIT
  const toggleHabit = async (id) => {
    try {
      const res = await API.put(
        `/habits/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      setHabits((prev) => prev.map((h) => (h._id === id ? res.data.habit : h)));
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // 🔥 DELETE HABIT
  const deleteHabit = async (id) => {
    try {
      await API.delete(`/habits/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setHabits((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
        <h1 className="text-4xl font-extrabold text-green-400 tracking-wide">
          {user?.name}'s Habit Dashboard 🚀
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Enter new habit..."
            className="w-full sm:w-auto flex-1 p-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={addHabit}
            className="bg-green-500 px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            + Add
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800">
          <p className="text-gray-400">Total Habits</p>
          <h2 className="text-3xl font-bold">{habits.length}</h2>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-3xl font-bold text-green-400">
            {habits.filter((h) => h.completed).length}
          </h2>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800">
          <p className="text-gray-400">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {habits.filter((h) => !h.completed).length}
          </h2>
        </div>
      </div>

      {/* HABITS */}
      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-2xl">No habits yet 😌</p>
            <p className="text-sm mt-2">
              Start by adding your first habit above
            </p>
          </div>
        ) : (
          habits.map((habit) => (
            <div
              key={habit._id}
              className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gray-900/60 backdrop-blur-md p-5 rounded-2xl border border-gray-800 hover:border-green-500 transition"
            >
              <span className="text-lg font-medium">{habit.name}</span>

<div className="flex flex-wrap gap-3 items-center">         
         <span
                  className={
                    habit.completed
                      ? "text-green-400 font-semibold"
                      : "text-red-400"
                  }
                >
                  {habit.completed ? "Done" : "Pending"}
                </span>

                {/* 🔥 STREAK */}
                <span className="text-yellow-400 text-sm font-medium">
                  🔥 {habit.streak || 0} days
                </span>

                <button
                  onClick={() => toggleHabit(habit._id)}
                  className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Toggle
                </button>

                <button
                  onClick={() => deleteHabit(habit._id)}
                  className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
