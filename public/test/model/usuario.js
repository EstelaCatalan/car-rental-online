describe("usuario", function () {
    let usuario;
    const id = '1';
    const nombres='usuario 1';
    const dni='12345678D';
    const apellidos='apellidos 1';
    const direccion ='direccion1';
    const email='usuario1@gmail.es';
    const password='12345';
    const rol ='usuario';
    const telefono='12345678';
    
    beforeEach(function () {
        usuario = new Usuario(id);
        usuario._nombres=nombres;
        usuario._dni=dni;
        usuario._apellidos=apellidos;
        usuario._direccion=direccion;
        usuario._email=email;
        usuario._password=password;
        usuario._rol=rol;
        usuario._telefono=telefono;

    });
    it("constructor usuario", function () {
        assert.equal(usuario._id,id);
    });
    it("getter nombres",function(){
        assert.equal(usuario._nombres,nombres);

    });
    it("setter nombres",function(){
        const nombres2 ='usuario 2'
        usuario._nombres=nombres2;
        assert.equal(usuario._nombres,nombres2);

    });
    it("getter dni",function(){
        assert.equal(usuario._dni,dni);

    });
    it("setter dni",function(){
        const dni2='22222222L'
        usuario._dni=dni2;
        assert.equal(usuario._dni,dni2);

    });
    it("getter apellidos",function(){
        assert.equal(usuario._apellidos,apellidos);

    });
    it("setter apellidos",function(){
        const apellidos2='apellidos2'
        usuario._apellidos=apellidos2;
        assert.equal(usuario._apellidos,apellidos2);

    });
    it("getter direccion",function(){
        assert.equal(usuario._direccion,direccion);

    });
    it("setter direccion",function(){
        const direccion2='direccion2'
        usuario._direccion=direccion2;
        assert.equal(usuario._direccion,direccion2);

    });
    it("getter email",function(){
        assert.equal(usuario._email,email);

    });
    it("setter email",function(){
        const email2='email2'
        usuario._email=email2;
        assert.equal(usuario._email,email2);

    });
    it("getter password",function(){
        assert.equal(usuario._password,password);

    });
    it("setter password",function(){
        const password2='password'
        usuario._password=password2;
        assert.equal(usuario._password,password2);

    });
    it("getter rol",function(){
        assert.equal(usuario._rol,rol);

    });
    it("setter rol",function(){
        const rol2='rol2'
        usuario._rol=rol2;
        assert.equal(usuario._rol,rol2);

    });
    it("getter telefono",function(){
        assert.equal(usuario._telefono,telefono);

    });
    it("setter telefono",function(){
        const telefono2='2222222222222'
        usuario._telefono=telefono2;
        assert.equal(usuario._telefono,telefono2);

    });

    


});
