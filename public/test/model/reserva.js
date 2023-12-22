const mongoose = require('mongoose');
const Reserva = require("../../model/reserva");
const cliente = require('../../model/cliente');

describe("Reserva", function () {
  let reserva;
  const id = '1';
  const inicio = new Date('2023-11-01T10:00:00.000Z');
  const fin = new Date('2023-11-05T14:30:00.000Z');
  const costo = 500;
  const numero = 'R12345';
  const entrega = new Date('2023-11-01T11:45:00.000Z'); 
  const devolucion = new Date('2023-11-05T15:15:00.000Z'); 
  const fecha = new Date('2023-10-25T08:20:00.000Z'); 
  const clienteId = 'C001';
  const vehiculoId = 'V001';

  beforeEach(function () {
    reserva = new Reserva(inicio,fin,costo,numero,fecha,cliente,vehiculoId)
  
  });

  it("constructor reserva", function () {
    assert.equal(reserva._id, id);
  });

  it("getter inicio", function () {
    assert.equal(reserva.inicio.toISOString(), inicio.toISOString());
  });

  it("setter inicio", function () {
    const nuevoInicio = new Date('2023-11-02T10:30:00.000Z');
    reserva.inicio = nuevoInicio;
    assert.equal(reserva.inicio.toISOString(), nuevoInicio.toISOString());
  });

  it("getter fin", function () {
    assert.equal(reserva.fin.toISOString(), fin.toISOString());
  });

  it("setter fin", function () {
    const nuevoFin = new Date('2023-11-06T14:45:00.000Z');
    reserva.fin = nuevoFin;
    assert.equal(reserva.fin.toISOString(), nuevoFin.toISOString());
  });

  it("getter costo", function () {
    assert.equal(reserva.costo, costo);
  });

  it("setter costo", function () {
    const nuevoCosto = 600;
    reserva.costo = nuevoCosto;
    assert.equal(reserva.costo, nuevoCosto);
  });

  it("getter numero", function () {
    assert.equal(reserva.numero, numero);
  });

  it("setter numero", function () {
    const nuevoNumero = 'R54321';
    reserva.numero = nuevoNumero;
    assert.equal(reserva.numero, nuevoNumero);
  });

  it("getter entrega", function () {
    assert.equal(reserva.entrega.toISOString(), entrega.toISOString());
  });

  it("setter entrega", function () {
    const nuevaEntrega = new Date('2023-11-01T12:00:00.000Z');
    reserva.entrega = nuevaEntrega;
    assert.equal(reserva.entrega.toISOString(), nuevaEntrega.toISOString());
  });

  it("getter devolucion", function () {
    assert.equal(reserva.devolucion.toISOString(), devolucion.toISOString());
  });

  it("setter devolucion", function () {
    const nuevaDevolucion = new Date('2023-11-05T15:30:00.000Z');
    reserva.devolucion = nuevaDevolucion;
    assert.equal(reserva.devolucion.toISOString(), nuevaDevolucion.toISOString());
  });

  it("getter fecha", function () {
    assert.equal(reserva.fecha.toISOString(), fecha.toISOString());
  });

  it("setter fecha", function () {
    const nuevaFecha = new Date('2023-10-26T08:30:00.000Z');
    reserva.fecha = nuevaFecha;
    assert.equal(reserva.fecha.toISOString(), nuevaFecha.toISOString());
  });

  it("getter clienteId", function () {
    assert.equal(reserva.clienteId, clienteId);
  });

  it("setter clienteId", function () {
    const nuevoClienteId = 'C002';
    reserva.clienteId = nuevoClienteId;
    assert.equal(reserva.clienteId, nuevoClienteId);
  });

  it("getter vehiculoId", function () {
    assert.equal(reserva.vehiculoId, vehiculoId);
  });

  it("setter vehiculoId", function () {
    const nuevoVehiculoId = 'V002';
    reserva.vehiculoId = nuevoVehiculoId;
    assert.equal(reserva.vehiculoId, nuevoVehiculoId);
  });
});
