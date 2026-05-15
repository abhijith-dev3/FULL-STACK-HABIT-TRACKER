import axios from "axios";

const API = axios.create({
baseURL: "https://full-stack-habit-tracker-fd2t.onrender.com/api"

})

export default API;

