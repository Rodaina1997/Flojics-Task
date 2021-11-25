var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',

});


function startConnection() {


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("CREATE DATABASE IF NOT EXISTS Mymessages", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        })

        var sql = "CREATE TABLE IF NOT EXISTS Mymessages.messages (email VARCHAR(255), name VARCHAR(255),phone VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });


    });
}



module.exports = {
    startConnection: startConnection
}



