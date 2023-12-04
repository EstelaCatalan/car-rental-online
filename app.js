

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
// app.use('/car-rental-online/api', (req, res) => {
//     res.status(501).send('501 Not Implemented');
// });
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
    res.status(200).json(model.getClientes());
});
app.put('/car-rental-online/api/clientes', (req, res) => {
    let clientes = req.body;
    model._clientes = clientes.map(u => {
        let cliente = model.agregarCliente(u);
        Object.assign(cliente, u)
        return cliente;
    });
    res.status(200).json(model._clientes);
});
app.get('/car-rental-online/api/empleados', (req, res) => {
    res.status(200).json(model.getEmpleados());
});
app.put('/car-rental-online/api/empleados', (req, res) => {
    let empleados = req.body;
    model._empleados = empleados.map(u => {
        let empleado = model.agregarEmpleado(u);
        Object.assign(empleado, u)
        return empleado;
    });
    res.status(200).json(model._empleados);
});
