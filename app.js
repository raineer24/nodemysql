const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'nodemysql'
   });

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected....');
});

const app = express();

//Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created....');
    });
}); 

//create table
app.get('/createPostsTable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created....');
    });
});

//insert post 2
app.get('/addpost2', (req, res) => {
    let post = { title: 'Post two', body: 'This is post number two'};
    let sql = 'Insert INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 2 added....');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});