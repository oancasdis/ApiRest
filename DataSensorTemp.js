const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/api/v1/sensor_data", (req, res) => {
    db.serialize(function() {
        for(let i = 0;i < Object.keys(req.body.json_data).length;i++){
            db.each("SELECT id FROM sensor WHERE sensorApiKey = ?", [req.body.api_key] ,function(err, row) {
                console.log(row);
                db.run("INSERT INTO sensorDataTemperatura (temperaturaK, temperaturaF, sensorId)"
                + "VALUES (?, ?, ?)",
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

app.get("/api/v1/sensor_data/:companyApiKey/:sensorApiKey/:id", (req, res) => {
    for(let i = 0;i < Object.keys(req.params.id).length;i++){
        db.serialize(function() {
            db.each("SELECT sensorDataTemperatura.id, sensorDataTemperatura.temperaturaK, sensorDataTemperatura.temperaturaF, sensorDataTemperatura.sensorId FROM sensorDataTemperatura INNER JOIN sensor ON sensor.id = sensorDataTemperatura.sensorId INNER JOIN location ON location.id = sensor.locationId INNER JOIN company ON company.id = location.companyId WHERE company.companyApiKey = ? AND sensor.sensorApiKey = ? AND sensorDataTemperatura.id = ?", [req.params.companyApiKey, req.params.sensorApiKey, req.params.id[i]] ,function(err, row) {
                console.log(row);
            });
        });
    }
    res.status(201).send('OK');
});

app.get("/api/v1/sensor_allData/:companyApiKey/:sensorApiKey", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.each("SELECT sensorDataTemperatura.id, sensorDataTemperatura.temperaturaK, sensorDataTemperatura.temperaturaF, sensorDataTemperatura.sensorId FROM sensorDataTemperatura INNER JOIN sensor ON sensor.id = sensorDataTemperatura.sensorId INNER JOIN location ON location.id = sensor.locationId INNER JOIN company ON company.id = location.companyId WHERE company.companyApiKey = ? AND sensor.sensorApiKey = ?", [req.params.companyApiKey, req.params.sensorApiKey], function(err, row) {
            console.log(row);
        });
    });
    res.status(201).send('OK');
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
            sensorEdit.sensorId
        ]);
    });
    res.status(201).send('OK');
});

module.exports = app;
