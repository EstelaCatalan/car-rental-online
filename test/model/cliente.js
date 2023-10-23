const assert = require("chai").assert;
const Cliente = require("../../src/model/cliente");


describe("cliente", function () {
    let cliente;
    const id = '1';
    const nombres='usuario 1';
    const dni='12345678D';
    const apellidos='apellidos 1';
    const direccion ='direccion1';
    const email='usuario1@gmail.es';
    const password='12345';
    const telefono='12345678';
    const rol='Cliente';
    
    beforeEach(function () {
        cliente = new Cliente(id);
        cliente._nombres=nombres;
        cliente._dni=dni;
        cliente._apellidos=apellidos;
        cliente._direccion=direccion;
        cliente._email=email;
        cliente._password=password;
        cliente._telefono=telefono;

    });
    it("constructor cliente", function () {
        assert.equal(cliente._id,id);
        assert.equal(cliente._rol,rol)
    });
    it("getter nombres",function(){
        assert.equal(cliente._nombres,nombres);

    });
    it("setter nombres",function(){
        const nombres2 ='usuario 2'
        cliente._nombres=nombres2;
        assert.equal(cliente._nombres,nombres2);

    });
    it("getter dni",function(){
        assert.equal(cliente._dni,dni);

    });
    it("setter dni",function(){
        const dni2='22222222L'
        cliente._dni=dni2;
        assert.equal(cliente._dni,dni2);

    });
    it("getter apellidos",function(){
        assert.equal(cliente._apellidos,apellidos);

    });
    it("setter apellidos",function(){
        const apellidos2='apellidos2'
        cliente._apellidos=apellidos2;
        assert.equal(cliente._apellidos,apellidos2);

    });
    it("getter direccion",function(){
        assert.equal(cliente._direccion,direccion);

    });
    it("setter direccion",function(){
        const direccion2='direccion2'
        cliente._direccion=direccion2;
        assert.equal(cliente._direccion,direccion2);

    });
    it("getter email",function(){
        assert.equal(cliente._email,email);

    });
    it("setter email",function(){
        const email2='email2'
        cliente._email=email2;
        assert.equal(cliente._email,email2);

    });
    it("getter password",function(){
        assert.equal(cliente._password,password);

    });
    it("setter password",function(){
        const password2='password'
        cliente._password=password2;
        assert.equal(cliente._password,password2);

    });
    it("getter rol",function(){
        assert.equal(cliente._rol,rol);

    });
    it("setter rol",function(){
        const rol2='rol2'
        cliente._rol=rol2;
        assert.equal(cliente._rol,rol2);

    });
    it("getter telefono",function(){
        assert.equal(cliente._telefono,telefono);

    });
    it("setter telefono",function(){
        const telefono2='2222222222222'
        cliente._telefono=telefono2;
        assert.equal(cliente._telefono,telefono2);

    });

    


});
