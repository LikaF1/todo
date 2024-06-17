// import sqlite3 from 'sqlite3';

// const db = new sqlite3.Database(':memory:', (err) => {
//   if(err){
//     console.error(err.message);
//     return;
//   }
//   console.log('Подключение к локальной БД SQLite.');
// });

// db.run('CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, description TEXT)', (err) => {
// if(err){
//   console.error(err.message);
//   return;
// }
//   console.log('Таблица создана.');
// });

// db.close((err) => {
// if(err){
//   console.error(err.message);
//   return;
// }
// console.log('Соединение БД закрыто.');

// });