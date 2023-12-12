const chai = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const CarRentalOnline = require("../../src/model/car-rental-online");


chai.use(supertest);

const URL = 'http://localhost:3000'; 

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