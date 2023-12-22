const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
    matricula: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    etiqueta: { type: String, required: true },
    tipo: { type: String, required: true },
    disponible: { type: Boolean, required: true },
    eliminado: { type: Boolean, required: true },
    costoDia: { type: Number, required: true },
    descripcion: { type: String, required: true },
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;
