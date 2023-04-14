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
  const query = `SELECT * 
  FROM gbgw471.Message 
  WHERE bID = ?
  `;
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

const retrieveProfileInfo = (username, callback) => {
  const query = 'SELECT * FROM gbgw471.Profile WHERE Username = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve profile information:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

const retrieveVolunteerName = (username, callback) => {
  const query = 'SELECT Name FROM gbgw471.Profile WHERE Username = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve profile information:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

const deleteVolunteerOpportunity = (OppID) => {
  const query = 'DELETE FROM gbgw471.Volunteering_opportunity WHERE ID = ?';
  pool.query(query, [OppID], (err, results) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log('Opportunity deleted successfully');
      resolve(results);
    }
  });
};

const deleteSignedOpportunity = (vUser, OppID) => {
  const query = 'DELETE FROM gbgw471.SignedUp_Opportunities WHERE OppID = ? AND vUser = ?';
  pool.query(query, [OppID, vUser], (err, results) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log('SIgned for Opportunity deleted successfully');
      resolve(results);
    }
  });
};

const retrieveSignedUpOpportunities = (username, callback) => {
  const query = 'SELECT Volunteering_opportunity.Title, Volunteering_opportunity.Date, Volunteering_opportunity.Time, Volunteering_opportunity.Duration, Volunteering_opportunity.Description FROM gbgw471.SignedUp_Opportunities, gbgw471.Volunteering_opportunity WHERE SignedUp_Opportunities.OppID = Volunteering_opportunity.ID AND vUser = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve signed up opportunities:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log(results)
      callback(null, results);
    }
  });
};

const retrieveAllUserOpportunities = (username, callback) => {
  const query = 'SELECT * FROM gbgw471.SignedUp_Opportunities WHERE vUser = ? AND Attended = 1';
  pool.query(query, [username], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve all user opportunities:', err);
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

const insertSignedUpOpportunity = ( vUser, OppID, Accepted, Rejected, Pending, Attended ) => {
  return new Promise((resolve, reject) => {
    console.log("Values:", vUser, OppID, Accepted, Rejected, Pending, Attended )
    // Call the pool.query method to specify the database to use
    pool.query('USE gbgw471', (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // Call the pool.query method to insert the user information into the Profile table
        pool.query(
          "INSERT INTO SignedUp_Opportunities (vUser, OppID, Accepted, Rejected, Pending, Attended ) VALUES (?, ?, ?, ?, ?, ?)",
          [vUser, OppID, Accepted, Rejected, Pending, Attended ],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('Signed up for opportunity successfully');
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

const storeMessages = ( username, bID, Title, Content, Date, Time ) => {
  return new Promise((resolve, reject) => {
    console.log("Store message values:", username, bID, Title, Content, Date, Time )
    // Call the pool.query method to specify the database to use
    pool.query('USE gbgw471', (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        pool.query(
          `INSERT INTO Message ( username, bID, Title, Content, Date, Time ) VALUES ( ?, ?, ?, ?, ?, ?)`,
          [ username, bID, Title, Content, Date, Time ],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('Message stored successfully');
              resolve(res);
            }
          }
        );
      }
    });
  });
};

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

const acceptVolunteerApp = (vUser, OppID) => {
  const query = 'UPDATE gbgw471.SignedUp_Opportunities SET Pending = 0, Accepted = 1 WHERE vUser = ? AND OppID = ?';
  pool.query(query, [vUser, OppID], (err, results) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log('Opportunity accepted successfully');
      resolve(res);
    }
  });
};

const rejectVolunteerApp = (vUser, OppID) => {
  const query = 'UPDATE gbgw471.SignedUp_Opportunities SET Pending = 0, Rejected = 1 WHERE vUser = ? AND OppID = ?';
  pool.query(query, [vUser, OppID], (err, results) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log('Opportunity rejected successfully');
      resolve(res);
    }
  });
};

const attendVolunteerApp = (vUser, OppID) => {
  const query = 'UPDATE gbgw471.SignedUp_Opportunities SET Pending = 0, Attended = 1 WHERE vUser = ? AND OppID = ?';
  pool.query(query, [vUser, OppID], (err, results) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log('Opportunity attended successfully');
      resolve(res);
    }
  });
};

const retrievePendingApps = (callback, cUser) => {
  // Query the message_board table
  const query = 'SELECT Volunteering_opportunity.Title, Profile.Email, Profile.Phone, Profile.Location FROM gbgw471.Volunteering_opportunity, gbgw471.SignedUp_Opportunities, gbgw471.Profile WHERE Volunteering_opportunity.ID = SignedUp_Opportunities.OppID AND SignedUp_Opportunities.vUser = Profile.Username AND Volunteering_opportunity.cUser = ?';
  pool.query(query, [cUser], (err, results) => {
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

const retrieveCompanyOpportunities = (callback, cUser) => {
  // Query the message_board table
  console.log(cUser);
  const query = `SELECT * FROM gbgw471.Volunteering_opportunity WHERE cUser = ?`;
  pool.query(query, [cUser] ,(err, results) => {
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

// const retrievePendingVolunteers = (callback, cUser) => {
//   // Query the message_board table
//   const query = `
//     SELECT *
//     FROM gbgw471.Volunteering_opportunity vo
//     INNER JOIN gbgw471.SignedUp_Opportunities so ON vo.ID = so.OppID
//     INNER JOIN gbgw471.Volunteer_profile vp ON so.vUser = vp.vUser
//     WHERE vo.cUser = ?;
//   `;  pool.query(query, [cUser], (err, results) => {
//     if (err) {
//       // Handle error
//       console.error('Failed to retrieve opportunities:', err);
//       callback(err, null);
//     } else {
//       // Send the retrieved data back to the callback function
//       console.log("Pending volunters",results)
//       callback(null, results);
//     }
//   });
// };

// const retrievePendingVolunteers = (callback, cUser) => {
//   // Query the message_board table
//   const query = `
//     SELECT vp.Email, vp.Phone, vp.Location
//     FROM gbgw471.Volunteering_opportunity vo
//     INNER JOIN gbgw471.SignedUp_Opportunities so ON vo.ID = so.OppID
//     INNER JOIN gbgw471.Volunteer_profile vp ON so.vUser = vp.vUser
//     WHERE vo.cUser = ?;
//   `;  
//   pool.query(query, [cUser], (err, results) => {
//     if (err) {
//       // Handle error
//       console.error('Failed to retrieve pending volunteers:', err);
//       callback(err, null);
//     } else {
//       // Send the retrieved data back to the callback function
//       console.log("Pending volunteers",results)
//       callback(null, results);
//     }
//   });
// };

const retrievePendingVolunteers = (callback, cUser) => {
  // Query the message_board table
  const query = `
  SELECT Profile.Email, Profile.Phone, Profile.Location 
  FROM gbgw471.Volunteering_opportunity, gbgw471.SignedUp_Opportunities, gbgw471.Profile
  WHERE Volunteering_opportunity.ID = SignedUp_Opportunities.OppID AND Volunteering_opportunity.cUser = ? AND SignedUp_Opportunities.vUser = Profile.Username 
  `;
  pool.query(query, [cUser], (err, results) => {
    if (err) {
      // Handle error
      console.error('Failed to retrieve pending volunteers:', err);
      callback(err, null);
    } else {
      // Send the retrieved data back to the callback function
      console.log("Pending volunteers",results)
      callback(null, results);
    }
  });
};



module.exports = { checkUserAndPassword, insertUserIntoProfileTable, checkUsernameExists,  
  insertVolunteeringOpportunity, insertVolunteerProfile, insertCompanyProfile, 
  checkUserInDatabases, storeMessages, retrieveCompanies, retrieveOpportunities, retrieveGoals, retrieveInterests, 
  retrieveMessages, retrieveProfileInfo, insertSignedUpOpportunity, retrieveSignedUpOpportunities, retrieveAllUserOpportunities,
deleteVolunteerOpportunity, acceptVolunteerApp, rejectVolunteerApp, attendVolunteerApp, deleteSignedOpportunity, retrievePendingApps,
retrieveCompanyOpportunities,retrievePendingVolunteers, retrieveVolunteerName};
