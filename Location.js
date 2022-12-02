const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Lagregar", (req, res) => {
    db.serialize(function() {
        db.run("INSERT INTO location (companyId, adminId, locationName, locationCountry, locationCity, locationMeta) VALUES (1, 1, 'locationame', 'locationcountry', 'locationcity', 'locationmeta')");
        db.run("INSERT INTO location (companyId, adminId, locationName, locationCountry, locationCity, locationMeta) VALUES (2, 2, 'locationname1', 'locationcountry1', 'locationcity1', 'locationmeta1')");
    });
    res.end('agregar')
});

app.get("/LobtenerUno/:company", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT companyId, adminId, locationName, locationCountry, locationCity, locationMeta FROM location WHERE companyId = ?", [req.params.company] ,function(err, row) {
            console.log(row.companyId + ' ' + row.locationName + ' ' + row.locationCountry + ' ' + row.locationCity + ' ' + row.locationMeta);
        });
    });
    res.end('obtenerUno')
});

app.get("/LobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT companyId, adminId, locationName, locationCountry, locationCity, locationMeta FROM location", function(err, row) {
            console.log(row.companyId + ' ' + row.locationName + ' ' + row.locationCountry + ' ' + row.locationCity + ' ' + row.locationMeta);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/LborrarUno/:company", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.run("DELETE FROM location WHERE companyId = ?", [req.params.company]);
    });
    res.end('borrarUno')
});

app.put("/LeditaUno/:valor/:company", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.run("UPDATE location SET locationName = ? WHERE companyId = ?", [req.params.valor, req.params.company]);
    });
    res.end('EditaUno')
});

module.exports = app;
