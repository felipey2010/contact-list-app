import axios from "axios";

export default axios.create({
  baseURL: "https://api-contact-app.herokuapp.com/api",
});
