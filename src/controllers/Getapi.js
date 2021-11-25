async function HandleGetApi(request, response) {

    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "Mymessages"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM messages";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            return response.status(200).send(result);
        });
    });

}
module.exports = {
    HandleGetApi: HandleGetApi
};
