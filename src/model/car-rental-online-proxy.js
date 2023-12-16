const Vehiculo = require("./vehiculo");
class CarRentalOnline {
	_base
	constructor(base) {
		this._base = base;
	}
	async handleError(response) {
		let message = 'Error no definido';
		try {
			let error = await response.json();
			message = error.message;
		} catch (e) {
			message = response.statusText;
		} finally {
			console.error(message);
			throw new Error(message);
		}
	}
	async setClientes(clientes) {
		let response = await fetch(`${this.base}/clientes`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(clientes),
		});
		if (response.ok) {
			let resultado = await response.json();
			resultado = resultado.map(u => {
				let cliente = new Cliente();
				Object.assign(cliente, u);
				return cliente;
			});
			return resultado;
		} else await this.handleError(response);
	}
	async getClientes() {
		let response = await fetch(`${this.base}/clientes`);
		if (response.ok) {
			let clientes = await response.json();
			clientes = clientes.map(u => {
				let cliente = new Cliente();
				Object.assign(cliente, u);
				return cliente;
			});
			return clientes;
		}
		else await this.handleError(response);
	}
	setReservas(reservas) {
		this._reservas.length = 0;
		this._reservas.push(reservas);
	}
	genId() {
		this.lastid++;
		return this.lastid;
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
		const rol = obj.rol;
		const clienteExiste = this._clientes.find(cliente => cliente.dni === dni);
		if (rol == 'Cliente') {
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

			this._clientes.push(nuevoCliente);
		} else {
			throw new Error(`El objeto no tiene rol de Cliente`);
		}


	}

	agregarVehiculo(obj) {
		const matricula = obj.matricula;

		const vehiculoExiste = this._vehiculos.some((vehiculo) => vehiculo.matricula === matricula);

		if (vehiculoExiste) {
			throw new Error(`Ya existe un vehículo con la matrícula ${matricula}`);
		}

		const nuevoVehiculo = new Vehiculo(obj.id);

		nuevoVehiculo.id = obj.id;
		nuevoVehiculo.matricula = obj.matricula;
		nuevoVehiculo.marca = obj.marca;
		nuevoVehiculo.modelo = obj.modelo;
		nuevoVehiculo.etiqueta = obj.etiqueta;
		nuevoVehiculo.costoDia = obj.costoDia;
		nuevoVehiculo.descripcion = obj.descripcion;

		this._vehiculos.push(nuevoVehiculo);
	}

	agregarEmpleado(obj) {
		const dni = obj.dni;
		const rol = obj.rol;
		const empleadoExiste = this._empleados.find(empleado => empleado.dni === dni);
		if (rol == 'Empleado') {
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

			this._empleados.push(nuevoEmpleado);
		} else {
			throw new Error(`El objeto no tiene rol de Empleado`);
		}

	}

	eliminarVehiculo(vehiculoId) {
		const vehiculoIndex = this._vehiculos.findIndex(vehiculo => vehiculo.id === vehiculoId);

		if (vehiculoIndex === -1) {
			throw new Error(`No se encontró un vehículo con el ID ${vehiculoId}`);
		}

		const vehiculo = this._vehiculos[vehiculoIndex];

		if (vehiculo._eliminado) {
			throw new Error(`El vehículo con ID ${vehiculoId} no está disponible para eliminación`);
		}

		vehiculo._eliminado = true;
	}

	entregarVehiculo(numero) {
		const reserva = this._reservas.find(reserva => reserva.numero === numero);
		if (!reserva) {
			throw new Error(`No se encontró una reserva con el número ${numero}`);
		}

		const vehiculo = this._vehiculos.find(vehiculo => vehiculo._id === reserva.vehiculoId);
		if (!vehiculo || !vehiculo._disponible) {
			throw new Error(`El vehículo asociado a la reserva no está disponible para entrega`);
		}

		vehiculo._disponible = false;
		reserva.fechaEntrega = new Date();
	}

	devolverVehiculo(numero) {

		const reserva = this._reservas.find(reserva => reserva.numero === numero);
		if (!reserva) {
			throw new Error(`No se encontró una reserva con el número ${numero}`);
		}

		const vehiculo = this._vehiculos.find(vehiculo => vehiculo._id === reserva.vehiculoId);
		if (!vehiculo || vehiculo._disponible) {
			throw new Error(`El vehículo asociado a la reserva no está disponible para devolución`);
		}

		if (!reserva.fechaEntrega) {
			throw new Error(`La reserva con el número ${numero} no ha sido entregada`);
		}
		vehiculo._disponible = true;
		reserva.fechaDevolucion = new Date();
	}

	vehiculoPorMatricula(matricula) {
		const vehiculoEncontrado = this._vehiculos.find(vehiculo => vehiculo._matricula === matricula);
		return vehiculoEncontrado || null;
	}

	vehiculoById(vehiculoId) {
		const vehiculoEncontrado = this._vehiculos.find(vehiculo => vehiculo._id === vehiculoId);
		return vehiculoEncontrado || null;
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
	signout() {
		this.usuario = null;
	}
	perfil() {
		if (this.usuario != null) {
			return this.usuario
		} else {
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
	empleadoByEmail(email) {
		let empleado = this._empleados.find(empleado => empleado.email === email);
		if (empleado) {
			return empleado;
		} else {
			throw new Error("El empleado con ese email no existe");
		}
	}
	clienteById(id) {
		let cliente = this._clientes.find(cliente => cliente.id === id);
		if (cliente) {
			return cliente
		} else {
			throw new Error("El cliente con ese id no existe")
		}
	}
	empleadoById(id) {
		let empleado = this._empleados.find(empleado => empleado.id === id);
		if (empleado) {
			return empleado
		} else {
			throw new Error("El empleado con ese id no existe")
		}
	}
	disponibilidad(vehiculoId, inicio, fin) {

		const vehiculo = this._vehiculos.find(v => v.id === vehiculoId);

		if (!vehiculo) {

			throw new Error('El vehículo con el ID indicado no existe.');
		}


		const reservasDelVehiculo = this._reservas.filter(reserva => reserva.vehiculoId === vehiculoId);

		for (const reserva of reservasDelVehiculo) {
			if (reserva.inicio <= fin && reserva.fin >= inicio) {
				return false;
			}
		}

		return true;
	}

	disponibles(marca, modelo, tipo, etiqueta, costoDia, inicio, fin) {
		const vehiculosDisponibles = this._vehiculos.filter(vehiculo => {

			const tieneReservas = this._reservas.some(reserva => reserva.vehiculoId === vehiculo.id &&
				reserva.inicio <= fin && reserva.fin >= inicio);
			if (tieneReservas) {
				return false;
			}

			if (marca && vehiculo.marca !== marca) {
				return false;
			}
			if (modelo && vehiculo.modelo !== modelo) {
				return false;
			}
			if (tipo && vehiculo.tipo !== tipo) {
				return false;
			}
			if (etiqueta && vehiculo.etiqueta !== etiqueta) {
				return false;
			}

			if (costoDia && vehiculo.costoDia > costoDia) {
				return false;
			}

			return true;
		});

		return vehiculosDisponibles;
	}

	reservar(reserva) {

		if (this.usuario === null || this.usuario.rol !== "Cliente") {
			throw new Error("Debe iniciar sesión como cliente para realizar una reserva");
		}

		if (reserva.inicio >= reserva.fin) {
			throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
		}

		const fechaActual = new Date();
		if (reserva.fecha > reserva.inicio) {
			throw new Error("La fecha de la reserva no debe ser mayor que la fecha de inicio");
		}

		const vehiculoDisponible = this.disponibilidad(reserva.vehiculoId, reserva.inicio, reserva.fin);
		if (!vehiculoDisponible) {
			throw new Error("El vehículo no está disponible en el período especificado");
		}

		reserva.id = this.genId();
		reserva.numero = `R${this.lastid.toString().padStart(3, "0")}`;

		this._reservas.push(reserva);

		return reserva;
	}

	cancelar(numero) {
		const reservaIndex = this._reservas.findIndex(reserva => reserva.numero === numero);

		if (reservaIndex === -1) {
			throw new Error(`No se encontró una reserva con el número ${numero}`);
		}

		this._reservas.splice(reservaIndex, 1);
	}

	reservas(clienteId) {

		const clienteExistente = this.clientes.find(cliente => cliente._id === clienteId);

		if (!clienteExistente) {
			throw new Error('El cliente con el ID indicado no existe.');
		}

		const reservasDelCliente = this._reservas.filter(reserva => reserva.clienteId === clienteId);

		return reservasDelCliente;
	}
	reservaByNumero(numero) {
		const reserva = this._reservas.find(reserva => reserva.numero === numero);
		return reserva || null;
	}
	reservaById(reservaId) {
		const reserva = this._reservas.find(reserva => reserva.id === reservaId);
		return reserva || null;
	}
	reservasByClienteId(clienteId) {
		const reservasDelCliente = this._reservas.filter(reserva => reserva.clienteId === clienteId);
		return reservasDelCliente;
	}

	setPerfil(perfil) {

		const usuarioEncontrado = this._clientes.find(cliente => perfil.dni === cliente.dni);
		if (usuarioEncontrado) {
			if (usuarioEncontrado.password == perfil.password) {
				usuarioEncontrado.nombres = perfil.nombres;
				usuarioEncontrado.apellidos = perfil.apellidos;
				usuarioEncontrado.telefono = perfil.telefono;


				return true;
			}
			throw new Error("Las contraseñas no coinciden");

		}
		throw new Error("Usuario no encontrado");
		return false;
	}




}

module.exports = CarRentalOnline;