const {createPool} = require('mysql2')

const pool = createPool ({ 
  host: "localhost",
  user: "root",
  password: "habiba471",
  connecLimit: 10 
})


// Function to check user and password in the database
const checkUserAndPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM gbgw471.Profile WHERE Username = ? AND Password = ?`, [username, password], (err, res) => {
      if (err) {
        console.error(err);
        console.log("Database was not able to retrieve information properly")
        reject(err);
      } else {
        // Process the result and send appropriate response
        console.log("Successfully retrieved user and password");
        // You can send response back to server or perform further actions here
        if (res.length > 0) {
          console.log("The username and pass exist in the database")
          resolve(true);
        } else {
          console.log("The username and pass don't exist in the database")
          resolve(false); // Reject the promise with false value
        }
      }
    });
  });
};

const insertUserIntoProfileTable = (username, name, email, phone, location, password, creationDate) => {
  return new Promise((resolve, reject) => {
    // Call the pool.query method to specify the database to use
    pool.query('USE gbgw471', (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // Call the pool.query method to insert the user information into the Profile table
        pool.query(
          'INSERT INTO Profile (Username, Name, Email, Phone, Location, Password, creationDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [username, name, email, phone, location, password, creationDate ],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('User registered successfully');
              resolve(res);
            }
          }
        );
      }
    });
  });
};

// Function to check if username exists in the database
const checkUsernameExists = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM gbgw471.Profile WHERE Username = ?`, [username], (err, res) => {
      if (err) {
        console.error(err);
        console.log("Database was not able to retrieve information properly");
        reject(err);
      } else {
        // Process the result and send appropriate response
        console.log("Database: Successfully retrieved username");
        // You can send response back to server or perform further actions here
        if (res.length > 0) {
          console.log("Database: The username exists in the database");
          resolve(true);
        } else {
          console.log("Database: The username does not exist in the database");
          resolve(false); // Reject the promise with false value
        }
      }
    });
  });
};

const insertVolunteeringOpportunity = ( Title, Date, Time, Duration, Description, VolunteersNeeded, cUser ) => {
  return new Promise((resolve, reject) => {
    console.log("Values:", Title, Date, Time, Duration, Description, VolunteersNeeded, cUser )
    // Call the pool.query method to specify the database to use
    pool.query('USE gbgw471', (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // Call the pool.query method to insert the user information into the Profile table
        pool.query(
          "INSERT INTO Volunteering_opportunity ( Title, Date, Time, Duration, Description, VolunteersNeeded, cUser ) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
          [ Title, Date, Time, Duration, Description, VolunteersNeeded, cUser ],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('User registered successfully');
              resolve(res);
            }
          }
        );
      }
    });
  });
};

const retrieveGoals = (username, callback) => {
  const query = 'SELECT Goal FROM gbgw471.User_goals WHERE vUser = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve goals:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

const retrieveInterests = (username, callback) => {
  const query = 'SELECT Interest FROM gbgw471.User_interests WHERE vUser = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve interests:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

const retrieveMessages = (bID, callback) => {
  const query = 'SELECT * FROM gbgw471.Message WHERE bID = ?';
  pool.query(query, [bID], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve messages:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

const insertVolunteerProfile = ( vUser,Hours ) => {
  return new Promise((resolve, reject) => {
    console.log("Values:", vUser,Hours )
    // Call the pool.query method to specify the database to use
    pool.query('USE gbgw471', (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // Call the pool.query method to insert the user information into the Profile table
        pool.query(
          "INSERT INTO Volunteer_profile (vUser,Hours ) VALUES (?, ?)",
          [vUser,Hours ],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('Volunteer registered successfully');
              resolve(res);
            }
          }
        );
      }
    });
  });
};

const insertCompanyProfile = ( cUser ) => {
  return new Promise((resolve, reject) => {
    console.log("Values:", cUser )
    // Call the pool.query method to specify the database to use
    pool.query('USE gbgw471', (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // Call the pool.query method to insert the user information into the Profile table
        pool.query(
          "INSERT INTO Company_profile (cUser ) VALUES (?)",
          [ cUser ],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('Volunteer registered successfully');
              resolve(res);
            }
          }
        );
      }
    });
  });
};

// Function to check if username exists in the Volunteer_profile or Company_profile tables
const checkUserInDatabases = (username) => {
  return new Promise((resolve, reject) => {
    // Query the Volunteer_profile table
    const volunteerQuery = `SELECT * FROM gbgw471.Volunteer_profile WHERE vUser = ?`;
    pool.query(volunteerQuery, [username], (volunteerErr, volunteerRes) => {
      if (volunteerErr) {
        console.error(volunteerErr);
        console.log("Database: Failed to retrieve information from Volunteer_profile table");
        reject(volunteerErr);
      } else {
        // Query the Company_profile table
        const companyQuery = `SELECT * FROM gbgw471.Company_profile WHERE cUser = ?`;
        pool.query(companyQuery, [username], (companyErr, companyRes) => {
          if (companyErr) {
            console.error(companyErr);
            console.log("Database: Failed to retrieve information from Company_profile table");
            reject(companyErr);
          } else {
            // Process the results and send appropriate response
            console.log("Database: Successfully retrieved username");
            // You can send response back to server or perform further actions here
            if (volunteerRes.length > 0) {
              console.log("Database: Username found in Volunteer table");
              resolve(true);
            } else if(companyRes.length > 0){
              console.log("Database: Username found in Company table")
              resolve(false)
            } 
            else {
              console.log("Database: The username does not exist in either Volunteer_profile or Company_profile table");
              resolve(false); // Resolve the promise with false value
            }
          }
        });
      }
    });
  });
};

const storeMessages = ( cUser, bID, Title, Content, Date, Time ) => {
  return new Promise((resolve, reject) => {
    console.log("Values:", cUser, bID, Title, Content, Date, Time )
    // Call the pool.query method to specify the database to use
    pool.query('USE gbgw471', (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // Call the pool.query method to insert the user information into the Profile table
        pool.query(
          "INSERT INTO Message ( cUser, bID, Title, Content, Date, Time ) VALUES ( ?, ?, ?, ?, ?, ?)",
          [ cUser, bID, Title, Content, Date, Time ],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('User registered successfully');
              resolve(res);
            }
          }
        );
      }
    });
  });
};


// Method to retrieve values from the message_board table
const retrieveCompanies = (callback) => {
  // Query the message_board table
  const query = 'SELECT * FROM gbgw471.Company_profile';
  pool.query(query, (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve companies:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

// Method to retrieve values from the message_board table
const retrieveOpportunities = (callback) => {
  // Query the message_board table
  const query = 'SELECT * FROM gbgw471.Volunteering_Opportunity';
  pool.query(query, (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve opportunities:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

module.exports = { checkUserAndPassword, insertUserIntoProfileTable, checkUsernameExists,  
  insertVolunteeringOpportunity, insertVolunteerProfile, insertCompanyProfile, 
  checkUserInDatabases, storeMessages, retrieveCompanies, retrieveOpportunities, retrieveGoals, retrieveInterests, retrieveMessages };