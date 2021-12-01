import axios from "axios";

export default axios.create({
  baseURL: "http://api-contact-app.herokuapp.com/api/",
});
