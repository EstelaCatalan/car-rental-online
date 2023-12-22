const Cliente= require ('./cliente') ;
const Empleado= require ('./empleado') ;
const reserva = require('./reserva');
class CarRentalOnline {
	
	constructor() {
	
	}
	genId() {
		this.lastid++;
		return this.lastid;
	}
	async getClientes() { return (await Cliente.find()).map(d => d.toObject()); }

	async getReservas() {   const reservas = await Reserva.find()
		.populate(['cliente', 'vehiculo'])
		.exec();
	return reservas.map(reserva => reserva.toObject());}

	async setReservas(usuarios) { 
		await Reserva.deleteMany({});

		return (await Promise.all(
			reservasNuevas.map(reserva => new Reserva(reserva).save())
		)).map(doc => doc.toObject());
}


	async getEmpleados() { return (await Empleado.find()).map(d => d.toObject()); }
	async setClientes(clientes) { return (await Promise.all(clientes.map(async u => { return new Cliente(u).save(); }))).map(d =>d.toObject());}
	async setEmpleados(empleados) { return (await Promise.all(empleados.map(async u => { return new Empleado(u).save(); }))).map(d =>d.toObject());}
	async agregarCliente(cliente) { 
		if (Cliente.find(u=>u.dni==cliente.dni)!=NULL){
			throw new Error('El cliente con dni :',cliente.dni,'ya existe ');
		}else{
		return (await new Cliente(cliente).save()).toObject();}}
		async agregarEmpleado(empleado) { 
			if (Empleado.find(u=>u.dni==empleado.dni)!=NULL){
				throw new Error('El empleado con dni :',empleado.dni,'ya existe ');
			}else{
			return (await new Empleado(empleado).save()).toObject();}}
	async clienteById(uid) {return (await Cliente.findById(uid)).toObject();}
	async empleadoById(uid) {return (await Empleado.findById(uid)).toObject();}

	async clienteById(uid) {
		return (await Cliente.findById(uid)).toObject();
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
	
	async signin(email, password, rol) {
		
		let usuarioEncontrado = null;
		if (rol === "Empleado") {
			usuarioEncontrado = await Empleado.find(empleado => empleado.email === email && empleado.password === password).toObject();
		} else if (rol === "Cliente") {
			
			
			usuarioEncontrado = await this.Cliente.find(cliente => cliente.email === email ).toObject();
			
		} else {
			throw new Error("Rol no válido");
		}

		if (usuarioEncontrado) {
			this.usuario = usuarioEncontrado;
		} else {
			throw new Error("Credenciales incorrectas");
		}
	}
	async signup(obj) {

		if (obj.rol === "Empleado") {
			const empleadoExistente = await Empleado.find(empleado => empleado.email === obj.email);
			if (empleadoExistente) {
				throw new Error("El email ya está registrado como empleado");
			}
		} else if (obj.rol === "Cliente") {
			const clienteExistente = await Cliente.find(cliente => cliente.email === obj.email);
			if (clienteExistente) {
				throw new Error("El email ya está registrado como cliente");
			}
		} else {
			throw new Error("Rol no válido");
		}
		if (obj.rol === "Empleado") {
			await Empleado.save(obj);
		} else if (obj.rol === "Cliente") {
			await Cliente.save(obj);
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
	async clienteById(uid) {return (await Cliente.findById(uid)).toObject();}
	async empleadoById(uid) {return (await Empleado.findById(uid)).toObject();}
	async disponibilidad(vehiculoId, inicio, fin) {

		const vehiculo = await Vehiculo.findById(vehiculoId);
            if (!vehiculo) {
                throw new Error('El vehículo con el ID indicado no existe.');
            }

            const reservaspilladas = await Reserva.find({
                vehiculoId: vehiculoId,
                $or: [
                    { inicio: { $lte: fin, $gte: inicio } },
                    { fin: { $gte: inicio, $lte: fin } }
                ]
            });
            return reservaspilladas.length === 0;
	}

	async disponibles(marca, modelo, tipo, etiqueta, costoDia, inicio, fin) {

		const reservasEnRango = await Reserva.find({
			inicio: { $lte: fin },
			fin: { $gte: inicio }
		});

		const nodispo = reservasEnRango.map(reserva => reserva.vehiculoId);
		const filtros = {
			...(marca && { marca: marca }),
			...(modelo && { modelo: modelo }),
			...(tipo && { tipo: tipo }),
			...(etiqueta && { etiqueta: etiqueta }),
			...(costoDia && { costoDia: { $lte: costoDia } }),
			_id: { $nin: nodispo }
		};

		const vehiculosDisponibles = await Vehiculo.find(filtros);
		return vehiculosDisponibles;
    }
    
	  
	async reservar(reserva) {
	
		if (this.usuario === null || this.usuario.rol !== "Cliente") {
			throw new Error("Debe iniciar sesión como cliente para realizar una reserva");
		}
	
		if (reserva.inicio >= reserva.fin) {
			throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
		}
	
		if (reserva.fecha > reserva.inicio) {
			throw new Error("La fecha de la reserva no debe ser mayor que la fecha de inicio");
		}
	
		const vehiculoDisponible = await this.disponibilidad(reserva.vehiculoId, reserva.inicio, reserva.fin);
		if (!vehiculoDisponible) {
			throw new Error("El vehículo no está disponible en el período especificado");
		}

		const duracion = (reserva.fin - reserva.inicio) / (1000 * 60 * 60 * 24); 
        reserva.costo = duracion * reserva.costoDia;
        reserva.costo = Math.round((reserva.costo + Number.EPSILON) * 100) / 100;

		const nuevaReserva = new Reserva(reserva);
        await nuevaReserva.save();

        return nuevaReserva.toObject();
	}
	
	async cancelar(numero) {

        const reserva = await Reserva.findOne({ numero: numero });
            if (!reserva) {
                throw new Error(`No se encontró una reserva con el número ${numero}`);
            }

            await Reserva.findByIdAndDelete(reserva._id);
    }

	reservas(clienteId) {

		const clienteExistente = this.clientes.find(cliente => cliente._id === clienteId);

		if (!clienteExistente) {
			throw new Error('El cliente con el ID indicado no existe.');
		}

		const reservasDelCliente = this._reservas.filter(reserva => reserva.clienteId === clienteId);

		return reservasDelCliente;
	}
	async reservaByNumero(numero) {
		 const reserva = await Reserva.findOne({ numero: numero });
            return reserva || null;
	}
	async reservaById(reservaId) {
		const reserva = await Reserva.findById(reservaId);
		return reserva || null;
	}
	async reservasByClienteId(clienteId) {
		const reservasDelCliente = await Reserva.find({ clienteId: clienteId });
		return reservasDelCliente;
	}
	async setPerfil(perfil){
		usuarioEncontrado = await Cliente.find(cliente => perfil.email === email && cliente.password === perfil.password);
		if(usuarioEncontrado){
			Cliente.save(perfil);
		}
		return false;
	}
	async entregarVehiculo(numero) {
		const reserva = await Reserva.findOne({ numero: numero });
		if (!reserva) {
			throw new Error(`No se encontró una reserva con el número ${numero}`);
		}

		const vehiculo = await Vehiculo.findById(reserva.vehiculoId);
		if (!vehiculo || !vehiculo.disponible) {
			throw new Error(`El vehículo asociado a la reserva no está disponible para entrega`);
		}

		vehiculo.disponible = false;
		reserva.fechaEntrega = new Date();

		await Promise.all([vehiculo.save(), reserva.save()]);
	}
	async devolverVehiculo(numero) {
		const reserva = await Reserva.findOne({ numero: numero });
		if (!reserva) {
			throw new Error(`No se encontró una reserva con el número ${numero}`);
		}

		const vehiculo = await Vehiculo.findById(reserva.vehiculoId);
		if (!vehiculo || vehiculo.disponible) {
			throw new Error(`El vehículo asociado a la reserva no está disponible para devolución`);
		}

		if (!reserva.fechaEntrega) {
			throw new Error(`La reserva con el número ${numero} no ha sido entregada`);
		}

		vehiculo.disponible = true;
		reserva.fechaDevolucion = new Date();


		await Promise.all([vehiculo.save(), reserva.save()]);
	}

}
