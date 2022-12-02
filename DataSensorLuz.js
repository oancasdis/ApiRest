const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/DLagregar/:sensorApiKey/:intensidadRojo/:intensidadVerde/:intensidadAzul", (req, res) => {
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

app.get("/DLobtenerUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT id, intensidadRojo, intensidadVerde, intensidadAzul, sensorId FROM sensorDataLuz WHERE sensorApiKey = ?", [req.params.sensorApiKey] ,function(err, row) {
            console.log(row.id + ' ' + row.intensidadRojo + ' ' + row.intensidadVerde + ' ' + row.intensidadAzul + ' ' + row.sensorId);
        });
    });
    res.end('obtenerUno')
});

app.get("/DLobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT id, intensidadRojo, intensidadVerde, intensidadAzul, sensorId FROM sensorDataLuz", function(err, row) {
            console.log(row.id + ' ' + row.intensidadRojo + ' ' + row.intensidadVerde + ' ' + row.intensidadAzul + ' ' + row.sensorId);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/DLborrarUno/:sensorApiKey", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.run("DELETE FROM sensorDataLuz WHERE sensorApiKey = ?", [req.params.sensorApiKey]);
    });
    res.end('borrarUno')
});

app.put("/DLeditaUno/:intensidadRojo/:intensidadVerde/:intensidadAzul/:sensorApiKey/:sensorId", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        const sensorEdit = req.params;
        db.run("UPDATE location SET intensidadRojo = ?, intensidadVerde = ?, intensidadAzul = ?, WHERE sensorApiKey = ? AND id = ?", 
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