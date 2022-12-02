const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Cagregar/:id/:companyName/:companyApiKey", (req, res) => {
    db.serialize(function() {
        const company = req.params;
        db.each("SELECT id FROM admin WHERE id = ?", [company.id] ,function(err, row) {
            console.log(row.id);
            db.run("INSERT INTO company (adminId, companyName, companyApiKey)"
            + "VALUES (?, ?, ?)",
            [
                row.id,
                company.companyName,
                company.companyApiKey,
            ]);
        });
    });
    res.end('agregar')
});

module.exports = app;