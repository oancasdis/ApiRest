const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Cagregar/:id/:companyName/:companyApiKey", (req, res) => {
    db.serialize(function() {
        db.each("SELECT id FROM admin WHERE id = ?", [req.params.id] ,function(err, row) {
            console.log(row.id);
            db.run("INSERT INTO company (adminId, companyName, companyApiKey)"
            + "VALUES (?, ?, ?)",
            [
                row.id,
                req.params.companyName,
                req.params.companyApiKey,
            ]);
        });
    });
    res.end('agregar')
});

module.exports = app;