const express = require('express');
const db = require('./db')

const app = express();

app.post("/crearTablas", (req, res) => {
    db.serialize(function() {
        // Create a table
        db.run("CREATE TABLE IF NOT EXISTS admin"
        + "(id INTEGER PRIMARY KEY,"
        + "username TEXT,"
        + "password TEXT)");

        db.run("CREATE TABLE IF NOT EXISTS company" 
        + "(id INTEGER PRIMARY KEY,"
        + "adminId INTEGER," 
        + "companyName TEXT," 
        + "companyApiKey TEXT,"
        + "foreign key(adminId) references admin(id))");

        db.run("CREATE TABLE IF NOT EXISTS location"
        + "(id INTEGER PRIMARY KEY,"
        + "companyId INTEGER," 
        + "adminId INTEGER," 
        + "locationName TEXT," 
        + "locationCountry TEXT," 
        + "locationCity TEXT,"
        + "locationMeta TEXT," 
        + "foreign key(adminId) references admin(id),"
        + "foreign key(companyId) references company(id))");
        
        db.run("CREATE TABLE IF NOT EXISTS sensor"
        + "(id INTEGER PRIMARY KEY,"
        + "adminId INTEGER,"
        + "locationId INTEGER,"
        + "sensorName TEXT," 
        + "sensorCategory TEXT," 
        + "sensorMeta TEXT,"
        + "sensorApiString TEXT," 
        + "foreign key(locationId) references location(id)," 
        + "foreign key(adminId) references admin(id))");

        db.run("CREATE TABLE IF NOT EXISTS sensorDataLuz"
        + "(id INTEGER PRIMARY KEY,"
        + "sensorId INTEGER,"
        + "intensidadRojo INTEGER,"
        + "intensidadVerde INTEGER," 
        + "intensidadAzul INTEGER,"
        + "foreign key(sensorId) references sensor(id))");

        db.run("CREATE TABLE IF NOT EXISTS sensorDataTemperatura"
        + "(id INTEGER PRIMARY KEY,"
        + "sensorId INTEGER,"
        + "temperaturaK INTEGER," 
        + "temperaturaF INTEGER"
        + "foreign key(sensorId) references sensor(id))");
    });
    res.end('crearTablas')
});

module.exports = app;