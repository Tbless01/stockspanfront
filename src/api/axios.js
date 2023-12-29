import axios from "axios";

export default axios.create({
//  baseURL: "https://stockspan-12pl.onrender.com/api/v1"
  baseURL: "http://localhost:8080/api/v1",
});