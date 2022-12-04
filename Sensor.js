const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/sensor/Sagregar/:companyApiKey/:sensorName/:sensorCategory/:sensorMeta", (req, res) => {
    const sensorApiKey = Math.floor(Math.random() * 10000);
    db.serialize(function() {
        const sensor = req.params;
        db.each("SELECT location.adminId, location.id FROM location INNER JOIN company ON location.companyId = company.id WHERE company.companyApiKey = ?", [sensor.companyApiKey] ,function(err, row) {
            console.log(row);
            db.run("INSERT INTO sensor (adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey)"
            + "VALUES (?, ?, ?, ?, ?, ?)",
            [
                row.adminId,
                row.id, 
                sensor.sensorName,
                sensor.sensorCategory,
                sensor.sensorMeta,
                sensorApiKey
            ]);
        });
    });
    res.status(201).send('OK');
});

app.get("/api/v1/sensor/SobtenerUno/:sensorApiKey/:id", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.each("SELECT id, adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor WHERE sensorApiKey = ? AND id = ?", [req.params.sensorApiKey, req.params.id] ,function(err, row) {
            console.log(row);
            res.status(201).send(row);
        });
    });
    
});

app.get("/api/v1/sensor/SobtenerTodos/:sensorApiKey", (req, res) => {
    db.serialize(function() {
        db.each("SELECT id, adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiKey FROM sensor WHERE sensorApiKey = ?", [req.params.sensorApiKey] ,function(err, row) {
            console.log(row);
            res.status(201).send(row);
        });
    });
});

app.delete("/api/v1/sensor/SborrarUno/:companyApiKey/:id", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.run("DELETE FROM sensor WHERE ROWID IN (SELECT se.ROWID FROM sensor se INNER JOIN location lo ON (se.locationId = lo.id) INNER JOIN company co ON (co.id = lo.companyId) WHERE co.companyApiKey = ? AND se.id = ?)", [req.params.companyApiKey, req.params.id]);
    });
    res.status(201).send('OK');
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
    res.status(201).send('OK');
});

module.exports = app;
