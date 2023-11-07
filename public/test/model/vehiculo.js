describe('Vehiculo', function() {
  it('Constructor debe establecer correctamente _id, _eliminado y _disponible', function() {
    const vehiculo = new Vehiculo('123', false, false);

    assert.equal(vehiculo._id, '123');
    assert.equal(vehiculo._eliminado, false);
    assert.equal(vehiculo._disponible, false);
  });

  it('Setter y Getter de Matricula', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.matricula = 'ABC123';

    assert.equal(vehiculo.matricula, 'ABC123');
  });

  it('Setter y Getter de Marca', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.marca = 'Toyota';

    assert.equal(vehiculo.marca, 'Toyota');
  });

  it('Setter y Getter de Modelo', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.modelo = 'Camry';

    assert.equal(vehiculo.modelo, 'Camry');
  });

  it('Setter y Getter de Etiqueta', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.etiqueta = 'Sedán';

    assert.equal(vehiculo.etiqueta, 'Sedán');
  });

  it('Setter y Getter de Tipo', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.tipo = 'Automóvil';

    assert.equal(vehiculo.tipo, 'Automóvil');
  });

  it('Setter y Getter de Disponible', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.disponible = true;

    assert.equal(vehiculo.disponible, true);
  });

  it('Setter y Getter de Eliminado', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.eliminado = true;

    assert.equal(vehiculo.eliminado, true);
  });

  it('Setter y Getter de CostoDia', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.costoDia = 50;

    assert.equal(vehiculo.costoDia, 50);
  });

  it('Setter y Getter de Descripcion', function() {
    const vehiculo = new Vehiculo('123');
    vehiculo.descripcion = 'Vehículo de prueba';

    assert.equal(vehiculo.descripcion, 'Vehículo de prueba');
  });
});
