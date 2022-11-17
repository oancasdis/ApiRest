const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/DLagregar", (req, res) => {
    db.serialize(function() {
        db.run("INSERT INTO sensorDataLuz (intensidadRojo, intensidadVerde, intensidadAzul) VALUES (123, 123, 123)");
        db.run("INSERT INTO sensorDataLuz (intensidadRojo, intensidadVerde, intensidadAzul) VALUES (1234, 1243, 1423)");
    });
    res.end('agregar')
});

app.get("/DLobtenerUno/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT id, intensidadRojo, intensidadVerde, intensidadAzul FROM sensorDataLuz WHERE id = ?", [req.params.id] ,function(err, row) {
            console.log(row.id + ' ' + row.intensidadRojo + ' ' + row.intensidadVerde + ' ' + row.intensidadAzul);
        });
    });
    res.end('obtenerUno')
});

app.get("/DLobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT id, intensidadRojo, intensidadVerde, intensidadAzul FROM sensorDataLuz", function(err, row) {
            console.log(row.id + ' ' + row.intensidadRojo + ' ' + row.intensidadVerde + ' ' + row.intensidadAzul);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/DLborrarUno/:id", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.run("DELETE FROM sensorDataLuz WHERE id = ?", [req.params.id]);
    });
    res.end('borrarUno')
});

app.put("/DLeditaUno/:valor/:id", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.run("UPDATE location SET intensidadRojo = ? WHERE id = ?", [req.params.valor, req.params.id]);
    });
    res.end('EditaUno')
});

module.exports = app;