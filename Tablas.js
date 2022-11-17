const express = require('express');
const db = require('./db')

const app = express();

app.post("/crearTablas", (req, res) => {
    db.serialize(function() {
        // Create a table
        db.run("CREATE TABLE IF NOT EXISTS admin (username TEXT, password TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS company (id INTEGER PRIMARY KEY, companyName TEXT, companyApiKey TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS location (companyId INTEGER, locationName TEXT, locationCountry TEXT, locationCity TEXT, locationMeta TEXT, foreign key(companyId) references company(id))");
        db.run("CREATE TABLE IF NOT EXISTS sensor (locationId INTEGER, sensorId INTEGER, sensorName TEXT, sensorCategory TEXT, sensorMeta TEXT, sensorApiString TEXT, foreign key(locationId) references location(id), foreign key(sensorId) references sensorDataLuz(id))");
        db.run("CREATE TABLE IF NOT EXISTS sensorDataLuz (id INTEGER PRIMARY KEY, intensidadRojo INTEGER, intensidadVerde INTEGER, intensidadAzul INTEGER)");
        db.run("CREATE TABLE IF NOT EXISTS sensorDataTemperatura (id INTEGER PRIMARY KEY, temperaturaK INTEGER, temperaturaF INTEGER)");
    });
    res.end('crearTablas')
});

module.exports = app;