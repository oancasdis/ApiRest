const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Aagregar/:username/:password", (req, res) => {
    db.serialize(function() {
        const admin = req.params;
        db.run("INSERT INTO admin (username, password)"
        + "VALUES (?, ?)",
        [
            admin.username,
            admin.password
        ]);
    });
    res.end('agregar')
});

app.get("/AobtenerTodos", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT * FROM admin", function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerUno')
});

module.exports = app;
