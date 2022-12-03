const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/sensor_data/DLagregar/:sensorApiKey/:intensidadRojo/:intensidadVerde/:intensidadAzul", (req, res) => {
    db.serialize(function() {
        const luz = req.params;
        db.each("SELECT id FROM sensor WHERE sensorApiKey = ?", [luz.sensorApiKey] ,function(err, row) {
            // console.log(row.locationId + ' ' + row.sensorId + ' ' + row.sensorName + ' ' + row.sensorCategory + ' ' + row.sensorMeta + ' ' + row.sensorApiString);
            db.run("INSERT INTO sensorDataLuz (intensidadRojo, intensidadVerde, intensidadAzul, sensorId)"
            + "VALUES (?, ?, ?, ?)",
            [
                luz.intensidadRojo,
                luz.intensidadVerde,
                luz.intensidadAzul,
                row.id
            ]);
        });
    });
    res.end('agregar')
});

app.get("/api/v1/sensor_data/DLobtenerUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT sensorDataLuz.id, sensorDataLuz.intensidadRojo, sensorDataLuz.intensidadVerde, sensorDataLuz.intensidadAzul, sensorDataLuz.sensorId FROM sensorDataLuz INNER JOIN sensor ON sensorDataLuz.sensorId = sensor.id WHERE sensor.sensorApiKey = ? AND sensorDataLuz.sensorId = ?", [req.params.sensorApiKey, req.params.id] ,function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerUno')
});

app.get("/api/v1/sensor_data/DLobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT sensorDataLuz.id, sensorDataLuz.intensidadRojo, sensorDataLuz.intensidadVerde, sensorDataLuz.intensidadAzul, sensorDataLuz.sensorId FROM sensorDataLuz INNER JOIN sensor ON sensorDataLuz.sensorId = sensor.id WHERE sensor.sensorApiKey = ?", [req.params.sensorApiKey] ,function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/api/v1/sensor_data/DLborrarUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.run("DELETE FROM sensorDataLuz WHERE ROWID IN (SELECT a.ROWID FROM sensorDataLuz a INNER JOIN sensor b ON (a.sensorId = b.id) WHERE b.sensorApiKey = ? AND a.sensorId = ?)", [req.params.sensorApiKey, req.params.id]);
    });
    res.end('borrarUno')
});

app.put("/api/v1/sensor_data/DLeditaUno/:intensidadRojo/:intensidadVerde/:intensidadAzul/:sensorApiKey/:id", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        const sensorEdit = req.params;
        db.run("UPDATE sensorDataLuz SET intensidadRojo = ?, intensidadVerde = ?, intensidadAzul = ?, WHERE EXISTS (SELECT * FROM sensor WHERE sensorApiKey = ? AND sensorDataLuz.id = ? )", 
        [
            sensorEdit.intensidadRojo,
            sensorEdit.intensidadVerde,
            sensorEdit.intensidadAzul,
            sensorEdit.sensorApiKey,
            sensorEdit.id
        ]);
    });
    res.end('EditaUno')
});

module.exports = app;
