const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/sensor_data/DLagregar", (req, res) => {
    db.serialize(function() {
        for(let i = 0;i < Object.keys(req.body.json_data).length;i++){
            db.each("SELECT id FROM sensor WHERE sensorApiKey = ?", [req.body.api_key] ,function(err, row) {
                console.log(row);
                db.run("INSERT INTO sensorDataLuz (intensidadRojo, intensidadVerde, intensidadAzul, sensorId)"
                + "VALUES (?, ?, ?, ?)",
                [
                    req.body.json_data[i].intensidadRojo,
                    req.body.json_data[i].intensidadVerde,
                    req.body.json_data[i].intensidadAzul,
                    row.id
                ]);
            });
        }
    });
    res.end('agregar')
});

app.get("/api/v1/sensor_data/DLobtenerUno/:companyApiKey/:sensorApiKey", (req, res) => {
    // console.log(req.params.sensorApiKey)
    db.serialize(function() {
        db.each("SELECT sensorDataLuz.id, sensorDataLuz.intensidadRojo, sensorDataLuz.intensidadVerde, sensorDataLuz.intensidadAzul, sensorDataLuz.sensorId FROM sensorDataLuz INNER JOIN sensor ON sensor.id = sensorDataLuz.sensorId INNER JOIN location ON location.id = sensor.locationId INNER JOIN company ON company.id = location.companyId WHERE company.companyApiKey = ? AND sensor.sensorApiKey = ?", [req.params.companyApiKey, req.params.sensorApiKey],function(err, row) {
            console.log(row);
        });
    });
    res.end('obtenerUno')
});

app.get("/api/v1/sensor_data/DLobtenerTodos/:sensorApiKey", (req, res) => {
    db.serialize(function() {
        db.each("SELECT sensorDataLuz.id, sensorDataLuz.intensidadRojo, sensorDataLuz.intensidadVerde, sensorDataLuz.intensidadAzul, sensorDataLuz.sensorId" 
        + "FROM sensorDataLuz INNER JOIN sensor ON sensorDataLuz.sensorId = sensor.id" 
        + "WHERE sensor.sensorApiKey = ?", [req.params.sensorApiKey] ,function(err, row) {
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
