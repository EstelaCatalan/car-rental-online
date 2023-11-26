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

app.put('/car-rental-online/api/reservas', (req, res) => {
    try {
        const nuevasReservas = req.body;

        model.setReservas([]);

        model.setReservas(nuevasReservas);

        const reservasActualizadas = model.getReservas();
        
        res.json(reservasActualizadas);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al hacer PUT de reservas' });
    }
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



module.exports = app;


