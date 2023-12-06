const assert = require("chai").assert;
const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http');
const app = require('../../app');
const CarRentalOnline = require("../../src/model/car-rental-online");
const Reserva = require("../../src/model/reserva");
const Cliente = require("../../src/model/cliente");
const Empleado=require("../../src/model/empleado")

chai.use(chaiHttp);

const URL = 'http://localhost:3000';

describe('Car Rental Online REST API pruebas', () => {

    let carrentalonline;


        beforeEach(async function() {
            carrentalonline = new CarRentalOnline();
            //aquí hay que definir el beforeEach haciendo el put
            //para insertar los datos para hacer las pruebas

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
            const cliente1 = {
                _id:'1',
                dni: '123',
                nombres: 'nombre1',
                apellidos: 'apellidos1',
                direccion: 'direccion1',
                email: 'email1',
                password: 'password1',
                telefono: 'telefono1',
                rol: 'Cliente',
            };
            const empleado1 = {
                _id:'2',
                dni: '1234',
                nombres: 'nombre2',
                apellidos: 'apellidos2',
                direccion: 'direccion2',
                email: 'email2',
                password: 'password2',
                telefono: 'telefono2',
                rol: 'Empleado',
            }


            const vehiculo1 = {
                id: 101,
            };

            carrentalonline.agregarVehiculo(vehiculo1);

            carrentalonline.agregarCliente(cliente1);
            carrentalonline.signin(cliente1.email, cliente1.password, cliente1.rol);
            carrentalonline.reservar(reserva1);

        });



    it(`PUT ${URL}/car-rental-online/api/reservas con código 200`, async () => {
        try {
            const jsonReserva = [{
                "id": "id_reserva_1",
                "inicio": "2023-11-27T10:00:00.000Z",
                "fin": "2023-11-29T18:00:00.000Z",
                "costoDia": 50,
                "numero": "numero_reserva_1",
                "entrega": "lugar_entrega_1",
                "devolucion": "lugar_devolucion_1",
                "fecha": "2023-11-27T00:00:00.000Z",
                "clienteId": "id_cliente_1",
                "vehiculoId": "id_vehiculo_1"
            }];

            const response = await chai.request(URL).put('/car-rental-online/api/reservas').send(jsonReserva);

            assert.equal(response.status, 200, 'El código de estado debe ser 200');

            assert.equal(jsonReserva.length, response.body.length, 'La cantidad de objetos debe ser la misma');

        } catch (error) {
            throw error;
        }
    });
    it(`PUT ${URL}/car-rental-online/api/empleados`,async function(){
        try{
            const usuario= [{
                "id":"3",
                "dni": "12345",
                "nombres": "nombre2",
                "apellidos": "apellidos2",
                "direccion": "direccion2",
                "email": "email2",
                "password": "password2",
                "telefono": "telefono2",
                "rol": "Empleado"
            }];
            const response = await chai.request(URL).put('/car-rental-online/api/empleados').send(usuario);
            assert.equal(response.status, 200, 'El código de estado debe ser 200');
            assert.equal(usuario.length, response.body.length, 'La cantidad de objetos debe ser la misma');

        }catch(error){
            throw error;

        }
        

    });
    it(`PUT ${URL}/car-rental-online/api/clientes`,async function(){
        try{
            const usuario= [{
                "id":"2",
                "dni": "1234",
                "nombres": "nombre1",
                "apellidos": "apellidos1",
                "direccion": "direccion1",
                "email": "email1",
                "password": "password1",
                "telefono": "telefono1",
                "rol": "Cliente"
            }];
            const response = await chai.request(URL).put('/car-rental-online/api/clientes').send(usuario);
            assert.equal(response.status, 200, 'El código de estado debe ser 200');
            assert.equal(usuario.length, response.body.length, 'La cantidad de objetos debe ser la misma');

        }catch(error){
            throw error;

        }
        

    });
    

    it(`GET ${URL}/car-rental-online/api/reservas con código 200`, async () => {

        try {
            const response = await chai.request(URL).get('/car-rental-online/api/reservas').send();

            assert.equal(response.status, 200);

        } catch (error) {
            throw error;
        }

    });

    it(`GET ${URL}/car-rental-online/api/reservas con reservas`, async () => {

        try {
            const response = await chai.request(URL).get('/car-rental-online/api/reservas').send();

            assert.equal(response.status, 200, 'El código de estado debe ser 200');

        } catch (error) {
            throw error;
        }

    });

    it('GET ${URL}/car-rental-online/api/reservas/:id', async function() {

        const response = await chai.request(app).get(`/car-rental-online/api/reservas/1`);

        assert.equal(response.status, 200, 'El código de estado no es 200');

        const reservaRecibida = new Reserva(response.body._id);

        reservaRecibida.inicio = new Date(response.body.inicio);
        reservaRecibida.fin = new Date(response.body.fin);

        assert.deepEqual(reservaRecibida, reserva1, 'Las reservas no coinciden');
    });

    describe('DELETE /car-rental-online/api/reservas?numero=', function() {
        it('should cancel a reservation and return success message', async () => {
            try {

                const numeroReserva = '1';

                const response = await chai.request(app).delete(`/car-rental-online/api/reservas?numero=${numeroReserva}`);

                assert.equal(response.status, 200);
                assert.deepEqual(response.body, {
                    message: `Reserva con número ${numeroReserva} cancelada exitosamente`
                });
            } catch (error) {
                throw error;
            }
        });
    });
    it(`GET ${URL}/car-rental-online/api/clientes`, async () => {

        try {
            const response = await chai.request(URL).get('/car-rental-online/api/clientes').send();

            assert.equal(response.status, 200);

        } catch (error) {
            throw error;
        }

    });
    it(`GET ${URL}/car-rental-online/api/empleados`, async () => {

        try {
            const response = await chai.request(URL).get('/car-rental-online/api/empleados').send();

            assert.equal(response.status, 200);

        } catch (error) {
            throw error;
        }

    });
    describe('DELETE /car-rental-online/api/clientes/:cid', function() {
        it('Debe borrar el cliente con id=cid', async () => {
            try {
                let cid='2';
                const response = await chai.request(app).delete(`/car-rental-online/api/clientes/${cid}`);

                assert.equal(response.status, 200);
                assert.deepEqual(response.body,{message:`Cliente con id ${cid} eliminado`});
            } catch (error) {
                throw error;
            }
        });
    });
    describe('DELETE /car-rental-online/api/empleados/:eid', function() {
        it('Debe borrar el empleado con id=eid', async () => {
            try {
                let eid='3';
                const response = await chai.request(app).delete(`/car-rental-online/api/empleados/${eid}`);

                assert.equal(response.status, 200);
                assert.deepEqual(response.body,{message:`Empleado con id ${eid} eliminado`});
            } catch (error) {
                throw error;
            }
        });
    });
    it(`GET ${URL}/car-rental-online/api/clientes?email=`, async () => {

        try {
            const response = await chai.request(URL).get('/car-rental-online/api/clientes?email=email1').send();

            assert.equal(response.status, 200);
            assert.deepEqual(response.body,[{"id":"2",
            "dni": "1234",
            "nombres": "nombre1",
            "apellidos": "apellidos1",
            "direccion": "direccion1",
            "email": "email1",
            "password": "password1",
            "telefono": "telefono1",
            "rol": "Cliente"}]);

        } catch (error) {
            throw error;
        }

    });
    it(`GET ${URL}/car-rental-online/api/empleados?email=`, async () => {

        try {
            const response = await chai.request(URL).get('/car-rental-online/api/empleados?email=email2').send();

            assert.equal(response.status, 200);
            assert.deepEqual(response.body,[{"id":"3",
            "dni": "12345",
            "nombres": "nombre2",
            "apellidos": "apellidos2",
            "direccion": "direccion2",
            "email": "email2",
            "password": "password2",
            "telefono": "telefono2",
            "rol": "Empleado"}]);

        } catch (error) {
            throw error;
        }

    });
    it(`GET ${URL}/car-rental-online/api/clientes/:cid`, async () => {
        let cid=2;

        try {
            const response = await chai.request(URL).get(`/car-rental-online/api/clientes/${cid}`).send();

            assert.equal(response.status, 200);
            assert.deepEqual(response.body,{"id":"2",
            "dni": "1234",
            "nombres": "nombre1",
            "apellidos": "apellidos1",
            "direccion": "direccion1",
            "email": "email1",
            "password": "password1",
            "telefono": "telefono1",
            "rol": "Cliente"});

        } catch (error) {
            throw error;
        }

    });
    it(`GET ${URL}/car-rental-online/api/empleados/:eid`, async () => {
        let eid=3;

        try {
            const response = await chai.request(URL).get(`/car-rental-online/api/empleados/${eid}`).send();

            assert.equal(response.status, 200);
            assert.deepEqual(response.body,{"id":"3",
            "dni": "12345",
            "nombres": "nombre2",
            "apellidos": "apellidos2",
            "direccion": "direccion2",
            "email": "email2",
            "password": "password2",
            "telefono": "telefono2",
            "rol": "Empleado"});

        } catch (error) {
            throw error;
        }

    });
    it(`POST ${URL}/car-rental-online/api/signin`, async () => {
        try {
            let user = {
                email: "email1",
                password: "password1",
                rol: "Cliente"
            };
    
            let response = await chai.request(URL).post(`/car-rental-online/api/signin`).send(user);
    
        
            assert.equal(response.status, 200);
    
            

            assert.equal(response.body.email, user.email);
            assert.equal(response.body.rol, user.rol);
            
    
        } catch (error) {
            throw error;
        }
    });
    it(`POST ${URL}/car-rental-online/api/signup`, async () => {
        try {
            let user = {
                id: "2",
                dni: "12345",
                nombres: "nombre1",
                apellidos: "apellidos1",
                direccion: "direccion1",
                email: "email2",
                password: "password1",
                telefono: "telefono1",
                rol: "Cliente"
            };
    
            let response = await chai.request(URL).post(`/car-rental-online/api/signup`).send(user);
    
            
            assert.equal(response.status, 200);
            assert.isArray(response.body);
            assert.lengthOf(response.body, 2);
           
            
        } catch (error) {
            throw error;
        }
    });
    describe('PUT /car-rental-online/api/usuarios/:uid', function() {
        it('Debería actualizar el perfil de un usuario existente', async () => {
            const usuarioExistente = {
                id: "2",
                dni: "12345",
                nombres: "nombre1",
                apellidos: "apellidos1",
                direccion: "direccion1",
                email: "email2",
                password: "password1",
                telefono: "telefono1",
                rol: "Cliente"
            };
    
            const perfilActualizado = {
                
                nombres: "Paco",
                apellidos: "apellidos1",
                direccion: "direccion1",
                email: "email2",
                password: "password1",
                telefono: "telefono1",
                
            };
    
            
            const response = await request(app)
                .put(`/car-rental-online/api/usuarios/${usuarioExistente.id}`)
                .send(perfilActualizado);
    
            
                assert.equal(response.status, 200);
            chai.expect(response.body).toEqual(usuarioExistente); 
        });
    
        it('Debería devolver un error si el usuario no existe', async () => {
            const usuarioNoExistenteId = '1000'; 
    
            
            const response = await request(app)
                .put(`/car-rental-online/api/usuarios/${usuarioNoExistenteId}`)
                .send({ 
                nombres: "Paco",
                apellidos: "apellidos1",
                direccion: "direccion1",
                email: "email2",
                password: "password1",
                telefono: "telefono1",
                });
    
           
                assert.equal(response.status, 404);
            
            chai.expect(response.body).toEqual({ message: `Usuario con id ${usuarioNoExistenteId} no encontrado` });
        });
    });
    
});