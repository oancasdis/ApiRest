const express = require('express');
const Tablas = require('./Tablas');
const db = require('./db');

const app = express();

app.post("/DTagregar", (req, res) => {
    db.serialize(function() {
        const temp = req.params;
        db.run("INSERT INTO sensorDataTemperatura (temperaturaK, temperaturaF, sensorId)"
        + "VALUES (?, ?)",
        [
            temp.temperaturaK,
            temp.temperaturaF
        ]);
    });
    res.end('agregar')
});

app.get("/DTobtenerUno/:id", (req, res) => {
    // console.log(req.params.company)
    db.serialize(function() {
        db.each("SELECT id, temperaturaK, temperaturaF, sensorId FROM sensorDataTemperatura WHERE id = ?", [req.params.id] ,function(err, row) {
            console.log(row.id + ' ' + row.temperaturaK + ' ' + row.temperaturaF);
        });
    });
    res.end('obtenerUno')
});

app.get("/DTobtenerTodos", (req, res) => {
    db.serialize(function() {
        db.each("SELECT id, temperaturaK, temperaturaF, sensorId FROM sensorDataTemperatura", function(err, row) {
            console.log(row.id + ' ' + row.temperaturaK + ' ' + row.temperaturaF);
        });
    });
    res.end('obtenerTodos')
});

app.delete("/DTborrarUno/:id", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.run("DELETE FROM sensorDataTemperatura WHERE id = ?", [req.params.id]);
    });
    res.end('borrarUno')
});

app.put("/DTeditaUno/:valor/:id", (req, res) => {
    // console.log(req.params.id)
    db.serialize(function() {
        db.run("UPDATE location SET temperaturaK = ? WHERE id = ?", [req.params.valor, req.params.id]);
    });
    res.end('EditaUno')
});

module.exports = app;