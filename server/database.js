const {createPool} = require('mysql2')

const pool = createPool ({ 
  host: "localhost",
  user: "root",
  password: "alisha.nasir.471",
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
          [username, name, email, phone, location, password, creationDate],
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

module.exports = { checkUserAndPassword, insertUserIntoProfileTable, checkUsernameExists };
