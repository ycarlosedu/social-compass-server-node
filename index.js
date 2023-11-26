require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const userController = require('./controllers/users')

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PROJECT_ID = process.env.CHAT_ENGINE_PROJECT_ID
const PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', userController.getUsers)
app.get('/users/:id', userController.getUserById)
app.post('/users', userController.createUser)
app.put('/users/:id', userController.updateUser)
app.delete('/users/:id', userController.deleteUser)

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { 
        username, 
        secret, 
        email, 
        first_name, 
        last_name 
      },
      { headers: { "Private-Key": PRIVATE_KEY } }
    );
    return res.status(r.status).json({user: {...r.data}, projectID: PROJECT_ID});
  } catch (e) {
    return res.status(e.response?.status || 500).json(e.response?.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json({user: {...r.data}, projectID: PROJECT_ID});
  } catch (e) {
    return res.status(e.response?.status || 500).json(e.response?.data);
  }
});

const port = process.env.PORT || 3001

app.listen({
  host: '0.0.0.0',
  port,
}, () => {
  console.log(`App running on port ${port}.`)
});