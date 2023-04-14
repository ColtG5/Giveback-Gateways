const express = require('express')
const cors = require('cors');
const app = express()

const { checkUserAndPassword, insertUserIntoProfileTable, checkUsernameExists, insertVolunteeringOpportunity, 
  insertVolunteerProfile, insertCompanyProfile, checkUserInDatabases, storeMessages, retrieveCompanies, 
  retrieveOpportunities, retrieveGoals, retrieveInterests, retrieveMessages, retrieveProfileInfo, insertSignedUpOpportunity,
retrieveSignedUpOpportunities, retrieveAllUserOpportunities, deleteVolunteerOpportunity, acceptVolunteerApp,
rejectVolunteerApp, attendVolunteerApp, deleteSignedOpportunity, retrievePendingApps, retrieveCompanyOpportunities,
retrievePendingVolunteers} = require('./database.js'); // Import the function from database.js

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
  const { username, name, email, phone, location, password, creationDate } = req.body;
  console.log(username,name,email,phone,location, password, creationDate )

  try {
    const result = await insertUserIntoProfileTable(username, name, email, phone, location, password, creationDate );
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
  const { Title, Date, Time, Duration, Description, VolunteersNeeded, cUser } = req.body;
  console.log("Title:", Title);
  try {
    const result = await insertVolunteeringOpportunity( Title, Date, Time, Duration, Description, VolunteersNeeded, cUser );
    // Send success response back to client
    res.json({ success: true, message: "Volunteer opportunity successfully registered" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to register opportunity in database" });
  }
});

app.post("/api/sign-up-opportunity", async (req,res) => {
  const { vUser, opportunityId, Accepted, Rejected, Pending, Attended } = req.body;
  try {
    const result = await insertSignedUpOpportunity( vUser, opportunityId, Accepted, Rejected, Pending, Attended );
    // Send success response back to client
    res.json({ success: true, message: "Signed up for opportunity successfully" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to sign up for opportunity" });
  }
});

app.post("/api/volunteer-profile", async (req,res) => {
  const { vUser,Hours } = req.body;
  console.log("vUser:", vUser);
  try {
    const result = await insertVolunteerProfile( vUser,Hours );
    // Send success response back to client
    res.json({ success: true, message: "Profile successfully registered as Volunteer" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to register volunteer in database" });
  }
});

app.post("/api/get-signed-opportunities", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await new Promise ((resolve, reject) => {
      retrieveSignedUpOpportunities(username, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
    if (result.length > 0) { // Check if there are any results
      res.json(result);
      console.log(result);
    } else {
      console.log("No opportunities signed up")
      res.json({ success: false, message: "No signed up for opportunities found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve signed up for opportunities" });
  }
});


app.post("/api/get-all-opportunities", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await new Promise ((resolve, reject) => {
      retrieveAllUserOpportunities(username, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
    if (result.length > 0) { // Check if there are any results
      res.json(result);
      console.log(result);
    } else {
      console.log("No opportunities ")
      res.json({ success: false, message: "No opportunities found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve opportunities" });
  }
});

app.post("/api/profile-info", async (req, res) => {
  const { username } = req.body;
  try {
    const result = await new Promise ((resolve, reject) => {
      retrieveProfileInfo(username, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
    if (result.length > 0) { // Check if there are any results
      res.json(result);
      console.log(result);
    } else {
      console.log("No profile info")
      res.json({ success: false, message: "No profile information found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve profile information" });
  }
});

app.post("/api/goals", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await new Promise ((resolve, reject) => {
      retrieveGoals(username, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
    if (result.length > 0) { // Check if there are any results
      res.json(result);
      console.log(result);
    } else {
      console.log("No goals")
      res.json({ success: false, message: "No goals found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve goals" });
  }
});

app.post("/api/interests", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await new Promise ((resolve, reject) => {
      retrieveInterests(username, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
    if (result.length > 0) { // Check if there are any results
      res.json(result);
      console.log(result);
    } else {
      console.log("No interests")
      res.json({ success: false, message: "No interests found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve interests" });
  }
});

app.get("/api/get-messages", async (req, res) => {
  const { bID } = req.query;
  try {
    const result = await new Promise ((resolve, reject) => {
      retrieveMessages(bID, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
    if (result.length > 0) { // Check if there are any results
      res.json({ success: true, messages: result }); // Include success property in the response JSON
      console.log("Messages are",result);
    } else {
      console.log("No messages")
      res.json({ success: false, message: "No messages found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});


app.post("/api/company-profile", async (req,res) => {
  const { cUser } = req.body;
  console.log("cUser:", cUser);
  try {
    const result = await insertCompanyProfile( cUser );
    // Send success response back to client
    res.json({ success: true, message: "Profile successfully registered as Company" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to register company in database" });
  }
});

app.post("/api/delete-opp", async (req,res) => {
  const { OppID } = req.body;
  try {
    const result = await deleteVolunteerOpportunity( OppID );
    // Send success response back to client
    res.json({ success: true, message: "Opportunity successfully deleted" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete opportunity" });
  }
});

app.post("/api/delete-signed-opp", async (req,res) => {
  const { vUser, OppID } = req.body;
  try {
    const result = await deleteSignedOpportunity( vUser, OppID );
    // Send success response back to client
    res.json({ success: true, message: "Signed for Opportunity successfully deleted" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete signed up opportunity" });
  }
});

app.post("/api/accept-app", async (req,res) => {
  const { vUser, OppID } = req.body;
  try {
    const result = await acceptVolunteerApp( vUser, OppID );
    // Send success response back to client
    res.json({ success: true, message: "Opportunity successfully accepted" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to accept opportunity" });
  }
});

app.post("/api/reject-app", async (req,res) => {
  const { vUser, OppID } = req.body;
  try {
    const result = await rejectVolunteerApp( vUser, OppID );
    // Send success response back to client
    res.json({ success: true, message: "Opportunity successfully rejected" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to reject opportunity" });
  }
});

app.post("/api/attend-app", async (req,res) => {
  const { vUser, OppID } = req.body;
  try {
    const result = await attendVolunteerApp( vUser, OppID );
    // Send success response back to client
    res.json({ success: true, message: "Opportunity successfully attend" });
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to attend opportunity" });
  }
});

app.post("/api/search-username", async (req, res) => {
  const { username } = req.body;
  console.log("Username:", username);
  try {
    const result = await checkUserInDatabases(username);
    if (result) {
      console.log("Server: User and pass match records")
      res.json({ success: true, message: "User found" });
    } else {
      console.log("Server: User and pass do not match records")
      res.json({ success: false, message: "User and password did not match" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to check user and password" });
  }
});

app.post("/api/messages", async (req, res) => {
  const { cUser, bID, Title, Content, Date, Time } = req.body;
  console.log("Username:", cUser,bID, Title, Content, Date, Time);
  try {
    const result = await storeMessages( cUser,bID, Title, Content, Date, Time );
    if (result) {
      console.log("Messages found")
      res.json({ success: true, message: "Message found" });
    } else {
      console.log("No messages found")
      res.json({ success: false, message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to check user and password" });
  }
});


// Define route to retrieve companies from message_board table
app.get('/api/companies', (req, res) => {
  // Call the retrieveCompanies method to fetch data from the database
  retrieveCompanies((err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve companies:', err);
      res.status(500).json({ error: 'Failed to retrieve companies' });
    } else {
      // Send the retrieved data back to the client
      res.json(results);
      console.log(results)
    }
  });
});

// Define route to retrieve companies from message_board table
app.get('/api/company-opportunities', (req, res) => {
  // Call the retrieveCompanies method to fetch data from the database
  retrieveCompanies((err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve companies:', err);
      res.status(500).json({ error: 'Failed to retrieve companies' });
    } else {
      // Send the retrieved data back to the client
      res.json(results);
      console.log(results)
    }
  });
});

// Define route to retrieve companies from message_board table
app.get('/api/get-opportunities', (req, res) => {
  const cUser = req.query.cUser; // Get the value of cUser from the query parameters
  // Call the retrieveCompanyOpportunities method to fetch data from the database
  retrieveCompanyOpportunities((err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve opportunities:', err);
      res.status(500).json({ error: 'Failed to retrieve opportunities' });
    } else {
      // Send the retrieved data back to the client
      res.json(results);
      console.log("The results of company opp is: ", results)
    }
  }, cUser); // Pass the cUser value to the retrieveCompanyOpportunities function
});

// Define route to retrieve companies from message_board table
app.get('/api/get-all-opportunities', (req, res) => {
  // Call the retrieveCompanyOpportunities method to fetch data from the database
  retrieveOpportunities((err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve opportunities:', err);
      res.status(500).json({ error: 'Failed to retrieve opportunities' });
    } else {
      // Send the retrieved data back to the client
      res.json(results);
      console.log("The results of company opp is: ", results)
    }
  }); // Pass the cUser value to the retrieveCompanyOpportunities function
});

// Define route to retrieve companies from message_board table
app.get('/api/get-pending-apps', (req, res) => {
  const cUser = req.query.cUser; // Get the value of cUser from the query parameters
  // Call the retrieveCompanyOpportunities method to fetch data from the database
  retrievePendingApps((err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve opportunities:', err);
      res.status(500).json({ error: 'Failed to retrieve opportunities' });
    } else {
      // Send the retrieved data back to the client
      res.json(results);
      console.log("The results of pending apps is: ", results)
    }
  }, cUser); // Pass the cUser value to the retrieveCompanyOpportunities function
});

// Define route to retrieve companies from message_board table
app.get('/api/get-pending-apps-volunteer-info', (req, res) => {
  const cUser = req.query.cUser; // Get the value of cUser from the query parameters
  // Call the retrieveCompanyOpportunities method to fetch data from the database
  retrievePendingVolunteers((err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve opportunities:', err);
      res.status(500).json({ error: 'Failed to retrieve opportunities' });
    } else {
      // Send the retrieved data back to the client
      res.json(results);
      console.log("The results of pending apps is: ", results)
    }
  }, cUser); // Pass the cUser value to the retrieveCompanyOpportunities function
});


app.listen(5000, () => { console.log("Server started on port 5000")})