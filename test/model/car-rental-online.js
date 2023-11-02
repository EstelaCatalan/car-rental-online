const assert = require("chai").assert;
const CarRentalOnline = require("../../src/model/car-rental-online");

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
        dni: '12345',
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

        clientes.push(usuario4);
        clientes.push(usuario5);
        clientes.push(usuario6);
        carrentalonline.agregarCliente(usuario1);
        carrentalonline.agregarCliente(usuario2);
        carrentalonline.agregarCliente(usuario3);
        assert.deepEqual(carrentalonline._empleados, empleados)

    })
    it("get vehiculos", function () {


    })
    it("get reservas", function () {


    })
    it("agregar clientes",function(){
        carrentalonline.agregarCliente(usuario1);
        //comprobar que es un cliente antes de agregar
        
    })







})