const express = require('express')
const CarRentalOnline = require('./src/model/car-rental-online.js');
const fs = require('fs');
const app = express()
const port = 3000
app.get('/', (req, res) => {
    res.send('Hello World!')
})
const path = require('path')
app.use('/car-rental-online', express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
    console.log(`Car Rental Online listening on port ${port}`)
})

const model = new CarRentalOnline();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/car-rental-online/componentes', (req, res) => {
    res.sendFile(__dirname + '/public/components');
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



module.exports = app;


