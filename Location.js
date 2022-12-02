const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Lagregar/:companyApiKey/:locationName/:locationCountry/:locationCity/:locationMeta", (req, res) => {
    db.serialize(function() {
        const location = req.params;
        db.each("SELECT id, adminId FROM company WHERE companyApiKey = ?", [location.companyApiKey] ,function(err, row) {
            console.log(row.id + ' ' + row.adminId);
            db.run("INSERT INTO location (companyId, adminId, locationName, locationCountry, locationCity, locationMeta)"
            + "VALUES (?, ?, ?, ?, ?, ?)",
            [
                row.id,
                row.adminId,
                location.locationName,
                location.locationCountry,
                location.locationCity,
                location.locationMeta
            ]);
        });
    });
    res.end('agregar')
});

app.get("/LobtenerUno/:companyApiKey", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT companyId, adminId, locationName, locationCountry, locationCity, locationMeta FROM location WHERE companyApiKey = ?", [req.params.companyApiKey] ,function(err, row) {
            console.log(row.companyId + ' ' + row.adminId + ' ' + row.locationName + ' ' + row.locationCountry + ' ' + row.locationCity + ' ' + row.locationMeta);
        });
    });
    res.end('obtenerUno')
});

app.get("/LobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT companyId, adminId, locationName, locationCountry, locationCity, locationMeta FROM location", function(err, row) {
            console.log(row.companyId + ' ' + row.adminId + ' ' + row.locationName + ' ' + row.locationCountry + ' ' + row.locationCity + ' ' + row.locationMeta);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/LborrarUno/:companyApiKey", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.run("DELETE FROM location WHERE companyApiKey = ?", [req.params.companyApiKey]);
    });
    res.end('borrarUno')
});

app.put("/LeditaUno/:valor/:companyApiKey", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.run("UPDATE location SET locationName = ? WHERE companyApiKey = ?", [req.params.valor, req.params.companyApiKey]);
    });
    res.end('EditaUno')
});

module.exports = app;
