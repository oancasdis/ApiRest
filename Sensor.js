const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/Sagregar", (req, res) => {
    db.serialize(function() {
        db.run("INSERT INTO sensor (adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiString) VALUES (1, 1, 'sensorName', 'sensorCategory', 'sensorMeta', 'sensorApiString')");
        db.run("INSERT INTO sensor (adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiString) VALUES (2, 2, 'sensorName', 'sensorCategory', 'sensorMeta', 'sensorApiString')");
    });
    res.end('agregar')
});

app.get("/SobtenerUno/:location", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.each("SELECT adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiString FROM sensor WHERE locationId = ?", [req.params.location] ,function(err, row) {
            console.log(row.locationId + ' ' + row.sensorId + ' ' + row.sensorName + ' ' + row.sensorCategory + ' ' + row.sensorMeta + ' ' + row.sensorApiString);
        });
    });
    res.end('obtenerUno')
});

app.get("/SobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT adminId, locationId, sensorName, sensorCategory, sensorMeta, sensorApiString FROM sensor", function(err, row) {
            console.log(row.locationId + ' ' + row.sensorId + ' ' + row.sensorName + ' ' + row.sensorCategory + ' ' + row.sensorMeta + ' ' + row.sensorApiString);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/SborrarUno/:location", (req, res) => {
    // console.log(req.params.location)
    db.serialize(function() {
        db.run("DELETE FROM sensor WHERE locationId = ?", [req.params.location]);
    });
    res.end('borrarUno')
});

app.put("/SeditaUno/:valor/:location", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.run("UPDATE sensor SET sensorName = ? WHERE locationId = ?", [req.params.valor, req.params.location]);
    });
    res.end('EditaUno')
});


module.exports = app;