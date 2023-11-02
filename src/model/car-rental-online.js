class CarRentalOnline {
    _vehiculos
    _clientes
    _empleados
    lastid
    usuario
    _reservas
    constructor() {
        this._vehiculos = new Array();
        this._clientes = new Array();
        this._empleados = new Array();
        this._reservas = new Array();
        this.lastid = 0;
        this.usuario = null;
    }
    genId() {
        this.id++;
        return this.id;
    }
    getClientes() {
        return this._clientes;
    }
    getVehiculos() {
        return this._vehiculos;
    }
    getReservas() {
        return this._reservas;
    }
    getEmpleados() {
        return this._empleados;

    }
    agregarCliente(obj) {
        const dni = obj.dni;
        const clienteExiste = this._clientes.find(cliente => cliente.dni === dni);
        if (clienteExiste) {
            throw new Error(`Ya existe un cliente con el DNI ${dni}`);
        }
        const nuevoCliente = {
            dni: obj.dni,
            nombres: obj.nombres,
            apellidos: obj.apellidos,
            direccion: obj.direccion,
            email: obj.email,
            password: obj.password,
            telefono: obj.telefono,
            rol: obj.rol,
        };

        this._clientes.push(nuevoCliente);

    }
    agregarEmpleado(obj) {
        const dni = obj.dni;
        const clienteExiste = this._Empleados.find(empleado => empleado.dni === dni);
        if (clienteExiste) {
            throw new Error(`Ya existe un cliente con el DNI ${dni}`);
        }
        const nuevoEmpleado = {
            dni: obj.dni,
            nombres: obj.nombres,
            apellidos: obj.apellidos,
            direccion: obj.direccion,
            email: obj.email,
            password: obj.password,
            telefono: obj.telefono,
            rol: obj.rol,
        };

        this._empleados.push(nuevoEmpleado);

    }
    signin(email, password, rol) {
        let usuarioEncontrado = null;
        if (rol === "empleado") {
            usuarioEncontrado = this._empleados.find(empleado => empleado.email === email && empleado.password === password);
        } else if (rol === "cliente") {
            usuarioEncontrado = this._clientes.find(cliente => cliente.email === email && cliente.password === password);
        } else {
            throw new Error("Rol no válido");
        }

        if (usuarioEncontrado) {
            this.usuario = usuarioEncontrado;
        } else {
            throw new Error("Credenciales incorrectas");
        }
    }
    signup(obj) {

        if (rol === "empleado") {
            const empleadoExistente = this._empleados.find(empleado => empleado.email === obj.email);
            if (empleadoExistente) {
                throw new Error("El email ya está registrado como empleado");
            }
        } else if (rol === "cliente") {
            const clienteExistente = this._clientes.find(cliente => cliente.email === obj.email);
            if (clienteExistente) {
                throw new Error("El email ya está registrado como cliente");
            }
        } else {
            throw new Error("Rol no válido");
        }
        if (rol === "empleado") {
            this._empleados.push(obj);
        } else if (rol === "cliente") {
            this._clientes.push(obj);
        }
    }
    signout(){
        this._usuario=null;
    }
    perfil(){
        if(this.usuario!=null){
            return this.usuario
        }
        else{
            throw new Error("No ha iniciado sesión ningún usuario")
        }
    }
    clienteByEmail(email){
        const clienteExistente = this._clientes.find(cliente => cliente.email ===email);
        if(clienteExistente){
            return cliente
        }
        else{
            throw new Error("El cliente con email"+email+" no existe")
        }
    }
    empleadoByEmail(email){
        const empleadoExistente = this._clientes.find(empleado => empleado.email ===email);
        if(empleadoExistente){
            return empleado
        }
        else{
            throw new Error("El empleado con email"+email+" no existe")
        }
    }
    clienteById(id){
        const clienteExistente = this._clientes.find(cliente => cliente.id ===id);
        if(clienteExistente){
            return cliente
        }
        else{
            throw new Error("El cliente con id"+id+" no existe")
        }
    }
    empleadoByid(id){
        const empleadoExistente = this._clientes.find(empleado => empleado.id ===id);
        if(empleadoExistente){
            return empleado
        }
        else{
            throw new Error("El empleado con id"+id+" no existe")
        }
    }
}
module.exports=CarRentalOnline;