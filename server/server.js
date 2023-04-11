const express = require('express')
const cors = require('cors');
const app = express()
const { checkUserAndPassword } = require('./database.js'); // Import the function from database.js


// Allow requests from specific origins
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

app.use(express.json());


app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"]})
})

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Username:", username);
  console.log("Password:", password);

  try {
    const result = await checkUserAndPassword(username, password);
    if (result) {
      console.log("Server: User and pass match records")
      res.json({ success: true, message: "User and password matched" });
    } else {
      console.log("Server: User and pass do not match records")
      res.json({ success: false, message: "User and password did not match" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to check user and password" });
  }
});

app.listen(5000, () => { console.log("Server started on port 5000")})