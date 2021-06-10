import axios from "axios";

const db = {
  async connect(data) {
    const res = await axios.post("/wall/sql/connect", data);
    return res.data;
  },
  async disconnect() {
    const res = await axios.get("/wall/sql/disconnect");
    return res.data;
  },
  async exec(data) {
    const res = await axios.post("/wall/sql/exec", data);
    return res.data;
  },
};

export default db;
