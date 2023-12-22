var mongoose = require('mongoose');
var Schema = mongoose.Schema;


   var schema = Schema({
    
    dni:{ type: String, required: true },

    nombres:{ type: String, required: true },

    apellidos:{ type: String, required: true },

    direccion:{ type: String, required: true },

    email:{ type: String, required: true },

    password:{ type: String, required: true },

    rol:"Empleado",

    telefono:{ type: String, required: true },

   });
   module.exports = mongoose.model('Empleado', schema);

