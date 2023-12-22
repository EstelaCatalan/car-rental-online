const mongoose = require('mongoose');

const reservaSchema = new Schema({
    inicio: {
        type: Date,
        required: true
    },
    fin: {
        type: Date,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    entrega: Date,
    devolucion: Date,
    fecha: {
        type: Date,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    costoDia: {
        type: Number,
        required: true
    }
});

reservaSchema.methods.recalcularCosto = function() {
    if (this.inicio && this.fin && this.costoDia) {
        const restatiemp = this.fin.getTime() - this.inicio.getTime();
        const diasAlquiler = Math.ceil(restatiemp / (1000 * 60 * 60 * 24));
        this.costo = diasAlquiler * this.costoDia;
        this.costo = Math.round((this.costo + Number.EPSILON) * 100) / 100;
    } else {
        this.costo = undefined;
    }
};

module.exports = mongoose.model('Reserva', reservaSchema);