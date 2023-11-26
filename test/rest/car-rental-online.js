const assert = require("chai").assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const CarRentalOnline = require("../../src/model/car-rental-online");
const Reserva = require("../../src/model/reserva");

chai.use(chaiHttp);

const URL = 'http://localhost:3000'; 

describe('Car Rental Online REST API pruebas', () => {

    let carrentalonline;

    beforeEach(function () {
        carrentalonline = new CarRentalOnline();

        beforeEach(async function () {
            carrentalonline = new CarRentalOnline();
            //aquí hay que definir el beforeEach haciendo el put
            //para insertar los datos para hacer las pruebas

           
        });

    });

   it(`PUT ${URL}/car-rental-online/api/reservas con código 200`, async () => {
    try {
        const nuevasReservas = [
            { 
                _id: 'id_reserva_1',
                _inicio: new Date('2023-11-27T10:00:00Z'), 
                _fin: new Date('2023-11-29T18:00:00Z'), 
                _costoDia: 50,
                _numero: 'numero_reserva_1',
                _entrega: 'lugar_entrega_1',
                _devolucion: 'lugar_devolucion_1',
                _fecha: new Date('2023-11-27'),
                _clienteId: 'id_cliente_1',
                _vehiculoId: 'id_vehiculo_1',
            },
        
        ];

        const instanciasReservas = nuevasReservas.map(reserva => new Reserva(reserva._id));

        const response = await chai.request(URL).put('/car-rental-online/api/reservas').send(instanciasReservas);
        
        assert.equal(response.status, 200, 'El código de estado debe ser 200');
      
    } catch (error) {
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

});
