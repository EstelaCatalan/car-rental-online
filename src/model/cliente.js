const Usuario = require("./usuario");

class Cliente extends Usuario{
    constructor(_id){
        super(_id)
        this._rol='Cliente'
    }
};
module.exports=Cliente;