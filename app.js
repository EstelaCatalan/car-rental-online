const express = require('express')

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
