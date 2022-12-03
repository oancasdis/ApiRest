const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Sagregar/:companyApiKey/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey", (req, res) => {
    db.serialize(function() {
        db.each("SELECT location.adminId, location.id FROM location INNER JOIN company ON location.companyId = company.id WHERE company.companyApiKey = ?", [req.params.companyApiKey] ,function(err, row) {
            console.log(row);
            db.run("INSERT INTO sensor (adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey)"
            + "VALUES (?, ?, ?, ?, ?, ?)",
            [
                row.adminId,
                row.id, 
                req.params.sensorName,
                req.params.sensorCategory,
                req.params.sensorMeta,
                req.params.sensorApiKey
            ]);
        });
    });
    res.end('agregar')
});

app.get("/SobtenerUno/:sensorApiKey/:id", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.each("SELECT id, adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor WHERE sensorApiKey = ? AND id = ?", [req.params.sensorApiKey, req.params.id] ,function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerUno')
});

app.get("/SobtenerTodos/:sensorApiKey", (req, res) => {
    db.serialize(function() {
        db.each("SELECT id, adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor WHERE sensorApiKey = ?", [req.params.sensorApiKey] ,function(err, row) {
            console.log(row);
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

app.put("/SeditaUno/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey/:id", (req, res) => {
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
