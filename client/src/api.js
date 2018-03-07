import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000/api"
});

const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};

export default {
  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
        return data;
      })
      .catch(errHandler);
  },
  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
        return data;
      })
      .catch(errHandler);
  },
  logout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
  },
  loadUser() {
    const userData = localStorage.getItem("user");
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      return user;
    }
    return false;
  },
  getForm() {
    return service
      .get("/form")
      .then(res => res.data)
      .catch(errHandler);
  },
  updateForm(form) {
    return service
      .patch("/form", form)
      .then(res => res.data)
      .catch(errHandler);
  },
  getCapital() {
    return service
      .get("/capital")
      .then(res => res.data)
      .catch(errHandler);
  },
  updateCapital(capital) {
    return service
      .patch("/capital", capital)
      .then(res => res.data)
      .catch(errHandler);
  },

  getUser() {
    return service
      .get("/account")
      .then(res => res.data)
      .catch(errHandler);
  }
};
