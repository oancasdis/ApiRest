const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/location/Lagregar/:companyApiKey/:locationName/:locationCountry/:locationCity/:locationMeta", (req, res) => {
    db.serialize(function() {
        const location = req.params;
        db.each("SELECT id, adminId FROM company WHERE companyApiKey = ?", [location.companyApiKey] ,function(err, row) {
            console.log(row);
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
    res.status(201).send('OK');
});

app.get("/api/v1/location/LobtenerUno/:companyApiKey/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT location.id, location.companyId, location.adminId, location.locationName, location.locationCountry, location.locationCity, location.locationMeta FROM location INNER JOIN company ON location.companyId = company.id WHERE company.companyApiKey = ? AND location.id = ?", [req.params.companyApiKey, req.params.id] ,function(err, row) {
            console.log(row);
            res.status(201).send(row);
        });
    });
    
});

app.get("/api/v1/location/LobtenerTodos/:companyApiKey", (req, res) => {
    //console.log(req.params.companyApiKey);
    db.serialize(function() {
        db.all("SELECT location.id, location.companyId, location.adminId, location.locationName, location.locationCountry, location.locationCity, location.locationMeta FROM location INNER JOIN company ON location.companyId = company.id WHERE company.companyApiKey = ?", [req.params.companyApiKey], function(err, row) {
            console.log(JSON.stringify(row));
            res.status(201).send(row);
        });
    });
});

app.delete("/api/v1/location/LborrarUno/:companyApiKey/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.run("DELETE FROM location WHERE ROWID IN (SELECT lo.ROWID FROM location lo INNER JOIN company co ON (lo.companyId = co.id) WHERE co.companyApiKey = ? AND lo.id = ?)", [req.params.companyApiKey, req.params.id]);
    });
    res.status(201).send('OK');
});

app.put("/api/v1/location/LeditaUno/:locationName/:locationCountry/:locationCity/:locationMeta/:companyApiKey/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        const locationEdit = req.params;
        db.run("UPDATE location SET locationName = ?, locationCountry = ?, locationCity = ?, locationMeta = ? WHERE EXISTS (SELECT * FROM company WHERE location.companyId = id AND companyApiKey = ? AND location.id = ? )", 
        [
            locationEdit.locationName,
            locationEdit.locationCountry,
            locationEdit.locationCity,
            locationEdit.locationMeta,
            locationEdit.companyApiKey,
            locationEdit.id
        ]);
    });
    res.status(201).send('OK');
});

module.exports = app;
