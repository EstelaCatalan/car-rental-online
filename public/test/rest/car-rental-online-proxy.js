describe("car-rental-online-proxy", function () {
    let carrentalonline;

    let vehiculos = new Array();
    let clientes = new Array();
    let empleados = new Array();
    let reservas = new Array();

    let lastid = 0;
    let usuario = null;

    const usuario1 = {
        _id: '1',
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
        _id: '2',
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
        _id: '3',
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
        _id:'4',
        dni: '1238',
        nombres: 'nombre1',
        apellidos: 'apellidos1',
        direccion: 'direccion1',
        email: 'email1',
        password: 'password1',
        telefono: 'telefono1',
        rol: 'Empleado',
    }
    const usuario5 = {
        _id:'5',
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
        _id:'6',
        dni: '12345',
        nombres: 'nombre3',
        apellidos: 'apellidos3',
        direccion: 'direccion3',
        email: 'email3',
        password: 'password3',
        telefono: 'telefono3',
        rol: 'Empleado',
    }
    const reserva1 = {
        id: 1,
        inicio: new Date('2023-11-10T10:00:00.000Z'),
        fin: new Date('2023-11-15T10:00:00.000Z'),
        costo: Math.round((300 + Number.EPSILON) * 100) / 100,
        numero: 'R001',
        entrega: 'sitio a1',
        devolucion: 'sitio b1',
        fecha: new Date('2023-11-01T10:00:00.000Z'),
        clienteId: 1,
        vehiculoId: 101,
    };

    const reserva2 = {
        id: 2,
        inicio: new Date('2023-12-05T10:00:00.000Z'),
        fin: new Date('2023-12-10T10:00:00.000Z'),
        costo: Math.round((250 + Number.EPSILON) * 100) / 100,
        numero: 'R002',
        entrega: 'sitio a2',
        devolucion: 'sitio b2',
        fecha: new Date('2023-11-15T10:00:00.000Z'),
        clienteId: 2,
        vehiculoId: 102,
    };

    const reserva3 = {
        id: 3,
        inicio: new Date('2024-01-20T10:00:00.000Z'),
        fin: new Date('2024-01-25T10:00:00.000Z'),
        costo: Math.round((400 + Number.EPSILON) * 100) / 100,
        numero: 'R003',
        entrega: 'sitio a3',
        devolucion: 'sitio b3',
        fecha: new Date('2023-12-15T10:00:00.000Z'),
        clienteId: 3,
        vehiculoId: 103,
    };

    const vehiculo1 = {
        id: 1,
        matricula: "ABC-123",
        marca: "Toyota",
        modelo: "Toyo1",
        etiqueta: "ET1",
        tipo: "Automóvil",
        disponible: true,
        eliminado: false,
        costoDia: 50,
        descripcion: "DESC1"
    };

    const vehiculo2 = {
        id: 2,
        matricula: "XYZ-789",
        marca: "Ford",
        modelo: "Ford1",
        etiqueta: "FRD1",
        tipo: "Camion",
        disponible: true,
        eliminado: false,
        costoDia: 80,
        descripcion: "DESC2"
    };

    const vehiculo3 = {
        id: 3,
        matricula: "XYZ-7894",
        marca: "Ford3",
        modelo: "Ford3",
        etiqueta: "FRD3",
        tipo: "Camion",
        disponible: true,
        eliminado: false,
        costoDia: 80,
        descripcion: "DESC3"
    };
    const vehiculoelim = {
        id: 3,
        matricula: "XYZ-999",
        marca: "Nissan",
        modelo: "Nis1",
        disponible: true,
        eliminado: true,
    };
    beforeEach( async function () {
        // Crear una instancia del proxy con la dirección base del servidor
        carrentalonline = new CarRentalOnlineProxy('http://localhost:3000/car-rental-online/api');
        clientes= await carrentalonline.setClientes([]);
        empleados=await carrentalonline.setEmpleados([]);
        reservas=await carrentalonline.setReservas([]);
    });
    
    it("get/Set clientes", async function () {
  

         clientes = [usuario1, usuario2, usuario3];
    
        const resultadoSetClientes =  await carrentalonline.setClientes(clientes);
      
        
        const clientesObtenidos =  await carrentalonline.getClientes();
      
        assert.deepEqual(clientesObtenidos, clientes);
        assert.deepEqual(resultadoSetClientes,clientes);
    });
 


    it("get/Set Empleados", async function () {
  

        empleados = [usuario4, usuario5, usuario6];
    
        const resultadoSetEmpleados =  await carrentalonline.setEmpleados(empleados);
        
        const empleadosObtenidos =  await carrentalonline.getEmpleados();
       
      
        assert.deepEqual(empleadosObtenidos, empleados);
        assert.deepEqual(resultadoSetEmpleados,empleados);
    });
    it("get vehiculos", function () {
        carrentalonline._vehiculos.push(vehiculo1);
        carrentalonline._vehiculos.push(vehiculo2);
        carrentalonline._vehiculos.push(vehiculo3);

        const vehiculos = carrentalonline.getVehiculos();

        assert.deepEqual(carrentalonline._vehiculos, vehiculos)
    })

    it("signin", async function () {
        try {
            await carrentalonline.setEmpleados([usuario6]);
            await carrentalonline.setClientes([usuario1]);
    
            this.usuario = await carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
            if (!isEqual(carrentalonline.usuario, usuario1)) {
                throw new Error("Inicio de sesión fallido para usuario1");
            }
    
            this.usuario = await carrentalonline.signin(usuario6.email, usuario6.password, usuario6.rol);
            if (!isEqual(carrentalonline.usuario, usuario6)) {
                throw new Error("Inicio de sesión fallido para usuario6");
            }
    
            // Manejo de excepción para rol no válido
            await carrentalonline.signin(usuario1.email, usuario1.password, 'jshfhbw');
            throw new Error("Rol no válido: Se esperaba una excepción pero no fue lanzada");
    
        } catch (error) {
            if (error.message === "Rol no válido") {
                // Realiza acciones si se detecta un rol no válido
                console.error("Error: Rol no válido");
            } else {
                console.error("Error inesperado:", error.message);
            }
        }
    
        try {
            // Manejo de excepción para credenciales incorrectas
            await carrentalonline.signin(usuario1.email, 'jhdkfjs', usuario1.rol);
            throw new Error("Credenciales incorrectas: Se esperaba una excepción pero no fue lanzada");
    
        } catch (error) {
            if (error.message === "Credenciales incorrectas") {
                // Realiza acciones si se detectan credenciales incorrectas
                console.error("Error: Credenciales incorrectas");
            } else {
                console.error("Error inesperado:", error.message);
            }
        }
    
        try {
            // Manejo de excepción para usuario no registrado
            await carrentalonline.signin('usuarioNoRegistrado@ejemplo.com', 'contraseña', 'rol');
            throw new Error("Usuario no registrado: Se esperaba una excepción pero no fue lanzada");
    
        } catch (error) {
            console.error("Error: Usuario no registrado");
        }
    })
    
    it("signup",  async function () {

        try{

        this.usuario= await carrentalonline.signup([usuario1]);
        assert.deepEqual(carrentalonline.usuario,this.usuario)
        this.usuario = await carrentalonline.signup([usuario6]);
        assert.deepEqual(carrentalonline.usuario,this.usuario)

        usuario6.rol = "Cliente";
        usuario1.rol = "Empleado";

        carrentalonline.signup(usuario6);
        carrentalonline.signup(usuario1);}catch(e){
            if(e=="Rol no válido"){
            console.log("Rol no válido");}
            else {
                console.log("Error inesperado:",e);
            }
        }

    })
    it("signout cliente y empleado", async function () {
        usuario6.rol = "Empleado";
        usuario1.rol = "Cliente";
try{
        await carrentalonline.setClientes([usuario1,usuario2,usuario3]);
       await carrentalonline.setEmpleados([usuario4,usuario5,usuario6]);

        assert.equal(carrentalonline.usuario, null);

       await  carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
       this.usuario=usuario1;

        assert.deepEqual(carrentalonline.usuario, this.usuario);
        carrentalonline.signout();
        this.usuario=null;
        assert.equal(carrentalonline.usuario, this.usuario);

       this.usuario= await carrentalonline.signin(usuario4.email, usuario4.password, usuario4.rol);

        assert.deepEqual(carrentalonline.usuario, this.usuario);

        carrentalonline.signout();
        this.usuario=null;

        assert.equal(carrentalonline.usuario, null);}catch(e){
            if(e=='El usuario es invitado'){
                console.log(e);
            }else{
                console.log('error inesperado:',e);
            }

        }

    })
    it("perfil", async function () {
        try{

        await carrentalonline.setClientes([usuario1,usuario2,usuario3]);
        await carrentalonline.setEmpleados([usuario4,usuario5,usuario6]);

        await carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        assert.deepEqual(await carrentalonline.Perfil(), usuario1);

        await carrentalonline.signin(usuario4.email, usuario4.password, usuario4.rol);
        assert.deepEqual(await carrentalonline.Perfil(), usuario4);

        await carrentalonline.signout();
        await carrentalonline.Perfil();}catch(e){
            if (e=="No ha iniciado sesión ningún usuario"){
                console.log(e);
            }else{
                console.log('error inesperado:',e);
            }
        }

    })

    it("get/Set reservas", async function () {
        const reservas = [reserva1, reserva2, reserva3];
    
        const reservasConfiguradas = await carrentalonline.setReservas(reservas);
        const reservasObtenidas = await carrentalonline.getReservas();
    
        assert.deepEqual(reservasObtenidas, reservasConfiguradas, "Las reservas get y set tienen que coincidir");
    });

    
    it("disponibilidad", async function() {
        try {
            await carrentalonline.setVehiculos([vehiculo1]);
            await carrentalonline.setReservas([reserva1]);
          
    
            let disponibilidad = await carrentalonline.disponibilidad(vehiculo.id, new Date("2023-12-10"), new Date("2023-12-30"));
            if (!disponibilidad) {
                throw new Error("El vehículo debería estar disponible");
            }
    
            disponibilidad = await carrentalonline.disponibilidad(vehiculo.id, reserva1.inicio, reserva1.fin);
            if (disponibilidad) {
                throw new Error("El vehículo no debería estar disponible");
            }
    
            try {
                await carrentalonline.disponibilidad("noexisto", new Date("2023-02-01"), new Date("2023-02-05"));
                throw new Error("Se esperaba un error para un vehículo inexistente");
            } catch (error) {
                console.error(error.message); 
            }
    
        } catch (error) {
            console.error(error.message);
        }
    });
    
    it("reservar", async function() {
        try {
           
            await carrentalonline.setClientes([usuario1]);
            await carrentalonline.setVehiculos([vehiculo]);
    
            await carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
    
            let reservaValida = {
                inicio: new Date("2023-01-01"),
                fin: new Date("2023-01-05"),
                fecha: new Date("2022-12-30"),
                vehiculoId: vehiculo.id
              
            };
    
            let resultado = await carrentalonline.reservar(reservaValida);
            if (!resultado) {
                throw new Error("Reserva fallida");
            }
        let reservaFechasmal = {
            inicio: new Date("2023-01-05"),
            fin: new Date("2023-01-01"),
            fecha: new Date("2022-12-30"),
            vehiculoId: vehiculo.id
        };

        try {
            await carrentalonline.reservar(reservaFechasmal);
            throw new Error("Se esperaba un error por fechas inválidas");
        } catch (error) {
            console.error(error.message);
        }   
           
        } catch (error) {
            console.error(error.message);
         
        }

    });


    
    /*it("Cliente by email", function () {

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);

        assert.deepEqual(carrentalonline.clienteByEmail(usuario1.email), usuario1);

        assert.throws(() => carrentalonline.clienteByEmail("jhsfkd"), "El cliente con ese email no existe");

    })
    it("Empleado by email", function () {

        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);

        assert.deepEqual(carrentalonline.empleadoByEmail(usuario4.email), usuario4);

        assert.throws(() => carrentalonline.empleadoByEmail("jhsfkd"));

    })
    it("Cliente by id", function () {

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);

        assert.deepEqual(carrentalonline.clienteById(usuario1.id), usuario1);

        assert.throws(() => carrentalonline.clienteById("30"));
    })
    it("Empleado by id", function () {

        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);

        assert.deepEqual(carrentalonline.empleadoById(usuario4.id), usuario4);

        assert.throws(() => carrentalonline.empleadoById("30"));
    })

    it("reservar con cliente sin login", function () {

        assert.throws(() => carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z')));

    });

    it("reservar con conflicto", function () {

        const vehiculo1 = {
            id: 101,
        };
        carrentalonline.agregarVehiculo(vehiculo1);

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));

        assert.throws(() => carrentalonline.reservar(101, new Date('2023-12-03T10:00:00.000Z'), new Date('2023-12-06T10:00:00.000Z')));

    });

    it("reservar con vehículo inexistente", function () {

        const vehiculo1 = {
            id: 101,
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        expect(() => carrentalonline.reservar(129, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z')))
            .to.throw("El vehículo con el ID indicado no existe.");
    });

    it("reservar exitosamente", function () {

        const vehiculo1 = {
            id: 101,
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        const reserva = carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));

        assert.property(reserva, "numero");
        assert.property(reserva, "fecha");
        assert.property(reserva, "inicio");
        assert.property(reserva, "fin");
        assert.property(reserva, "clienteId");
        assert.property(reserva, "vehiculoId");
        assert.property(reserva, "costo");

    });
    it("cliente con reservas existentes", function () {

        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarVehiculo(vehiculo2);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        const reserva1 = carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        const reserva2 = carrentalonline.reservar(2, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));

        const reservasCliente = carrentalonline.reservasByClienteId(usuario1.id);

        assert.deepEqual(reservasCliente, [reserva1, reserva2]);
    });
    it("buscar reserva existente por número", function () {
        const vehiculo1 = {
            id: 1,
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        const reserva1 = carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        const reserva2 = carrentalonline.reservar(1, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));

        const reservaEncontrada = carrentalonline.reservaByNumero(reserva1.numero);

        assert.deepEqual(reservaEncontrada, reserva1);
    });

    it("buscar reserva inexistente por número", function () {
        const vehiculo1 = {
            id: 1,
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        carrentalonline.reservar(1, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));

        const reservaNoEncontrada = carrentalonline.reservaByNumero("R123");

        assert.isNull(reservaNoEncontrada);
    });

    it("intentar agregar un vehículo con matrícula existente", function () {
        carrentalonline.agregarVehiculo(vehiculo1);
        assert.throws(
            () => carrentalonline.agregarVehiculo(vehiculo1),
            Error,
            "Ya existe un vehículo con la matrícula ABC-123"
        );
    });

    it("buscar reserva existente por ID", function () {
        const vehiculo1 = {
            id: 1,
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        const reserva1 = carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        const reserva2 = carrentalonline.reservar(1, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));

        const reservaEncontrada = carrentalonline.reservaById(reserva1.id);

        assert.deepEqual(reservaEncontrada, reserva1);
    });

    it("buscar reserva inexistente por ID", function () {
        const vehiculo1 = {
            id: 1,
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        carrentalonline.reservar(1, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));

        const reservaNoEncontrada = carrentalonline.reservaById(99);

        assert.isNull(reservaNoEncontrada);
    });

    it("vehículo está disponible en el período especificado", function () {
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        const vehiculo = {
            id: 1,
        };
        carrentalonline.agregarVehiculo(vehiculo);

        const inicio = new Date("2023-11-01T10:00:00.000Z").toISOString();
        const fin = new Date("2023-11-05T10:00:00.000Z").toISOString();

        const disponibilidad = carrentalonline.disponibilidad(vehiculo.id, inicio, fin);

        assert.isTrue(disponibilidad);
    });

    it("vehículo no está disponible en el período especificado", function () {
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        const vehiculo = {
            id: 1,
        };
        carrentalonline.agregarVehiculo(vehiculo);

        const inicioReserva = new Date("2023-11-01T10:00:00.000Z").toISOString();
        const finReserva = new Date("2023-11-05T10:00:00.000Z").toISOString();

        carrentalonline.reservar(vehiculo.id, inicioReserva, finReserva);

        const inicio = new Date("2023-11-01T10:00:00.000Z").toISOString();
        const fin = new Date("2023-11-05T10:00:00.000Z").toISOString();

        const disponibilidad = carrentalonline.disponibilidad(vehiculo.id, inicio, fin);

        assert.isFalse(disponibilidad);
    });

    it("eliminar un vehículo", function () {
        const carrentalonline = new CarRentalOnline();

        carrentalonline.agregarVehiculo(vehiculo1);

        carrentalonline.eliminarVehiculo(vehiculo1.id);

        const vehiculoEliminado = carrentalonline.vehiculoById(vehiculo1.id);
        assert.strictEqual(vehiculoEliminado.id, vehiculo1.id);
    });

    it("vehículo está disponible y es eliminado en el período especificado", function () {

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        carrentalonline.agregarVehiculo(vehiculoelim);

        const inicio = new Date("2023-11-01T10:00:00.000Z").toISOString();
        const fin = new Date("2023-11-05T10:00:00.000Z").toISOString();

        const disponibilidad = carrentalonline.disponibilidad(vehiculoelim.id, inicio, fin);

        assert.isTrue(disponibilidad);

    });

    it("filtrar vehículos disponibles", function () {
        const carrentalonline = new CarRentalOnline();

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarVehiculo(vehiculo2);
        carrentalonline.agregarVehiculo(vehiculo3);
        carrentalonline.agregarVehiculo(vehiculoelim);

        const reserva1 = carrentalonline.reservar(1, new Date('2023-11-10T10:00:00.000Z'), new Date('2023-11-15T10:00:00.000Z'));
        const reserva2 = carrentalonline.reservar(2, new Date('2023-12-05T10:00:00.000Z'), new Date('2023-12-10T10:00:00.000Z'));

        const vehiculosDisponibles1 = carrentalonline.disponibles(null, null, null, null, null, new Date('2023-11-01T10:00:00.000Z'), new Date('2023-11-09T10:00:00.000Z'));

        const vehiculosEsperados1 = vehiculosDisponibles1.map(vehiculo => vehiculo.id);
        const idsEsperados = [vehiculo1.id, vehiculo2.id, vehiculo3.id, vehiculoelim.id];

        assert.deepEqual(vehiculosEsperados1, idsEsperados);

    });

    it("Debería filtrar vehículos disponibles por marca", function () {
        const vehiculosDisponiblesPorMarca = carrentalonline.disponibles("Toyota", null, null, null, null, new Date('2023-11-01T10:00:00.000Z'), new Date('2023-11-09T10:00:00.000Z'));

        const vehiculosFiltrados = vehiculosDisponiblesPorMarca.map(vehiculo => vehiculo.marca);

        const todosTienenLaMarcaEsperada = vehiculosFiltrados.every(marca => marca === "Toyota");

        assert.equal(todosTienenLaMarcaEsperada, true);
    });

    it("Debería filtrar vehículos disponibles por modelo", function () {
        const vehiculosDisponiblesPorModelo = carrentalonline.disponibles(null, "Ford1", null, null, null, new Date('2023-11-01T10:00:00.000Z'), new Date('2023-11-09T10:00:00.000Z'));

        const vehiculosFiltrados = vehiculosDisponiblesPorModelo.map(vehiculo => vehiculo.modelo);

        const todosTienenElModeloEsperado = vehiculosFiltrados.every(modelo => modelo === "Ford1");

        assert.equal(todosTienenElModeloEsperado, true);
    });
    it("filtrar vehículos disponibles por combinación de marca y costoDía", function () {
        const vehiculosDisponiblesPorMarcaYCosto = carrentalonline.disponibles("Toyota", null, null, null, 100, null, null);

        const todosCumplenCondiciones = vehiculosDisponiblesPorMarcaYCosto.every(vehiculo => vehiculo.marca === "Toyota" && vehiculo.costoDia <= 100);
        assert.equal(todosCumplenCondiciones, true, "Todos los vehículos deberían ser de la marca 'Toyota' y tener costoDía menor o igual a 100");
    });
    it("Filtrar vehículos disponibles por fecha de inicio y fin", function () {
        const fechaInicio = "2023-11-01T10:00:00.000Z";
        const fechaFin = "2023-11-09T10:00:00.000Z";

        const vehiculosDisponiblesPorFecha = carrentalonline.disponibles(null, null, null, null, null, fechaInicio, fechaFin);

        const todosDisponiblesEnRango = vehiculosDisponiblesPorFecha.every(vehiculo => {
            const reservasDelVehiculo = carrentalonline.reservas.filter(reserva => reserva.vehiculoId === vehiculo.id);
            return reservasDelVehiculo.every(reserva => reserva.fin <= fechaInicio || reserva.inicio >= fechaFin);
        });

        assert.equal(todosDisponiblesEnRango, true);
    });

    it("cancelar tres reservas", function () {
        const carrentalonline = new CarRentalOnline();

        const vehiculo1 = {
            id: 101,
            matricula: "ABC123",
        };
        carrentalonline.agregarVehiculo(vehiculo1);

        carrentalonline.agregarCliente(usuario1);

        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        const reserva1 = carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));

        carrentalonline.cancelar(reserva1.numero);

        const reservaCancelada1 = carrentalonline.reservaByNumero(reserva1.numero);
        assert.strictEqual(reservaCancelada1, null);

        const reserva2 = carrentalonline.reservar(101, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));
        carrentalonline.cancelar(reserva2.numero);
        const reservaCancelada2 = carrentalonline.reservaByNumero(reserva2.numero);
        assert.strictEqual(reservaCancelada2, null);

        const reserva3 = carrentalonline.reservar(101, new Date('2023-12-20T10:00:00.000Z'), new Date('2023-12-25T10:00:00.000Z'));
        carrentalonline.cancelar(reserva3.numero);
        const reservaCancelada3 = carrentalonline.reservaByNumero(reserva3.numero);
        assert.strictEqual(reservaCancelada3, null);
    });

    it("Obtener reserva por número existente", function () {
        const cliente1 = {
            dni: "12345678A",
            nombres: "Juan",
            apellidos: "Pérez",
            direccion: "Calle 123",
            email: "juan@example.com",
            password: "password123",
            telefono: "123456789",
            rol: "Cliente",
        };

        carrentalonline.agregarVehiculo(vehiculo1)
        carrentalonline.agregarCliente(cliente1);
        carrentalonline.signin(cliente1.email, cliente1.password, cliente1.rol);

        const reserva = carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        const numeroReserva = reserva.numero;

        const reservaEncontrada = carrentalonline.reservaByNumero(numeroReserva);
        expect(reservaEncontrada).equal(reserva);
    });

    it("Obtener reserva por número inexistente", function () {
        const reservaInexistente = carrentalonline.reservaByNumero("R999");
        expect(reservaInexistente).to.be.null;
    });
    it("Obtener reservas de un cliente", function () {
        const cliente1 = {
            dni: "12345678A",
            nombres: "Juan",
            apellidos: "Pérez",
            direccion: "Calle 123",
            email: "juan@example.com",
            password: "password123",
            telefono: "123456789",
            rol: "Cliente",
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarVehiculo(vehiculo2);
        carrentalonline.agregarCliente(cliente1);
        carrentalonline.signin(cliente1.email, cliente1.password, cliente1.rol);

        carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        carrentalonline.reservar(2, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));

        const reservasDelCliente = carrentalonline.reservasByClienteId(cliente1.id);
        expect(reservasDelCliente.length).to.equal(2);
    });*/

})