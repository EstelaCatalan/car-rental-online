const assert = require("chai").assert;
const Empleado = require("../../src/model/empleado");

describe("empleado", function () {
    let empleado;
    const id = '1';
    const nombres='usuario 1';
    const dni='12345678D';
    const apellidos='apellidos 1';
    const direccion ='direccion1';
    const email='usuario1@gmail.es';
    const password='12345';
    const telefono='12345678';
    const rol='Empleado';
    
    beforeEach(function () {
        empleado = new Empleado(id);
        empleado._nombres=nombres;
        empleado._dni=dni;
        empleado._apellidos=apellidos;
        empleado._direccion=direccion;
        empleado._email=email;
        empleado._password=password;
        empleado._telefono=telefono;

    });
    it("constructor empleado", function () {
        assert.equal(empleado._id,id);
        assert.equal(empleado._rol,rol)
    });
    it("getter nombres",function(){
        assert.equal(empleado._nombres,nombres);

    });
    it("setter nombres",function(){
        const nombres2 ='usuario 2'
        empleado._nombres=nombres2;
        assert.equal(empleado._nombres,nombres2);

    });
    it("getter dni",function(){
        assert.equal(empleado._dni,dni);

    });
    it("setter dni",function(){
        const dni2='22222222L'
        empleado._dni=dni2;
        assert.equal(empleado._dni,dni2);

    });
    it("getter apellidos",function(){
        assert.equal(empleado._apellidos,apellidos);

    });
    it("setter apellidos",function(){
        const apellidos2='apellidos2'
        empleado._apellidos=apellidos2;
        assert.equal(empleado._apellidos,apellidos2);

    });
    it("getter direccion",function(){
        assert.equal(empleado._direccion,direccion);

    });
    it("setter direccion",function(){
        const direccion2='direccion2'
        empleado._direccion=direccion2;
        assert.equal(empleado._direccion,direccion2);

    });
    it("getter email",function(){
        assert.equal(empleado._email,email);

    });
    it("setter email",function(){
        const email2='email2'
        empleado._email=email2;
        assert.equal(empleado._email,email2);

    });
    it("getter password",function(){
        assert.equal(empleado._password,password);

    });
    it("setter password",function(){
        const password2='password'
        empleado._password=password2;
        assert.equal(empleado._password,password2);

    });
    it("getter rol",function(){
        assert.equal(empleado._rol,rol);

    });
    it("setter rol",function(){
        const rol2='rol2'
        empleado._rol=rol2;
        assert.equal(empleado._rol,rol2);

    });
    it("getter telefono",function(){
        assert.equal(empleado._telefono,telefono);

    });
    it("setter telefono",function(){
        const telefono2='2222222222222'
        empleado._telefono=telefono2;
        assert.equal(empleado._telefono,telefono2);

    });

});
