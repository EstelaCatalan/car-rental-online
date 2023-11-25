const assert = require("chai").assert;
const Reserva = require("../../src/model/reserva");

describe("Reserva", function() {
	let reserva;
	const id = '1';
	const inicio = new Date('2023-11-23'); 
	const fin = new Date('2023-11-25'); 
	const costo = 500.00;
	const numero = 'R12345';
	const entrega = new Date('2023-11-01');
	const devolucion = new Date('2023-11-05');
	const fecha = new Date('2023-10-25');
	const clienteId = 'C001';
	const vehiculoId = 'V001';
	const costoDia = 500.00;

	beforeEach(function() {
		reserva = new Reserva(id);
		reserva.inicio = inicio;
		reserva.fin = fin;
		reserva.numero = numero;
		reserva.entrega = entrega;
		reserva.devolucion = devolucion;
		reserva.fecha = fecha;
		reserva.clienteId = clienteId;
		reserva.vehiculoId = vehiculoId;
		reserva.costoDia = costoDia;
		reserva.costo = costo;
		});

	it("constructor reserva", function() {
		assert.equal(reserva._id, id);
	});

	it("getter inicio", function() {
		assert.equal(reserva.inicio.toISOString(), inicio.toISOString());
	});

	it("setter inicio", function() {
		const nuevoInicio = new Date('2023-11-02T10:30:00.000Z');
		reserva.inicio = nuevoInicio;
		assert.equal(reserva.inicio.toISOString(), nuevoInicio.toISOString());
	});

	it("getter fin", function() {
		assert.equal(reserva.fin.toISOString(), fin.toISOString());
	});

	it("setter fin", function() {
		const nuevoFin = new Date('2023-11-06T14:45:00.000Z');
		reserva.fin = nuevoFin;
		assert.equal(reserva.fin.toISOString(), nuevoFin.toISOString());
	});

	it("getter costo", function() {
		assert.equal(reserva.costo, costo);
	});

	it("setter costo", function() {
		const nuevoCosto = 600;
		reserva.costo = nuevoCosto;
		assert.equal(reserva.costo, nuevoCosto);
	});

	it("getter numero", function() {
		assert.equal(reserva.numero, numero);
	});

	it("setter numero", function() {
		const nuevoNumero = 'R54321';
		reserva.numero = nuevoNumero;
		assert.equal(reserva.numero, nuevoNumero);
	});

	it("getter entrega", function() {
		assert.equal(reserva.entrega.toISOString(), entrega.toISOString());
	});

	it("setter entrega", function() {
		const nuevaEntrega = new Date('2023-11-01T12:00:00.000Z');
		reserva.entrega = nuevaEntrega;
		assert.equal(reserva.entrega.toISOString(), nuevaEntrega.toISOString());
	});

	it("getter devolucion", function() {
		assert.equal(reserva.devolucion.toISOString(), devolucion.toISOString());
	});

	it("setter devolucion", function() {
		const nuevaDevolucion = new Date('2023-11-05T15:30:00.000Z');
		reserva.devolucion = nuevaDevolucion;
		assert.equal(reserva.devolucion.toISOString(), nuevaDevolucion.toISOString());
	});

	it("getter fecha", function() {
		assert.equal(reserva.fecha.toISOString(), fecha.toISOString());
	});

	it("setter fecha", function() {
		const nuevaFecha = new Date('2023-10-26T08:30:00.000Z');
		reserva.fecha = nuevaFecha;
		assert.equal(reserva.fecha.toISOString(), nuevaFecha.toISOString());
	});

	it("getter clienteId", function() {
		assert.equal(reserva.clienteId, clienteId);
	});

	it("setter clienteId", function() {
		const nuevoClienteId = 'C002';
		reserva.clienteId = nuevoClienteId;
		assert.equal(reserva.clienteId, nuevoClienteId);
	});

	it("getter vehiculoId", function() {
		assert.equal(reserva.vehiculoId, vehiculoId);
	});

	it("setter vehiculoId", function() {
		const nuevoVehiculoId = 'V002';
		reserva.vehiculoId = nuevoVehiculoId;
		assert.equal(reserva.vehiculoId, nuevoVehiculoId);
	});

	it("getter costoDia", function() {
		assert.equal(reserva.costoDia, costoDia);
	});

	it("setter costoDia", function() {
		const costoDia = '1.00';
		reserva.costoDia = costoDia;
		assert.equal(reserva.costoDia, costoDia);
	});

	it("recalcularCosto", function() {
	
		const inicio = new Date('2023-11-23');
		const fin = new Date('2023-11-25');
		const costoDia = 500.00;
		
		reserva.inicio = inicio;
		reserva.fin = fin;
		reserva.costoDia = costoDia;
	
		reserva.recalcularCosto();
	
		const restatiemp = fin.getTime() - inicio.getTime();
		const diasAlquiler = Math.ceil(restatiemp / (1000 * 60 * 60 * 24));
		const costoassert = diasAlquiler * costoDia;
	
		assert.equal(reserva.costo, costoassert);
	});

	it("recalcularCosto undefined", function() {
	
		const fin = new Date('2023-11-25');
		const costoDia = 500.00;
		
		reserva.inicio = "";
		reserva.fin = fin;
		reserva.costoDia = costoDia;
	
		reserva.recalcularCosto();
	
		assert.equal(reserva.costo, undefined);
	});
	it("setter inicio con costoDia definido", function () {
		reserva.costoDia = 40;
		const nuevoInicio = new Date('2023-11-02T10:30:00.000Z');
		reserva.inicio = nuevoInicio;
		const tiempoAlquiler = fin.getTime() - nuevoInicio.getTime();
		const diasAlquiler = Math.ceil(tiempoAlquiler / (1000 * 60 * 60 * 24));
		const costoEsperado = diasAlquiler * reserva.costoDia;
		assert.equal(reserva.costo, costoEsperado);
	  });
	
	  it("setter fin con costoDia definido", function () {
		reserva.costoDia = 45;
		const nuevoFin = new Date('2023-11-10T14:30:00.000Z');
		reserva.fin = nuevoFin;
		const tiempoAlquiler = nuevoFin.getTime() - inicio.getTime();
		const diasAlquiler = Math.ceil(tiempoAlquiler / (1000 * 60 * 60 * 24));
		const costoEsperado = diasAlquiler * reserva.costoDia;
		assert.equal(reserva.costo, costoEsperado);
	  });
   
});