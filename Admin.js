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

module.exports = app;
