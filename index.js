const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Location = require('./Location');
const Sensor = require('./Sensor');
const Tablas = require('./Tablas');
const DataLuz = require('./DataSensorLuz');
const DataTemp = require('./DataSensorTemp');
const Admin = require('./Admin')
const Company = require('./Company')

const app = express();
// const db = new sqlite3.Database('database.db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/v1/admin/Aagregar/:username/:password', Admin)
app.get('/api/v1/admin/AobtenerTodos', Admin)

app.post('/api/v1/company/Cagregar/:id/:companyName/:companyApiKey', Company)
app.get('/api/v1/company/CobtenerTodos', Company)

app.post('/api/v1/location/Lagregar/:companyApiKey/:locationName/:locationCountry/:locationCity/:locationMeta', Location)
app.get('/api/v1/location/LobtenerUno/:companyApiKey/:id', Location)
app.get('/api/v1/location/LobtenerTodos/:companyApiKey', Location)
app.delete('/api/v1/location/LborrarUno/:id', Location)
app.put('/api/v1/location/LeditaUno/:locationName/:locationCountry/:locationCity/:locationMeta/:companyApiKey/:id', Location)

app.post('/api/v1/sensor/Sagregar/:companyApiKey/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey', Sensor)
app.get('/api/v1/sensor/SobtenerUno/:companyApiKey', Sensor)
app.get('/api/v1/sensor/SobtenerTodos', Sensor)
app.delete('/api/v1/sensor/SborrarUno/:companyApiKey', Sensor)
app.put('/api/v1/sensor/SeditaUno/:sensorName/:sensorCategory/:sensorMeta/:sensorApiKey/:id', Sensor)

app.post('/api/v1/sensor_data/DLagregar', DataLuz)
app.get('/api/v1/sensor_data/DLobtenerUno/:sensorApiKey', DataLuz)
app.get('/api/v1/sensor_data/DLobtenerTodos/:sensorApiKey', DataLuz)
app.delete('/api/v1/sensor_data/DLborrarUno/:sensorApiKey/:id', DataLuz)
app.put('/api/v1/sensor_data/DLeditaUno/:intensidadRojo/:intensidadVerde/:intensidadAzul/:sensorApiKey/:id', DataLuz)

app.post('/api/v1/sensor_data', DataTemp)
app.get('/api/v1/sensor_data/:companyApiKey/:sensorApiKey/:id', DataTemp)
app.get('/api/v1/sensor_allData/:companyApiKey/:sensorApiKey', DataTemp)
app.delete('/api/v1/sensor_data/DTborrarUno/:sensorApiKey/:id', DataTemp)
app.put('/api/v1/sensor_data/DTeditaUno/:temperaturaK/:temperaturaF/:sensorApiKey/:id', DataTemp)

app.post('/crearTablas', Tablas)

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
