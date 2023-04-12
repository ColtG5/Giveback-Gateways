const express = require('express')
const cors = require('cors');
const app = express()
const { checkUserAndPassword, insertUserIntoProfileTable, checkUsernameExists, insertVolunteeringOpportunity } = require('./database.js'); // Import the function from database.js

// Allow requests from specific origins
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

app.use(express.json());

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

app.post("/api/signup", async (req, res) => {
  const { username, name, email, phone, location, password, creationDate, pid} = req.body;
  console.log(username,name,email,phone,location, password, creationDate, pid)

  try {
    const result = await insertUserIntoProfileTable(username, name, email, phone, location, password, creationDate, pid);
    // Send success response back to the client
    res.json({ success: true, message: "User registered successfully" });
    console.log(result)
  } catch (err) {
    // Handle error
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/api/checkUsername", async (req, res) => {
  const { username } = req.body;
  console.log("Username:", username);

  try {
    const result = await checkUsernameExists(username);
    if (result) {
      console.log("Server: Username exists in the database");
      res.json({ success: true, message: "Username exists" });
    } else {
      console.log("Server: Username does not exist in the database");
      res.json({ success: false, message: "Username does not exist" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to check username" });
  }
});

app.post("/api/volunteering-opportunities", async (req, res) => {
  const { ID, Title, Date, Time, Duration, Description, VolunteersNeeded } = req.body;
  console.log("Title:", Title);
  try {
    const result = await insertVolunteeringOpportunity(ID, Title, Date, Time, Duration, Description, VolunteersNeeded );
    // Send success response back to client
    res.json({ success: true, message: "Volunteer opportunity successfully registered" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to register opportunity in database" });
  }
});

// app.post("/api/test", async (req,res) => {
//   console.log("Yes this works")
// })


app.listen(5000, () => { console.log("Server started on port 5000")})