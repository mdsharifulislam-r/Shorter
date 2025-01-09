import mysql from "mysql2/promise"

export  const pool = mysql.createPool({
  host:'bft3srjqp2zpfjqcdf7e-mysql.services.clever-cloud.com',
  database:'bft3srjqp2zpfjqcdf7e',
  user:"udqeefhb02vmeyaa",
  password:"LSZfim4eQZdxue7HBJz",
  port:21830,
  
  waitForConnections:true
})


// export  const pool = mysql.createPool({
//   host:'localhost',
//   database:'shorter',
//   user:"root",
//   password:"",
 
  
//   waitForConnections:true
// })


pool.on('connection', (connection) => {
    console.log('DB connection established');
  });