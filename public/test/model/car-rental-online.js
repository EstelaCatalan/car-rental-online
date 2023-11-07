describe("car-rental-online", function() {
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

    beforeEach(function() {
        carrentalonline = new CarRentalOnline();

    })
    it("constructor Car-Rental-Online", function() {
        assert.equal(carrentalonline._vehiculos.length, vehiculos.length);
        assert.equal(carrentalonline._clientes.length, clientes.length);
        assert.equal(carrentalonline._empleados.length, empleados.length);
        assert.equal(carrentalonline.lastid, 0);
        assert.equal(carrentalonline._usuario, usuario);
        assert.equal(carrentalonline._reservas.length, reservas.length);

    });
    it("get clientes", function() {

        clientes.push(usuario1);
        clientes.push(usuario2);
        clientes.push(usuario3);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);
        assert.deepEqual(carrentalonline._clientes, clientes)

    })
    it("get empleados", function() {

        empleados.push(usuario4);
        empleados.push(usuario5);
        empleados.push(usuario6);
        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);
        assert.deepEqual(carrentalonline._empleados, empleados)

    })
    it("get vehiculos", function() {
        carrentalonline._vehiculos.push(vehiculo1);
        carrentalonline._vehiculos.push(vehiculo2);
        carrentalonline._vehiculos.push(vehiculo3);

        const vehiculos = carrentalonline.getVehiculos();

        assert.deepEqual(carrentalonline._vehiculos, vehiculos)
    })
    it("get reservas", function() {
        carrentalonline._reservas.push(reserva1);
        carrentalonline._reservas.push(reserva2);
        carrentalonline._reservas.push(reserva3);

        const reservasObtenidas = carrentalonline.getReservas();

        assert.equal(reservasObtenidas.length, 3);
        assert.deepEqual(reservasObtenidas[0], reserva1);
        assert.deepEqual(reservasObtenidas[1], reserva2);
        assert.deepEqual(reservasObtenidas[2], reserva3);
    })
    it("agregar clientes", function() {
        carrentalonline.agregarCliente(usuario1);
        clientes1 = new Array();
        clientes1.push(usuario1);

        assert.throws(() => carrentalonline.agregarCliente(usuario6), `El objeto no tiene rol de Cliente`);
        assert.throws(() => carrentalonline.agregarCliente(usuario1), `Ya existe un cliente con ese DNI`);

        assert.deepEqual(carrentalonline._clientes, clientes1);

    })
    it("agregar empleados", function() {
        carrentalonline.agregarEmpleado(usuario5);
        empleados1 = new Array();
        empleados1.push(usuario5);

        assert.throws(() => carrentalonline.agregarEmpleado(usuario1), `El objeto no tiene rol de Empleado`);
        assert.throws(() => carrentalonline.agregarEmpleado(usuario5), `Ya existe un empleado con ese DNI`);

        assert.deepEqual(carrentalonline._empleados, empleados1);

    })
    it("signin", function() {

        carrentalonline.agregarEmpleado(usuario6);
        carrentalonline.agregarCliente(usuario1);

        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        assert.deepEqual(carrentalonline.usuario, usuario1);
        carrentalonline.signin(usuario6.email, usuario6.password, usuario6.rol);
        assert.deepEqual(carrentalonline.usuario, usuario6);

        assert.throws(() => carrentalonline.signin(usuario1.email, usuario1.password, 'jshfhbw'), "Rol no válido");

        assert.throws(() => carrentalonline.signin(usuario1.email, 'jhdkfjs', usuario1.rol), "Credenciales incorrectas");
        assert.throws(() => carrentalonline.signin('jhdkjh', usuario1.password, usuario1.rol), "Credenciales incorrectas");
    })
    it("signup", function() {

        carrentalonline.signup(usuario1);
        carrentalonline.signup(usuario6);

        assert.throws(() => carrentalonline.signup(usuario6));

        assert.throws(() => carrentalonline.signup(usuario1));

        usuario6.rol = "Cliente";
        usuario1.rol = "Empleado";

        carrentalonline.signup(usuario6);
        carrentalonline.signup(usuario1);
    })
    it("signout cliente y empleado", function() {
        usuario6.rol = "Empleado";
        usuario1.rol = "Cliente";

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);

        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);

        assert.equal(carrentalonline.usuario, null);

        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        assert.deepEqual(carrentalonline.usuario, usuario1);

        carrentalonline.signin(usuario4.email, usuario4.password, usuario4.rol);

        assert.deepEqual(carrentalonline.usuario, usuario4);

        carrentalonline.signout();
        assert.equal(carrentalonline.usuario, null);

    })
    it("perfil", function() {

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);

        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);

        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        assert.deepEqual(carrentalonline.perfil(), usuario1);

        carrentalonline.signin(usuario4.email, usuario4.password, usuario4.rol);
        assert.deepEqual(carrentalonline.perfil(), usuario4);

        carrentalonline.signout();
        assert.throws(() => carrentalonline.perfil(), "No ha iniciado sesión ningún usuario");
    })
    it("Cliente by email", function() {

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);

        assert.deepEqual(carrentalonline.clienteByEmail(usuario1.email), usuario1);

        assert.throws(() => carrentalonline.clienteByEmail("jhsfkd"), "El cliente con ese email no existe");

    })
    it("Empleado by email", function() {

        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);

        assert.deepEqual(carrentalonline.empleadoByEmail(usuario4.email), usuario4);

        assert.throws(() => carrentalonline.empleadoByEmail("jhsfkd"));

    })
    it("Cliente by id", function() {

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);

        assert.deepEqual(carrentalonline.clienteById(usuario1.id), usuario1);

        assert.throws(() => carrentalonline.clienteById("30"));
    })
    it("Empleado by id", function() {

        carrentalonline.agregarEmpleado(usuario4);
        carrentalonline.agregarEmpleado(usuario5);
        carrentalonline.agregarEmpleado(usuario6);

        assert.deepEqual(carrentalonline.empleadoById(usuario4.id), usuario4);

        assert.throws(() => carrentalonline.empleadoById("30"));
    })

    it("reservar con cliente sin login", function() {

        assert.throws(() => carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z')));

    });

    it("reservar con conflicto", function() {

        const vehiculo1 = {
            id: 101,
        };
        carrentalonline.agregarVehiculo(vehiculo1);

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));

        assert.throws(() => carrentalonline.reservar(101, new Date('2023-12-03T10:00:00.000Z'), new Date('2023-12-06T10:00:00.000Z')));
  
    });

    it("reservar con vehículo inexistente", function() {

        const vehiculo1 = {
            id: 101,
        };
        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        expect(() => carrentalonline.reservar(129, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z')))
            .to.throw("El vehículo con el ID indicado no existe.");
    });

    it("reservar exitosamente", function() {

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
    it("cliente con reservas existentes", function() {

        carrentalonline.agregarVehiculo(vehiculo1);
        carrentalonline.agregarVehiculo(vehiculo2);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);

        const reserva1 = carrentalonline.reservar(1, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));
        const reserva2 = carrentalonline.reservar(2, new Date('2023-12-10T10:00:00.000Z'), new Date('2023-12-15T10:00:00.000Z'));

        const reservasCliente = carrentalonline.reservasByClienteId(usuario1.id);

        assert.deepEqual(reservasCliente, [reserva1, reserva2]);
    });
    it("buscar reserva existente por número", function() {
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

    it("buscar reserva inexistente por número", function() {
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

    it("intentar agregar un vehículo con matrícula existente", function() {
        carrentalonline.agregarVehiculo(vehiculo1);
        assert.throws(
            () => carrentalonline.agregarVehiculo(vehiculo1),
            Error,
            "Ya existe un vehículo con la matrícula ABC-123"
        );
    });

    it("buscar reserva existente por ID", function() {
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

    it("buscar reserva inexistente por ID", function() {
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

    it("vehículo está disponible en el período especificado", function() {
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

    it("vehículo no está disponible en el período especificado", function() {
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

    it("eliminar un vehículo", function() {
        const carrentalonline = new CarRentalOnline();

        carrentalonline.agregarVehiculo(vehiculo1);

        carrentalonline.eliminarVehiculo(vehiculo1.id);

        const vehiculoEliminado = carrentalonline.vehiculoById(vehiculo1.id);
        assert.strictEqual(vehiculoEliminado.id, vehiculo1.id);
    });

    it("vehículo está disponible y es eliminado en el período especificado", function() {

        carrentalonline.agregarCliente(usuario1);
        carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);
        carrentalonline.agregarVehiculo(vehiculoelim);

        const inicio = new Date("2023-11-01T10:00:00.000Z").toISOString();
        const fin = new Date("2023-11-05T10:00:00.000Z").toISOString();

        const disponibilidad = carrentalonline.disponibilidad(vehiculoelim.id, inicio, fin);

        assert.isTrue(disponibilidad);

    });

    it("filtrar vehículos disponibles", function() {
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

    it("Debería filtrar vehículos disponibles por marca", function() {
        const vehiculosDisponiblesPorMarca = carrentalonline.disponibles("Toyota", null, null, null, null, new Date('2023-11-01T10:00:00.000Z'), new Date('2023-11-09T10:00:00.000Z'));

        const vehiculosFiltrados = vehiculosDisponiblesPorMarca.map(vehiculo => vehiculo.marca);

        const todosTienenLaMarcaEsperada = vehiculosFiltrados.every(marca => marca === "Toyota");

        assert.equal(todosTienenLaMarcaEsperada, true);
    });

    it("Debería filtrar vehículos disponibles por modelo", function() {
        const vehiculosDisponiblesPorModelo = carrentalonline.disponibles(null, "Ford1", null, null, null, new Date('2023-11-01T10:00:00.000Z'), new Date('2023-11-09T10:00:00.000Z'));

        const vehiculosFiltrados = vehiculosDisponiblesPorModelo.map(vehiculo => vehiculo.modelo);

        const todosTienenElModeloEsperado = vehiculosFiltrados.every(modelo => modelo === "Ford1");

        assert.equal(todosTienenElModeloEsperado, true);
    });
    it("filtrar vehículos disponibles por combinación de marca y costoDía", function() {
        const vehiculosDisponiblesPorMarcaYCosto = carrentalonline.disponibles("Toyota", null, null, null, 100, null, null);

        const todosCumplenCondiciones = vehiculosDisponiblesPorMarcaYCosto.every(vehiculo => vehiculo.marca === "Toyota" && vehiculo.costoDia <= 100);
        assert.equal(todosCumplenCondiciones, true, "Todos los vehículos deberían ser de la marca 'Toyota' y tener costoDía menor o igual a 100");
    });
    it("Filtrar vehículos disponibles por fecha de inicio y fin", function() {
        const fechaInicio = "2023-11-01T10:00:00.000Z";
        const fechaFin = "2023-11-09T10:00:00.000Z";

        const vehiculosDisponiblesPorFecha = carrentalonline.disponibles(null, null, null, null, null, fechaInicio, fechaFin);

        const todosDisponiblesEnRango = vehiculosDisponiblesPorFecha.every(vehiculo => {
            const reservasDelVehiculo = carrentalonline.reservas.filter(reserva => reserva.vehiculoId === vehiculo.id);
            return reservasDelVehiculo.every(reserva => reserva.fin <= fechaInicio || reserva.inicio >= fechaFin);
        });

        assert.equal(todosDisponiblesEnRango, true);
    });

    it("cancelar tres reservas", function() {
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

    it("Obtener reserva por número existente", function() {
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

    it("Obtener reserva por número inexistente", function() {
        const reservaInexistente = carrentalonline.reservaByNumero("R999");
        expect(reservaInexistente).to.be.null;
    });
    it("Obtener reservas de un cliente", function() {
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
    });

})