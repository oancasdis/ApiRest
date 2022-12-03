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

app.get("/LobtenerUno/:companyApiKey/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT location.id, location.companyId, location.adminId, location.locationName, location.locationCountry, location.locationCity, location.locationMeta FROM location INNER JOIN company ON location.companyId = company.id WHERE company.companyApiKey = ? AND location.id = ?", [req.params.companyApiKey, req.params.id] ,function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerUno')
});

app.get("/LobtenerTodos/:companyApiKey", (req, res) => {
    //console.log(req.params.companyApiKey);
    db.serialize(function() {
        db.each("SELECT location.id, location.companyId, location.adminId, location.locationName, location.locationCountry, location.locationCity, location.locationMeta FROM location INNER JOIN company ON location.companyId = company.id WHERE company.companyApiKey = ?", [req.params.companyApiKey], function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/LborrarUno/:companyApiKey/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.run("DELETE FROM location WHERE ROWID IN (SELECT lo.ROWID FROM location lo INNER JOIN company co ON (lo.companyId = co.id) WHERE co.companyApiKey = ? AND lo.id = ?)", [req.params.companyApiKey, req.params.id]);
    });
    res.end('borrarUno')
});

app.put("/LeditaUno/:locationName/:locationCountry/:locationCity/:locationMeta/:companyApiKey/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        const locationEdit = req.params;
        db.run("UPDATE location JOIN company ON location.companyId = company.id SET locationName = ?, locationCountry = ?, locationCity = ?, locationMeta = ? WHERE company.companyApiKey = ? AND location.id = ?", 
        [
            locationEdit.locationName,
            locationEdit.locationCountry,
            locationEdit.locationCity,
            locationEdit.locationMeta,
            locationEdit.companyApiKey,
            locationEdit.id
        ]);
    });
    res.end('EditaUno')
});

module.exports = app;
