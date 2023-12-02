const assert = require("chai").assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
describe (url,function(){
    const USUARIOS=[];
    let usuarios;
    before(async function(){
        USUARIOS.push({
            dni: "12345678A",
            nombres: "Juan",
            apellidos: "Pérez",
            direccion: "Calle 123",
            email: "juan@example.com",
            password: "password123",
            telefono: "123456789",
            rol: "Cliente",
        });
        USUARIOS.push({
            dni: "12345678R",
            nombres: "Pepe",
            apellidos: "Pérez",
            direccion: "Calle 1234",
            email: "pepe@example.com",
            password: "password1234",
            telefono: "123456780",
            rol: "Cliente",
        });
    })

beforeEach(async function () {
    response = await chai.request(URL).put(`/clientes`).send(USUARIOS);
    assert.equal(response.status, 200);
    assert.isTrue(response.ok);
    usuarios = response.body;
    usuarios.forEach((u, iu) => {
    assert.exists(u._id)
    assert.equal(u._dni, USUARIOS[iu]._dni);
    })
    
});

it(`GET ${URL}/clientes`, async function () {
    let response = await chai.request(URL).get('/clientes').send();
    assert.equal(response.status, 200);
    assert.isTrue(response.ok);
    let resultado = response.body;
    assert.deepEqual(resultado, usuarios);
    });



})
