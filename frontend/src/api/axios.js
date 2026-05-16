import axios from "axios";

const API = axios.create({
    baseURL : "https://full-stack-habit-tracker-6c9x.onrender.com/api"
})

export default API;

