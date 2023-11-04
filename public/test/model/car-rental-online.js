
describe("car-rental-online", function () {
    let carrentalonline;
    let vehiculos = new Array();
    let clientes = new Array();
    let empleados = new Array();
    let lastid = 0;
    let usuario = null;
    let reservas = new Array();
    const usuario1 = {
        dni: '123',
        nombres: 'nombre1',
        apellidos: 'apellidos1',
        direccion: 'direccion1',
        email: 'email1',
        password: 'password1',
        telefono: 'telefono1',
        rol: 'Cliente',
    }
    const usuario2 = {
        dni: '1234',
        nombres: 'nombre2',
        apellidos: 'apellidos2',
        direccion: 'direccion2',
        email: 'email2',
        password: 'password2',
        telefono: 'telefono2',
        rol: 'Cliente',
    }
    const usuario3 = {
        dni: '123456',
        nombres: 'nombre3',
        apellidos: 'apellidos3',
        direccion: 'direccion3',
        email: 'email3',
        password: 'password3',
        telefono: 'telefono3',
        rol: 'Cliente',
    }
    const usuario4 = {
        dni: '123',
        nombres: 'nombre1',
        apellidos: 'apellidos1',
        direccion: 'direccion1',
        email: 'email1',
        password: 'password1',
        telefono: 'telefono1',
        rol: 'Empleado',
    }
    const usuario5 = {
        dni: '1234',
        nombres: 'nombre2',
        apellidos: 'apellidos2',
        direccion: 'direccion2',
        email: 'email2',
        password: 'password2',
        telefono: 'telefono2',
        rol: 'Empleado',
    }
    const usuario6 = {
        dni: '12345',
        nombres: 'nombre3',
        apellidos: 'apellidos3',
        direccion: 'direccion3',
        email: 'email3',
        password: 'password3',
        telefono: 'telefono3',
        rol: 'Empleado',
    }


    beforeEach(function () {
        carrentalonline = new CarRentalOnline();



    })
    it("constructor Car-Rental-Online", function () {
        assert.equal(carrentalonline._vehiculos.length, vehiculos.length);
        assert.equal(carrentalonline._clientes.length, clientes.length);
        assert.equal(carrentalonline._empleados.length, empleados.length);
        assert.equal(carrentalonline.lastid, lastid);
        assert.equal(carrentalonline._usuario, usuario);
        assert.equal(carrentalonline._reservas.length, reservas.length);


    });
    it("get clientes", function () {

        clientes.push(usuario1);
        clientes.push(usuario2);
        clientes.push(usuario3);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);
        assert.deepEqual(carrentalonline._clientes, clientes)

    })
    it("get empleados", function () {

        empleados.push(usuario4);
        empleados.push(usuario5);
        empleados.push(usuario6);
        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);
        assert.deepEqual(carrentalonline._empleados, empleados)

    })
    it("get vehiculos", function () {


    })
    it("get reservas", function () {


    })
    it("agregar clientes", function () {
        carrentalonline.agregarCliente(usuario1);
        clientes1 = new Array();
        clientes1.push(usuario1);
        //Comprobamos los errores con un usuario que ya existe y uno que sea empleado
        assert.throws(() => carrentalonline.agregarCliente(usuario6), `El objeto no tiene rol de Cliente`);
        assert.throws(() => carrentalonline.agregarCliente(usuario1), `Ya existe un cliente con ese DNI`);
        //comprobamos que se ha metido el cliente que no nos da error
        assert.deepEqual(carrentalonline._clientes, clientes1);


    })
    it("agregar empleados", function () {
        carrentalonline.agregarEmpleado(usuario5);
        empleados1 = new Array();
        empleados1.push(usuario5);
        //Comprobamos los errores con un usuario que ya existe y uno que sea empleado
        assert.throws(() => carrentalonline.agregarEmpleado(usuario1), `El objeto no tiene rol de Empleado`);
        assert.throws(() => carrentalonline.agregarEmpleado(usuario5), `Ya existe un empleado con ese DNI`);
        //comprobamos que se ha metido el cliente que no nos da error
        assert.deepEqual(carrentalonline._empleados, empleados1);


    })
    it("signin", function () {
        //agregamos un cliente y un empleado para que pueda encontrarlos
        carrentalonline.agregarEmpleado(usuario6);
        carrentalonline.agregarCliente(usuario1);
        //signin de cliente con todo correcto y comprobamos que se inicia sesion
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        assert.deepEqual(carrentalonline.usuario, usuario1);
        carrentalonline.signin(usuario6.email, usuario6.password, usuario6.rol);
        assert.deepEqual(carrentalonline.usuario, usuario6);
        //ahora comprobamos los errores
        //rol no válido
        assert.throws(() => carrentalonline.signin(usuario1.email, usuario1.password, 'jshfhbw'), "Rol no válido");
        //contraseña o email incorrecto
        assert.throws(() => carrentalonline.signin(usuario1.email, 'jhdkfjs', usuario1.rol), "Credenciales incorrectas");
        assert.throws(() => carrentalonline.signin('jhdkjh', usuario1.password, usuario1.rol), "Credenciales incorrectas");
    })
    it("signup", function () {
        //registramos un cliente y un empleado correctos
        carrentalonline.signup(usuario1);
        carrentalonline.signup(usuario6);
        //comprobamos los errores
        //Empleado ya registrado email
        assert.throws(() => carrentalonline.signup(usuario6));
        //Cliente ya registrado email
        assert.throws(() => carrentalonline.signup(usuario1));
        //ahora registramos esos emails con diferente rol
        usuario6.rol = "Cliente";
        usuario1.rol = "Empleado";
        //y no deberia sacar ningún error
        carrentalonline.signup(usuario6);
        carrentalonline.signup(usuario1);
    })
    it("signout cliente y empleado", function () {
        usuario6.rol = "Empleado";
        usuario1.rol = "Cliente";
        //agregamos tres clientes
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);
        //agregamos tres empleados
        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);
        //verificamos que no hay ningún usuario al inicio
        assert.equal(carrentalonline.usuario, null);
        //iniciamos sesión cliente
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        //comprobamos que ha iniciado sesion
        assert.deepEqual(carrentalonline.usuario, usuario1);
        //iniciamos sesion empleado
        carrentalonline.signin(usuario4.email, usuario4.password, usuario4.rol);
        //comprobamos que ha iniciado sesion
        assert.deepEqual(carrentalonline.usuario, usuario4);
        //ahora comprobamos que cierra sesión
        carrentalonline.signout();
        assert.equal(carrentalonline.usuario, null);

    })
    it("perfil", function () {
        //agregamos tres clientes
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);
        //agregamos tres empleados
        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);
        //iniciamos sesión cliente
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        assert.deepEqual(carrentalonline.perfil(), usuario1);
        //iniciamos sesion empleado
        carrentalonline.signin(usuario4.email, usuario4.password, usuario4.rol);
        assert.deepEqual(carrentalonline.perfil(), usuario4);
        //hacemos signout para comprobar que luego el perfil devuelve un error
        carrentalonline.signout();
        assert.throws(() => carrentalonline.perfil(), "No ha iniciado sesión ningún usuario");
    })
    it("Cliente by email", function () {
        //agregamos tres clientes
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);
        //aqui buscamos un email que si que existe
        assert.deepEqual(carrentalonline.clienteByEmail(usuario1.email), usuario1);
        //ahora uno que no existe para que saque error
        assert.throws(() => carrentalonline.clienteByEmail("jhsfkd"), "El cliente con ese email no existe");


    })
    it("Empleado by email", function () {
        //agregamos tres empleados
        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);
        //aqui buscamos un email que si que existe
        assert.deepEqual(carrentalonline.empleadoByEmail(usuario4.email), usuario4);
        //ahora uno que no existe para que saque error
        assert.throws(() => carrentalonline.empleadoByEmail("jhsfkd"), "El empleado con ese email no existe");

    })
    it("Cliente by id", function () {
        //agregamos tres clientes
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);
        //aqui buscamos un id que si que existe
        assert.deepEqual(carrentalonline.clienteById(usuario1.id), usuario1);
        //buscamos un id que no existe
        assert.throws(() => carrentalonline.clienteById("30"),"El cliente con ese id no existe");
    })
    it("Empleado by id", function () {
       //agregamos tres empleados
       carrentalonline.agregarEmpleado(usuario4);
       carrentalonline.agregarEmpleado(usuario5);
       carrentalonline.agregarEmpleado(usuario6);
        //aqui buscamos un id que si que existe
        assert.deepEqual(carrentalonline.empleadoById(usuario4.id), usuario4);
        //buscamos un id que no existe
        assert.throws(() => carrentalonline.empleadoById("30"),"El empleado con ese id no existe");
    })







})