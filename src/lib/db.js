const mysql = require('mysql2');

export const getDatabase = () => {
  const db = mysql.createConnection({
    multipleStatements: true,
    host     : 'sql9.freemysqlhosting.net',
    port     : 3306,
    user     : 'sql9654532',
    password : 'c3dnbUygVZ', //Not secure to store it this way; fill in yourself
    database : 'sql9654532'
  });

  return db;
};

export const closeDBInstance = (db) => {
  db.destroy();
};