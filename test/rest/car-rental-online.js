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
describe('DELETE /car-rental-online/api/vehiculos/:id', () => {

    let carRental;
    let vehiculoId;

    beforeEach(async function () {
        carRental = new CarRentalOnline();


        const vehiculo = new Vehiculo('123', 'ABC123', 'Toyota', 'Camry', 'Sed�n', 'Autom�vil', true, false, 50, 'Veh�culo de prueba');
        carRental.agregarVehiculo(vehiculo);

        vehiculoId = vehiculo._id;
    });

    it('should delete a vehicle and return a 200 status code', async () => {
        try {
            const response = await supertest(app).delete(`/car-rental-online/api/vehiculos/${vehiculoId}`);

            chai.expect(response.status).to.equal(200, 'El c�digo de estado debe ser 200');

            const vehiculoEliminado = new Vehiculo(response.body);

            chai.expect(vehiculoEliminado._id).to.equal(vehiculoId, 'El veh�culo eliminado no coincide con el esperado');
            chai.expect(vehiculoEliminado.disponible).to.be.false, 'El veh�culo eliminado debe estar marcado como no disponible';
        } catch (error) {
            throw error;
        }
    });

    it('should return an error when trying to delete a non-existing vehicle', async () => {
        try {
            const vehiculoNoExistenteId = 'id_que_no_existe';

            const response = await supertest(app).delete(`/car-rental-online/api/vehiculos/${vehiculoNoExistenteId}`);

            chai.expect(response.status).to.equal(404, 'El c�digo de estado debe ser 404');
            chai.expect(response.body).to.deep.equal({ error: 'Veh�culo no encontrado' }, 'El mensaje de error no es el esperado');
        } catch (error) {
            throw error;
        }
    });

});

describe('GET /car-rental-online/api/vehiculos', () => {
    it('should return a 200 status code and an empty array of vehicles', async () => {
        try {
            const response = await supertest(app).get('/car-rental-online/app.js');

            chai.expect(response.status).to.equal(200, 'El c�digo de estado debe ser 200');

            const vehiculos = response.body.map(vehiculoData => new CarRentalOnline.Vehiculo(vehiculoData));

            chai.expect(vehiculos).to.deep.equal([], 'Las colecciones de veh�culos no coinciden');

        } catch (error) {
            throw error;
        }
    });
});
const Vehiculo = require("../../src/model/vehiculo");

describe('PUT /car-rental-online/api/vehiculos', () => {
    it('deber�a actualizar la colecci�n de veh�culos', async () => {
        try {
            const vehiculos = [
                { matricula: 'ABC123', marca: 'Toyota', modelo: 'Camry' },
                { matricula: 'XYZ789', marca: 'Honda', modelo: 'Civic' },

            ];

            const response = await supertest(app).put('/car-rental-online/api/vehiculos').send(vehiculos);

            const resultado = response.body;

            chai.expect(response.status).to.equal(200, 'El c�digo de estado debe ser 200');

            chai.expect(vehiculos.length).to.equal(resultado.length, 'La cantidad de objetos debe ser la misma');

            const vehiculosTransformados = resultado.map(vehiculoData => new Vehiculo(vehiculoData));

            vehiculosTransformados.forEach(vehiculo => chai.expect(vehiculo._id).to.be.not.undefined, 'El _id debe estar definido');

            chai.expect(vehiculos).to.deep.equal(vehiculosTransformados, 'Las colecciones de veh�culos deben coincidir');

            const getResponse = await supertest(app).get('/car-rental-online/api/vehiculos');

            const vehiculosObtenidos = getResponse.body.map(vehiculoData => new Vehiculo(vehiculoData));
            chai.expect(vehiculosTransformados).to.deep.equal(vehiculosObtenidos, 'Los resultados deben coincidir con la colecci�n de veh�culos enviada');
        } catch (error) {
            throw error;
        }
    });
});
describe('GET /car-rental-online/api/vehiculos con parámetro matricula en el query string', () => {
    let carRental;
    let vehiculoMatriculaExistente;
    let vehiculoMatriculaNoExistente;

    beforeEach(() => {
        carRental = new CarRentalOnline();

        // Se agrega un vehículo con matrícula existente
        vehiculoMatriculaExistente = new CarRentalOnline.Vehiculo('123', 'ABC123', 'Toyota', 'Camry', 'Sedán', 'Automóvil', true, false, 50, 'Vehículo de prueba');
        carRental.agregarVehiculo(vehiculoMatriculaExistente);

        // Se crea un vehículo con matrícula no existente en el modelo
        vehiculoMatriculaNoExistente = new CarRentalOnline.Vehiculo('456', 'XYZ789', 'Honda', 'Civic', 'Sedán', 'Automóvil', true, false, 60, 'Vehículo de prueba no existente');
    });

    it('debería obtener el vehículo existente con matrícula y devolver un código de estado 200', async () => {
        try {
            const response = await supertest(app).get(`/car-rental-online/api/vehiculos?matricula=${vehiculoMatriculaExistente.matricula}`);

            chai.expect(response.status).to.equal(200, 'El código de estado debe ser 200');

            const vehiculoObtenido = new CarRentalOnline.Vehiculo(response.body);

            chai.expect(vehiculoObtenido).to.deep.equal(vehiculoMatriculaExistente, 'Los vehículos no coinciden');
            chai.expect(vehiculoObtenido._id).to.be.not.undefined, 'El _id debe estar definido';
        } catch (error) {
            throw error;
        }
    });

    it('debería devolver un código de estado 500 al intentar obtener un vehículo con matrícula no existente', async () => {
        try {
            const response = await supertest(app).get(`/car-rental-online/api/vehiculos?matricula=${vehiculoMatriculaNoExistente.matricula}`);

            chai.expect(response.status).to.equal(500, 'El código de estado debe ser 500');
            chai.expect(response.body).to.deep.equal({ error: 'Error interno del servidor al obtener vehículos' }, 'El mensaje de error no es el esperado');
        } catch (error) {
            throw error;
        }
    });
});
describe('GET /car-rental-online/api/vehiculos/:id', () => {
    it('should return a vehicle with a 200 status code', async () => {
        try {
            const response = await supertest(app).get(`/car-rental-online/api/vehiculos/${vehiculoId}`);

            chai.expect(response.status).to.equal(200, 'El código de estado debe ser 200');

            const vehiculoObtenido = new Vehiculo(response.body);

            chai.expect(vehiculoObtenido._id).to.equal(vehiculoId, 'El vehículo obtenido no coincide con el esperado');

            const vehiculoAgregado = carRental.vehiculoById(vehiculoId);

            chai.expect(vehiculoAgregado).to.deep.equal(vehiculoObtenido, 'El vehículo obtenido debe ser igual al vehículo agregado');
        } catch (error) {
            throw error;
        }
    });

    it('should return an error when trying to get a non-existing vehicle', async () => {
        try {
            const vehiculoNoExistenteId = 'id_que_no_existe';

            const response = await supertest(app).get(`/car-rental-online/api/vehiculos/${vehiculoNoExistenteId}`);

            chai.expect(response.status).to.equal(404, 'El código de estado debe ser 404');
            chai.expect(response.body).to.deep.equal({ error: 'Vehículo no encontrado' }, 'El mensaje de error no es el esperado');
        } catch (error) {
            throw error;
        }
    });
});
describe('POST /car-rental-online/api/vehiculos', () => {
    it('debería agregar un nuevo vehículo y devolver un código de estado 201', async () => {
        try {
            const nuevoVehiculo = {
                matricula: 'ABC123',
                marca: 'Toyota',
                modelo: 'Camry',
                tipo: 'Sedán',
                disponible: true,
                costoDia: 50,
                descripcion: 'Vehículo de prueba'
            };

            const response = await supertest(app)
                .post('/car-rental-online/api/vehiculos')
                .send(nuevoVehiculo);

            chai.expect(response.status).to.equal(201, 'El código de estado debe ser 201');
            chai.expect(response.body).to.deep.equal(nuevoVehiculo, 'El vehículo agregado no coincide con el esperado');
        } catch (error) {
            throw error;
        }
    });

    it('debería devolver un código de estado 500 al intentar agregar un vehículo con datos inválidos', async () => {
        try {
            // Envía datos inválidos (por ejemplo, falta la matrícula)
            const vehiculoInvalido = {
                marca: 'Toyota',
                modelo: 'Camry',
                tipo: 'Sedán',
                disponible: true,
                costoDia: 50,
                descripcion: 'Vehículo de prueba'
            };

            const response = await supertest(app)
                .post('/car-rental-online/api/vehiculos')
                .send(vehiculoInvalido);

            chai.expect(response.status).to.equal(500, 'El código de estado debe ser 500');
            chai.expect(response.body).to.deep.equal({ error: 'Error interno del servidor al agregar vehículo' }, 'El mensaje de error no es el esperado');
        } catch (error) {
            throw error;
        }
    });
});

describe('DELETE /car-rental-online/api/vehiculos/:id', () => {
    let carRental;
    let vehiculoId;

    beforeEach(async function () {
        carRental = new CarRentalOnline();
        const vehiculo = new CarRentalOnline.Vehiculo('123', 'ABC123', 'Toyota', 'Camry', 'Sedán', 'Automóvil', true, false, 50, 'Vehículo de prueba');
        carRental.agregarVehiculo(vehiculo);
        vehiculoId = vehiculo._id;
    });

    it('debería eliminar un vehículo y devolver un código de estado 200', async () => {
        try {
            const response = await supertest(app).delete(`/car-rental-online/api/vehiculos/${vehiculoId}`);

            chai.expect(response.status).to.equal(200, 'El código de estado debe ser 200');

            const vehiculoEliminado = new CarRentalOnline.Vehiculo(response.body);

            chai.expect(vehiculoEliminado._id).to.equal(vehiculoId, 'El vehículo eliminado no coincide con el esperado');
        } catch (error) {
            throw error;
        }
    });

    it('debería devolver un código de estado 404 al intentar eliminar un vehículo inexistente', async () => {
        try {
            const vehiculoNoExistenteId = 'id_que_no_existe';

            const response = await supertest(app).delete(`/car-rental-online/api/vehiculos/${vehiculoNoExistenteId}`);

            chai.expect(response.status).to.equal(404, 'El código de estado debe ser 404');
            chai.expect(response.body).to.deep.equal({ error: 'Vehículo no encontrado' }, 'El mensaje de error no es el esperado');
        } catch (error) {
            throw error;
        }
    });
});