const {createPool} = require('mysql2')

const pool = createPool ({ 
  host: "localhost",
  user: "root",
  password: "colton.gowans.471",
  connecLimit: 10 
})

pool.query(`SELECT * FROM gbgw471.Board_follows;`, (err,res) =>{
  return console.log(res)
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


module.exports = { checkUserAndPassword };
