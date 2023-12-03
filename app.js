
const port = 3000;
const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const CarRentalOnline = require('./src/model/car-rental-online');
let model = new CarRentalOnline();
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const path = require('path')
app.use('/car-rental-online', express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
    console.log(`Car Rental Online listening on port ${port}`)
})
app.use('/car-rental-online/api', (req, res) => {
    res.status(501).send('501 Not Implemented');
});
app.get('/car-rental-online/componentes', (req, res) => {
    res.sendFile(__dirname + '/public/components');
});

app.get('/car-rental-online/model', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/model/index.html'));
});
app.get('/car-rental-online/test', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/test/index.html'));
});
app.get(/^\/car-rental-online/, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/car-rental-online/css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/css'));
});
app.get('/car-rental-online/api/clientes', (req, res) => {
    res.status(200).json(model.clientes);
});
app.put('/car-rental-online/api/clientes', (req, res) => {
    let usuarios = req.body;
    model.usuarios = usuarios.map(u => {
    let usuario = model.agregarUsuario(u);
    Object.assign(usuario, u)
    return usuario;
    });
    res.status(200).json(model._clientes);
    });