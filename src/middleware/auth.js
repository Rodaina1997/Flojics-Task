const jwt = require('jsonwebtoken');
const config = require('config');
var mysql = require('mysql');
const jwtKey = "my_secret_key"

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, jwtKey);
        mobile = decoded.mobile;

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "Mymessages"
        });

        con.connect(function (err) {
            if (err) throw err;
            var sql = "SELECT phone FROM messages WHERE phone =?"
            con.query(sql, mobile, async (err, result) => {
                if (err) throw err;
                console.log("result ", result);
                console.log(result.length)
                if (result.length == 0) return res.status(400).send('This user doesnt exist');
                next();
            });
        });


    }
    catch (ex) {
        //console.log(ex)
        return res.status(400).send('Invalid Token.');
    }
}