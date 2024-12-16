import axios from "axios";

export const api = axios.create({
  baseURL: "https://anime-streaming-25rq.vercel.app/api",
});
