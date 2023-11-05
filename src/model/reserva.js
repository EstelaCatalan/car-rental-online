class Reserva {
	_id;
	_inicio;
	_fin;
	_costo;
	_numero;
	_entrega;
	_devolucion;
	_fecha;
	_clienteId;
	_vehiculoId;

	get inicio() {
		return this._inicio;
	}
	set inicio(inicio) {
		this._inicio = inicio;
	}

	get fin() {
		return this._fin;
	}
	set fin(fin) {
		this._fin = fin;
	}

	get costo() {
		return this._costo;
	}
	set costo(costo) {
		this._costo = costo;
	}

	get numero() {
		return this._numero;
	}
	set numero(numero) {
		this._numero = numero;
	}

	get entrega() {
		return this._entrega;
	}
	set entrega(entrega) {
		this._entrega = entrega;
	}

	get devolucion() {
		return this._devolucion;
	}
	set devolucion(devolucion) {
		this._devolucion = devolucion;
	}

	get fecha() {
		return this._fecha;
	}
	set fecha(fecha) {
		this._fecha = fecha;
	}

	get clienteId() {
		return this._clienteId;
	}
	set clienteId(clienteId) {
		this._clienteId = clienteId;
	}

	get vehiculoId() {
		return this._vehiculoId;
	}
	set vehiculoId(vehiculoId) {
		this._vehiculoId = vehiculoId;
	}

	constructor(_id) {
		this._id = _id;
	}
}

module.exports = Reserva;