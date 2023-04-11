const {createPool} = require('mysql2')

const pool = createPool ({ 
  host: "localhost",
  user: "root",
  password: "alisha.nasir.471",
  connecLimit: 10 
})

pool.query(`SELECT * FROM gbgw471.Board_follows;`, (err,res) =>{
  return console.log(res)
})