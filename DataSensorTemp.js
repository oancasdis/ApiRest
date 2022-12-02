const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/sensor_data/:sensorApiKey/:temperaturaK/:temperaturaF", (req, res) => {
    db.serialize(function() {
        const temp = req.params;
        db.each("SELECT id FROM sensor WHERE sensorApiKey = ?", [temp.sensorApiKey] ,function(err, row) {
            // console.log(row.locationId + ' ' + row.sensorId + ' ' + row.sensorName + ' ' + row.sensorCategory + ' ' + row.sensorMeta + ' ' + row.sensorApiString);
            db.run("INSERT INTO sensorDataTemperatura (temperaturaK, temperaturaF, sensorId)"
            + "VALUES (?, ?, ?)",
            [
                temp.temperaturaK,
                temp.temperaturaF,
                row.id
            ]);
        });
    });
    res.end('agregar')
});

app.get("/api/v1/sensor_data/:sensorApiKey/:sensorId", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT id, temperaturaK, temperaturaF, sensorId FROM sensorDataTemperatura WHERE sensorApiKey = ? AND sensorId IN ?", [req.params.sensorApiKey, req.params.sensorId] ,function(err, row) {
            console.log(row.id + ' ' + row.temperaturaK + ' ' + row.temperaturaF + ' ' + row.sensorId);
        });
    });
    res.end('obtenerUno')
});

app.get("/api/v1/sensor_allData", (req, res) => {
    db.serialize(function() {
        db.each("SELECT id, temperaturaK, temperaturaF, sensorId FROM sensorDataTemperatura", function(err, row) {
            console.log(row.id + ' ' + row.temperaturaK + ' ' + row.temperaturaF + ' ' + row.sensorId);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/DTborrarUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.run("DELETE FROM sensorDataTemperatura WHERE sensorApiKey = ?", [req.params.sensorApiKey]);
    });
    res.end('borrarUno')
});

app.put("/DTeditaUno/:temperaturaK/:temperaturaF/:sensorApiKey/:sensorId", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        const sensorEdit = req.params;
        db.run("UPDATE location SET temperaturaK = ?, temperaturaF = ? WHERE sensorApiKey = ? AND id = ?", 
        [
            sensorEdit.temperaturaK,
            sensorEdit.temperaturaF,
            sensorEdit.sensorApiKey,
            sensorEdit.sensorId
        ]);
    });
    res.end('EditaUno')
});

module.exports = app;