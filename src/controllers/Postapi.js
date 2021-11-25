const { request } = require('express');
const Joi = require('joi');
const { validate } = require('../models/postRequest');
const amqplib = require('amqplib');
//const { v1: uuidv1 } = require('uuid')
//const crypto = require("crypto");
//const { createBinaryUUID, fromBinaryUUID } = require("binary-uuid");


async function HandlePostApi(request, response) {
    // Validation
    const { error, value } = validate(request);
    if (error) return response
        .status(400)
        .send({ "error": error.details[0].message });
    else {
        Email = request.body.email
        Name = request.body.name
        Phone = request.body.phone
        const msg = JSON.stringify({ Email, Name, Phone });
        await addmessages(msg);
        await consumemessages();
        //console.log("tamam")
        return response.status(200).send({ Msg: "Successful Entry" });
    }


}

async function addmessages(msg) {
    const conn = await amqplib.connect('amqp://localhost');
    const ch = await conn.createChannel();
    const queue = 'messages';
    await ch.assertQueue(queue);
    return ch.sendToQueue(queue, Buffer.from(msg, 'utf-8'));

}

async function consumemessages() {
    const conn = await amqplib.connect('amqp://localhost');
    const ch = await conn.createChannel();
    await ch.assertQueue("messages");
    return ch.consume("messages", (msg) => {
        if (msg != null) {
            const m = JSON.parse(msg.content.toString());
            //const m = JSON.stringify(msg.content);
            //console.log(m)
            InsertToDatabase(m.Email, m.Name, m.Phone)

        }
    }, {
        noAck: true
    }
    )


}

function InsertToDatabase(email, name, phone) {
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
        var sql = "INSERT INTO messages (email,name,phone) VALUES (?,?,?)";
        con.query(sql, [//fromBinaryUUID(binaryID.buffer),
            email, name, phone], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
    });
}



module.exports = {
    HandlePostApi: HandlePostApi
};