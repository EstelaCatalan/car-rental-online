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


	beforeEach(function() {
		carrentalonline = new CarRentalOnline();



	})
	it("constructor Car-Rental-Online", function() {
		assert.equal(carrentalonline._vehiculos.length, vehiculos.length);
		assert.equal(carrentalonline._clientes.length, clientes.length);
		assert.equal(carrentalonline._empleados.length, empleados.length);
		assert.equal(carrentalonline.lastid, lastid);
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
		//Comprobamos los errores con un usuario que ya existe y uno que sea empleado
		assert.throws(() => carrentalonline.agregarCliente(usuario6), `El objeto no tiene rol de Cliente`);
		assert.throws(() => carrentalonline.agregarCliente(usuario1), `Ya existe un cliente con ese DNI`);
		//comprobamos que se ha metido el cliente que no nos da error
		assert.deepEqual(carrentalonline._clientes, clientes1);


	})
	it("agregar empleados", function() {
		carrentalonline.agregarEmpleado(usuario5);
		empleados1 = new Array();
		empleados1.push(usuario5);
		//Comprobamos los errores con un usuario que ya existe y uno que sea empleado
		assert.throws(() => carrentalonline.agregarEmpleado(usuario1), `El objeto no tiene rol de Empleado`);
		assert.throws(() => carrentalonline.agregarEmpleado(usuario5), `Ya existe un empleado con ese DNI`);
		//comprobamos que se ha metido el cliente que no nos da error
		assert.deepEqual(carrentalonline._empleados, empleados1);


	})
	it("signin", function() {
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
	it("signup", function() {
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
	it("signout cliente y empleado", function() {
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
	it("perfil", function() {
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
	it("Cliente by email", function() {
		//agregamos tres clientes
		carrentalonline.agregarCliente(usuario1);
		carrentalonline.agregarCliente(usuario2);
		carrentalonline.agregarCliente(usuario3);
		//aqui buscamos un email que si que existe
		assert.deepEqual(carrentalonline.clienteByEmail(usuario1.email), usuario1);
		//ahora uno que no existe para que saque error
		assert.throws(() => carrentalonline.clienteByEmail("jhsfkd"), "El cliente con ese email no existe");


	})
	it("Empleado by email", function() {
		//agregamos tres empleados
		carrentalonline.agregarEmpleado(usuario4);
		carrentalonline.agregarEmpleado(usuario5);
		carrentalonline.agregarEmpleado(usuario6);
		//aqui buscamos un email que si que existe
		assert.deepEqual(carrentalonline.empleadoByEmail(usuario4.email), usuario4);
		//ahora uno que no existe para que saque error
		assert.throws(() => carrentalonline.empleadoByEmail("jhsfkd"), "El empleado con ese email no existe");

	})
	it("Cliente by id", function() {
		//agregamos tres clientes
		carrentalonline.agregarCliente(usuario1);
		carrentalonline.agregarCliente(usuario2);
		carrentalonline.agregarCliente(usuario3);
		//aqui buscamos un id que si que existe
		assert.deepEqual(carrentalonline.clienteById(usuario1.id), usuario1);
		//buscamos un id que no existe
		assert.throws(() => carrentalonline.clienteById("30"), "El cliente con ese id no existe");
	})
	it("Empleado by id", function() {
		//agregamos tres empleados
		carrentalonline.agregarEmpleado(usuario4);
		carrentalonline.agregarEmpleado(usuario5);
		carrentalonline.agregarEmpleado(usuario6);
		//aqui buscamos un id que si que existe
		assert.deepEqual(carrentalonline.empleadoById(usuario4.id), usuario4);
		//buscamos un id que no existe
		assert.throws(() => carrentalonline.empleadoById("30"), "El empleado con ese id no existe");
	})

	//reserva
	it("reservar con cliente sin login", function() {

		assert.throws(() => carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z')),
			"Debe iniciar sesión como cliente para realizar una reserva"
		);
	});

	it("reservar con conflicto", function() {

		const vehiculo1 = {
			id: 101,
		};
		carrentalonline.agregarVehiculo(vehiculo1);

		carrentalonline.agregarCliente(usuario1);
		carrentalonline.signin(usuario1.email, usuario1.password, usuario1.rol);


		carrentalonline.reservar(101, new Date('2023-12-01T10:00:00.000Z'), new Date('2023-12-05T10:00:00.000Z'));


		assert.throws(() => carrentalonline.reservar(101, new Date('2023-12-03T10:00:00.000Z'), new Date('2023-12-06T10:00:00.000Z')),
			"El vehículo no está disponible en el período especificado"
		);
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

		assert.property(reserva, "numero", "La reserva debe tener una propiedad 'numero'");
		assert.property(reserva, "fecha", "La reserva debe tener una propiedad 'fecha'");
		assert.property(reserva, "inicio", "La reserva debe tener una propiedad 'inicio'");
		assert.property(reserva, "fin", "La reserva debe tener una propiedad 'fin'");
		assert.property(reserva, "clienteId", "La reserva debe tener una propiedad 'clienteId'");
		assert.property(reserva, "vehiculoId", "La reserva debe tener una propiedad 'vehiculoId'");
		assert.property(reserva, "costo", "La reserva debe tener una propiedad 'costo'");

	});
	it("cliente con reservas existentes", function() {
		const vehiculo1 = {
			id: 1,
		};
		const vehiculo2 = {
			id: 2,
		};
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

		const reservaNoEncontrada = carrentalonline.reservaByNumero("R123"); // Número de reserva inexistente

		assert.isNull(reservaNoEncontrada);
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

})