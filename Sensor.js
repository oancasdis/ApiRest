const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Sagregar/:companyApiKey/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey", (req, res) => {
    db.serialize(function() {
        const sensor = req.params;
        db.each("SELECT locationId, adminId FROM location INNER JOIN company ON location.companyId = company.id WHERE companyApiKey = ?", [location.companyApiKey] ,function(err, row) {
            //console.log(row.companyId + ' ' + row.locationName + ' ' + row.locationCountry + ' ' + row.locationCity + ' ' + row.locationMeta);
            db.run("INSERT INTO sensor (adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey)"
            + "VALUES (?, ?, ?, ?, ?, ?)",
            [
                row.adminId,
                row.locationId, 
                sensor.sensorName,
                sensor.sensorCategory,
                sensor.sensorMeta,
                sensor.sensorApiKey
            ]);
        });
    });
    res.end('agregar')
});

app.get("/SobtenerUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.each("SELECT adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor WHERE sensorApiKey = ?", [req.params.sensorApiKey] ,function(err, row) {
            console.log(row.locationId + ' ' + row.sensorId + ' ' + row.sensorName + ' ' + row.sensorCategory + ' ' + row.sensorMeta + ' ' + row.sensorApiKey);
        });
    });
    res.end('obtenerUno')
});

app.get("/SobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor", function(err, row) {
            console.log(row.adminId + ' ' + row.locationId + ' ' + row.sensorName + ' ' + row.sensorCategory + ' ' + row.sensorMeta + ' ' + row.sensorApiString);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/SborrarUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.run("DELETE FROM sensor WHERE sensorApiKey = ?", [req.params.sensorApiKey]);
    });
    res.end('borrarUno')
});

app.put("/SeditaUno/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey/:adminId", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        const sensor = req.params;
        db.run("UPDATE sensor SET sensorName = ?, sensorCategory = ?, sensorMeta = ? WHERE sensorApiKey = ? AND adminId = ?",
        [
            sensor.sensorName,
            sensor.sensorCategory,
            sensor.sensorMeta,
            sensor.sensorApiKey,
            sensor.adminId,
        ]);
    });
    res.end('EditaUno')
});


module.exports = app;