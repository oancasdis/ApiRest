const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/company/Cagregar/:id/:companyName/:companyApiKey", (req, res) => {
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

app.get("/api/v1/company/CobtenerTodos", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT * FROM company", function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerUno')
});

module.exports = app;