const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/sensor_data", (req, res) => {
    db.serialize(function() {
        for(let i = 0;i < Object.keys(req.body.json_data).length;i++){
            db.each("SELECT id FROM sensor WHERE sensorApiKey = ?", [req.body.api_key] ,function(err, row) {
                console.log(row);
                db.run("INSERT INTO sensorDataTemperatura (temperaturaK, temperaturaF, sensorId, createAt)"
                + "VALUES (?, ?, ?, UNIXEPOCH())",
                [
                    req.body.json_data[i].temperaturaK,
                    req.body.json_data[i].temperaturaF,
                    row.id
                ]);
            });
        }
    });
    res.status(201).send('OK');
});

app.get("/api/v1/sensor_data/:id/:sensorApiKey", (req, res) => {
    // for(let i = 0;i < Object.keys(req.params.id).length;i++){
        db.serialize(function() {
            db.all("SELECT sensorDataTemperatura.id, sensorDataTemperatura.temperaturaK, sensorDataTemperatura.temperaturaF, sensorDataTemperatura.sensorId, sensorDataTemperatura.createAt FROM sensorDataTemperatura INNER JOIN sensor ON sensor.id = sensorDataTemperatura.sensorId INNER JOIN location ON location.id = sensor.locationId INNER JOIN company ON company.id = location.companyId WHERE sensorDataTemperatura.id = ? AND sensor.sensorApiKey = ? AND company.companyApiKey = ?", 
            [req.params.id, req.params.sensorApiKey, req.query.companyApiKey] ,function(err, row) {
                console.log(row);
                res.status(201).send(JSON.stringify(row) + 'Consulta Hora:' + Date.now());
            });
        });
    // }
});

app.get("/api/v1/sensor_allData/:sensorApiKey", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.all("SELECT sensorDataTemperatura.id, sensorDataTemperatura.temperaturaK, sensorDataTemperatura.temperaturaF, sensorDataTemperatura.sensorId, sensorDataTemperatura.createAt FROM sensorDataTemperatura INNER JOIN sensor ON sensor.id = sensorDataTemperatura.sensorId INNER JOIN location ON location.id = sensor.locationId INNER JOIN company ON company.id = location.companyId WHERE sensor.sensorApiKey = ? AND company.companyApiKey = ?", [req.params.sensorApiKey, req.query.companyApiKey], function(err, row) {
            console.log(row);
            console.log('Consulta Hora:' + Date.now() );
            res.status(201).send(JSON.stringify(row) + 'Consulta Hora:' + Date.now());
        });
    });
});

app.delete("/api/v1/sensor_data/DTborrarUno/:sensorApiKey/:id", (req, res) => {
    //console.log(req.params.id)
    db.serialize(function() {
        db.run("DELETE FROM sensorDataTemperatura WHERE ROWID IN (SELECT a.ROWID FROM sensorDataTemperatura a INNER JOIN sensor b ON (a.sensorId = b.id) WHERE b.sensorApiKey = ? AND a.sensorId = ?)", [req.params.sensorApiKey, req.params.id]);
    });
    res.status(201).send('OK');
});

app.put("/api/v1/sensor_data/DTeditaUno/:temperaturaK/:temperaturaF/:sensorApiKey/:id", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        const sensorEdit = req.params;
        db.run("UPDATE sensorDataTemperatura SET temperaturaK = ?, temperaturaF = ? WHERE EXISTS (SELECT * FROM sensor WHERE sensorApiKey = ? AND sensorDataTemperatura.id = ? )", 
        [
            sensorEdit.temperaturaK,
            sensorEdit.temperaturaF,
            sensorEdit.sensorApiKey,
            sensorEdit.id
        ]);
    });
    res.status(201).send('OK');
});

module.exports = app;
