const chai = require('chai');
const supertest = require('supertest');
const app = require('../app.js'); 
const CarRentalOnline = require("../src/model/car-rental-online");

chai.use(supertest);

const URL = 'http://localhost:3000'; 

describe('GET /car-rental-online/api/vehiculos', () => {
    it('should return a 200 status code and an empty array of vehicles', async () => {
        try {
            const response = await supertest(app).get('/car-rental-online/app.js');

            chai.expect(response.status).to.equal(200, 'El código de estado debe ser 200');

            const vehiculos = response.body.map(vehiculoData => new CarRentalOnline.Vehiculo(vehiculoData));

            chai.expect(vehiculos).to.deep.equal([], 'Las colecciones de vehículos no coinciden');

        } catch (error) {
            throw error;
        }
    });
});
const Vehiculo = require("../src/model/vehiculo");

describe('PUT /car-rental-online/api/vehiculos', () => {
    it('debería actualizar la colección de vehículos', async () => {
        try {
            const vehiculos = [
                { matricula: 'ABC123', marca: 'Toyota', modelo: 'Camry' },
                { matricula: 'XYZ789', marca: 'Honda', modelo: 'Civic' },
                
            ];

            const response = await supertest(app).put('/car-rental-online/api/vehiculos').send(vehiculos);

            const resultado = response.body;

            chai.expect(response.status).to.equal(200, 'El código de estado debe ser 200');

            chai.expect(vehiculos.length).to.equal(resultado.length, 'La cantidad de objetos debe ser la misma');

            const vehiculosTransformados = resultado.map(vehiculoData => new Vehiculo(vehiculoData));

            vehiculosTransformados.forEach(vehiculo => chai.expect(vehiculo._id).to.be.not.undefined, 'El _id debe estar definido');

            chai.expect(vehiculos).to.deep.equal(vehiculosTransformados, 'Las colecciones de vehículos deben coincidir');

            const getResponse = await supertest(app).get('/car-rental-online/api/vehiculos');

            const vehiculosObtenidos = getResponse.body.map(vehiculoData => new Vehiculo(vehiculoData));
            chai.expect(vehiculosTransformados).to.deep.equal(vehiculosObtenidos, 'Los resultados deben coincidir con la colección de vehículos enviada');
        } catch (error) {
            throw error;
        }
    });
});
