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
