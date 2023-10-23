const Usuario = require("./usuario");

class Empleado extends Usuario{
    constructor (_id){
        super(_id)
        this._rol='Empleado'
    }
};
module.exports=Empleado;