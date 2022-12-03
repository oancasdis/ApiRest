const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/sensor/Sagregar/:companyApiKey/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey", (req, res) => {
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

app.get("/api/v1/sensor/SobtenerUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.each("SELECT adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor WHERE sensorApiKey = ?", [req.params.sensorApiKey] ,function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerUno')
});

app.get("/api/v1/sensor/SobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor", function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/api/v1/sensor/SborrarUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.run("DELETE FROM sensor WHERE sensorApiKey = ?", [req.params.sensorApiKey]);
    });
    res.end('borrarUno')
});

app.put("/api/v1/sensor/SeditaUno/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        const sensor = req.params;
        db.run("UPDATE sensor SET sensorName = ?, sensorCategory = ?, sensorMeta = ? WHERE sensorApiKey = ? AND sensor.id = ? ",
        [
            sensor.sensorName,
            sensor.sensorCategory,
            sensor.sensorMeta,
            sensor.sensorApiKey,
            sensor.id,
        ]);
    });
    res.end('EditaUno')
});

module.exports = app;
