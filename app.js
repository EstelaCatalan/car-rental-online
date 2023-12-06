

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
const path = require('path');
const { error } = require('console');
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
        model.agregarEmpleado(u);
        let empleado = u;
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
        model._clientes = model._clientes.filter(cliente => cliente.id != cid);
        res.json({ message: `Cliente con id ${cid} eliminado` });

    }

});
app.delete('/car-rental-online/api/empleados/:eid', (req, res) => {
    let eid = req.params.eid;
    
    let usuario = model.empleadoById(eid);
    
    
    if (!usuario)
        res.status(404).json({
            message: `Empleado con id ${eid} no encontrado` });
    else {
        model._empleados = model._empleados.filter(empleado => empleado.id != eid);
        res.json({ message: `Empleado con id ${eid} eliminado` });

    }

});
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
    let usuario= model.clienteById(id);
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
    let usuario= model.empleadoById(id);
    if(!usuario)
        res.status(404).json({
            message:`Empleado con id ${id} no encontrado` 
    });
    else{
        res.status(200).json(usuario);
    }
})


app.post('/car-rental-online/api/signin',(req,res)=>{
    const { email, password, rol } = req.body;
    model.signin(email,password,rol);
    res.status(200).json(model.usuario);
 })
app.post('/car-rental-online/api/signup',(req,res)=>{
    let usuario= req.body;
    model.signup(usuario);
    if(usuario.rol="Cliente"){
    res.status(200).json(model._clientes);}
    else{
        res.status(200).json(model._empleados); 
    }
})
app.put('/car-rental-online/api/usuarios/:uid', (req, res) => {
    const uid = req.params.uid;
    const perfil = req.body;

    let usuarioEncontrado = null;

    try {
        // Intentar buscar al usuario como empleado
        try {
            usuarioEncontrado = model.empleadoById(uid);
        } catch (error) {
            console.error("Error al buscar empleado:", error.message);
        }

        // Si no se encuentra como empleado, buscar en la lista de clientes
        if (!usuarioEncontrado) {
            usuarioEncontrado = model.clienteById(uid);
        }

        if (usuarioEncontrado) {
            try {
                const updated = model.setPerfil(perfil);

                if (updated) {
                    res.status(200).json(usuarioEncontrado);
                } else {
                    res.status(400).json({
                        message: "Las contraseñas no coinciden"
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: error.message
                });
            }
        } else {
            res.status(404).json({
                message: `Usuario con id ${uid} no encontrado`
            });
        }
    } catch (error) {
        console.error("Error al buscar usuario:", error.message);
        res.status(500).json({
            message: "Error interno al buscar usuario"
        });
    }
});
            



app.get('/car-rental-online/api/clientes/:cid/reservas',(req,res)=>{
    let cid= req.params.cid;
    let reservas=model.reservasByClienteId(cid);
    res.status(200).json(reservas);

});
app.get('/car-rental-online/api/vehiculos', (req, res) => {
    try {
        const vehiculos = model.getVehiculos();

        res.status(200).json(vehiculos);
    } catch (error) {
        console.error('Error al procesar el pedido GET de vehículos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener vehículos' });
    }
});
app.get('/car-rental-online/api/reservas', (req, res) => {
    try {
        const reservas = model.getReservas();

        if (reservas.length === 0) {
            res.json({ message: 'No hay reservas' });
        } else {
            res.json(reservas);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
});

app.put('/car-rental-online/api/vehiculos', (req, res) => {
    try {
        const nuevosVehiculos = req.body;

        const vehiculosTransformados = nuevosVehiculos.map(vehiculoData => new CarRentalOnline.Vehiculo(vehiculoData));

        model.setVehiculos([]);

        model.setVehiculos(vehiculosTransformados);

        res.status(200).json(model.getVehiculos());
    } catch (error) {
        console.error('Error al procesar el pedido PUT de vehículos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al actualizar vehículos' });
    }
});
app.put('/car-rental-online/api/reservas', (req, res) => {
    try {
        const nuevasReservas = req.body;

        model.setReservas(nuevasReservas);

        const reservasActualizadas = model.getReservas();
        
        res.json(reservasActualizadas);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al hacer PUT de reservas' });
    }
});
app.put('/car-rental-online/api/vehiculos', (req, res) => {
    try {
        const nuevosVehiculos = req.body;

        const vehiculosTransformados = nuevosVehiculos.map(vehiculoData => new CarRentalOnline.Vehiculo(vehiculoData));

        model.setVehiculos([]);

        model.setVehiculos(vehiculosTransformados);

        res.status(200).json(model.getVehiculos());
    } catch (error) {
        console.error('Error al procesar el pedido PUT de vehículos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al actualizar vehículos' });
    }
});
app.get('/car-rental-online/api/reservas/:id', (req, res) => {
    try {

        const reservaId = req.params.id;

        const reserva = model.reservaById(reservaId);

        if (!reserva) {
            res.status(404).json({ message: 'Reserva no encontrada' });
            return;
        }

        res.json(reserva);
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
});
app.delete('/car-rental-online/api/reservas', (req, res) => {
    try {
        const numeroReserva = req.query.numero;

        if (!numeroReserva) {
            return res.status(400).json({ error: 'Número de reserva no proporcionado' });
        }
        try {
        const resultado = model.cancelar(numeroReserva);
        } catch (error) {
            res.status(404).json({ error: 'Reserva no encontrada' });
        }

        if (resultado) {
            res.json({ message: `Reserva con número ${numeroReserva} cancelada` });
        } else {
            res.status(404).json({ error: `No se encontró una reserva ${numeroReserva}` });
        }

    } catch (error) {

        res.status(500).json({ error: 'Error DELETE reservas' });
    }
});

module.exports = app;