

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
//app.get(/^\/car-rental-online/, (req, res) => {
// res.sendFile(path.join(__dirname, '/public/index.html'));
//});
app.get('/car-rental-online/css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/css'));
});
app.get('/car-rental-online/api/clientes', (req, res) => {
    res.status(200).json(model._clientes);
});
app.put('/car-rental-online/api/clientes', (req, res) => {
    let clientes = req.body;
    model._clientes = clientes.map(u => {
        model.agregarCliente(u);
        let cliente = u;
        Object.assign(cliente, u)
        return cliente;
    });
    res.status(200).json(model._clientes);
});
app.get('/car-rental-online/api/empleados', (req, res) => {
    res.status(200).json(model._empleados);
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
app.delete('/car-rental-online/api/clientes/:cid', (req, res) => {
    let cid = req.params.cid;
    let usuario = model.clienteById(cid);
    if (!usuario)
        res.status(404).json({
            message: `Usuario con id ${cid} no encontrado` });
    else {
        model._clientes = model._clientes.filter(cliente => cliente.id !== cid);
        res.status(200).json(usuario);
    }

})
app.delete('/car-rental-online/api/empleados/:eid', (req, res) => {
    let eid = req.params.eid;
    let usuario = model.empleadoById(eid);
    if (!usuario)
        res.status(404).json({
            message: `Empleado con id ${eid} no encontrado` });
    else {
        model._empleados = model._empleados.filter(empleado => empleado.id !== eid);
        res.status(200).json(usuario);
    }

})
app.get('/car-rental-online/api/clientes?email=', (req,res)=>{
    let email= req.params.email;
    let usuario= model.clienteByEmail(email);
    if(!usuario)
        res.status(404).json({
            message:`Cliente con email ${email} no encontrado` 
    });
    else{
        res.status(200).json(usuario);
    }
})
app.get('/car-rental-online/api/empleados?email=', (req,res)=>{
    let email= req.params.email;
    let usuario= model.empleadoByEmail(email);
    if(!usuario)
        res.status(404).json({
            message:`Empleado con email ${email} no encontrado` 
    });
    else{
        res.status(200).json(usuario);
    }
})
app.get('/car-rental-online/api/clientes/:cid', (req,res)=>{
    let id= req.params.cid;
    let usuario= model.clienteByid(id);
    if(!usuario)
        res.status(404).json({
            message:`Cliente con id ${id} no encontrado` 
    });
    else{
        res.status(200).json(usuario);
    }
})
app.get('/car-rental-online/api/empleados/:eid', (req,res)=>{
    let id= req.params.eid;
    let usuario= model.empleadoByid(id);
    if(!usuario)
        res.status(404).json({
            message:`Empleado con id ${id} no encontrado` 
    });
    else{
        res.status(200).json(usuario);
    }
})
app.post('/car-rental-online/api/signin',(req,res)=>{
    let usuario=req.body;
    model.signin(usuario);
    res.status(200).json(usuario);
})
