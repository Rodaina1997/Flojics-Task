var mysql = require('mysql');

async function HandleGetApi(request, response) {

    try {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "Mymessages"
        });

        con.connect(async function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "SELECT * FROM messages";
            await con.query(sql, async function (err, result) {
                if (err) throw err;
                //console.log(result);
                return response.status(200).send(result);
            });
        })

    }

    catch (ex) {
        response.status(400).send({ "error": ex.message });
    }



}
module.exports = {
    HandleGetApi: HandleGetApi
};
