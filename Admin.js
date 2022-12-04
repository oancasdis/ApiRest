const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/admin/Aagregar/:username/:password", (req, res) => {
    db.serialize(function() {
        const admin = req.params;
        db.run("INSERT INTO admin (username, password)"
        + "VALUES (?, ?)",
        [
            admin.username,
            admin.password
        ]);
    });
    res.status(201).send('OK');
});

app.get("/api/v1/admin/AobtenerTodos", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT * FROM admin", function(err, row) {
            console.log(row);
            res.send(row);
        });
    });
});

module.exports = app;
