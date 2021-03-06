const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list'
});

class Controller {
    async getAll(table) {
        return new Promise((resolve, reject) => {
             connection.query(`SELECT * FROM ${table}`, function (err, result, fields) {
              if (err) {
                return reject(err);
              }
              resolve(result);
              });
        });
    }

    // getting a single 
    async get(table,id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} where id = ${id}`, function (err, result, fields) {
             if (err) {
               return reject(err);
             }
             resolve(result);
             });
       });
    }

    // creating 
    async create(table,data) {
        return new Promise((resolve, reject) => {
            let query  
            if (table == 'task') {
                query  = `INSERT INTO task (id_project, titre, status , description, date_db, date_fn) VALUES ('${data.id_project}','${data.titre}','${data.status}','${data.description}','${data.date_db}','${data.date_fn}')`
            }else if (table == 'project') {
                query  = `INSERT INTO project (titre, priorite, description, date_db, date_fn) VALUES ('${data.titre}','${data.priorite}','${data.description}','${data.date_db}','${data.date_fn}')`
            }
            connection.query(query, function (err, result, fields) {
             if (err) {
               return reject(err);
             }
             resolve('Todo added successfully');
             });
       });
    }

    // updating 
    async update(data,table,id) {
        return new Promise((resolve, reject) => {
            let query 
            if (table == 'task') {
                query = `UPDATE task SET titre='${data.titre}', status='${data.status }', description='${data.description}',date_db='${data.date_db}',date_fn='${data.date_fn}' WHERE id = ${id} `
            }else if (table == 'project') {
                query = `UPDATE project SET titre='${data.titre}', priorite='${data.priorite }', description='${data.description}',date_db='${data.date_db}',date_fn='${data.date_fn}' WHERE id = ${id} `
            }
            connection.query(query , function (err, result, fields) {
             if (err) {
               return reject(err);
             }
             resolve('Todo updated successfully');
             });
       });
    }

    // deleting 
    async delete(table,id) {
            return new Promise((resolve, reject) => {
                connection.query(`DELETE FROM ${table} where id = ${id}`, function (err, result, fields) {
                 if (err) {
                   return   reject(`No todo with id ${id} found`);
                 }
                 resolve(`Todo deleted successfully`);
                 });
           });
        
    }
}
module.exports = Controller;