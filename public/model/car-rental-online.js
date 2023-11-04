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
        const rol =obj.rol;
        const clienteExiste = this._clientes.find(cliente => cliente.dni === dni );
        if (rol=='Cliente'){
        if (clienteExiste) {
            throw new Error(`Ya existe un cliente con ese DNI`);
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

        this._clientes.push(nuevoCliente);}
        else {
            throw new Error (`El objeto no tiene rol de Cliente`);
        }

    }
    agregarEmpleado(obj) {
        const dni = obj.dni;
        const rol = obj.rol;
        const empleadoExiste = this._empleados.find(empleado => empleado.dni === dni);
        if(rol=='Empleado'){
        if (empleadoExiste) {
            throw new Error(`Ya existe un empleado con ese DNI`);
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

        this._empleados.push(nuevoEmpleado);}
        else{
            throw new Error (`El objeto no tiene rol de Empleado`);
        }

    }
    signin(email, password, rol) {
        let usuarioEncontrado = null;
        if (rol === "Empleado") {
            usuarioEncontrado = this._empleados.find(empleado => empleado.email === email && empleado.password === password);
        } else if (rol === "Cliente") {
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

        if (obj.rol === "Empleado") {
            const empleadoExistente = this._empleados.find(empleado => empleado.email === obj.email);
            if (empleadoExistente) {
                throw new Error("El email ya está registrado como empleado");
            }
        } else if (obj.rol === "Cliente") {
            const clienteExistente = this._clientes.find(cliente => cliente.email === obj.email);
            if (clienteExistente) {
                throw new Error("El email ya está registrado como cliente");
            }
        } else {
            throw new Error("Rol no válido");
        }
        if (obj.rol === "Empleado") {
            this._empleados.push(obj);
        } else if (obj.rol === "Cliente") {
            this._clientes.push(obj);
        }
    }
    signout(){
        this.usuario=null;
    }
    perfil(){
        if(this.usuario!=null){
            return this.usuario
        }
        else{
            throw new Error("No ha iniciado sesión ningún usuario")
        }
    }
    clienteByEmail(email) {
        let cliente = this._clientes.find(cliente => cliente.email === email);
        if (cliente) {
            return cliente;
        } else {
            throw new Error("El cliente con ese email no existe");
        }
    }
    empleadoByEmail(email){
        let empleado = this._empleados.find(empleado => empleado.email === email);
        if (empleado) {
            return empleado;
        } else {
            throw new Error("El empleado con ese email no existe");
        }
    }
    clienteById(id){
        let cliente = this._clientes.find(cliente => cliente.id ===id);
        if(cliente){
            return cliente
        }
        else{
            throw new Error("El cliente con ese id no existe")
        }
    }
    empleadoById(id){
        let empleado = this._empleados.find(empleado => empleado.id ===id);
        if(empleado){
            return empleado
        }
        else{
            throw new Error("El empleado con ese id no existe")
        }
    }
}
