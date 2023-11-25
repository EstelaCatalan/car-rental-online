class InvitadoDisponibilidadPageView extends PageView {
    constructor() {
        super('invitado-disponibilidad-page');
    }

    mostrarVehiculosDisponibles(vehiculos) {
        const contenedor = document.querySelector('.vehiculos-disponibles');
        contenedor.innerHTML = '';

        vehiculos.forEach((vehiculo) => {
            const elementoVehiculo = document.createElement('div');
            elementoVehiculo.textContent = `ID: ${vehiculo.id}, Modelo: ${vehiculo.modelo}, Marca: ${vehiculo.marca}`;
            contenedor.appendChild(elementoVehiculo);
        });
    }
}
