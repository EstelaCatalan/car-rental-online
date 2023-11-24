class InvitadoDisponibilidadPageView extends PageView {
    constructor() {
        super('invitado-disponibilidad-page');
    }

    mostrarDisponibilidad(disponibilidad) {
        const listaDisponibilidad = document.getElementById('listaDisponibilidad');

        listaDisponibilidad.innerHTML = '';

        if (disponibilidad.length === 0) {

            const mensajeSinDisponibilidad = document.createElement('p');
            mensajeSinDisponibilidad.textContent = 'No se encontraron vehículos disponibles en este momento.';
            listaDisponibilidad.appendChild(mensajeSinDisponibilidad);
        } else {

            disponibilidad.forEach(vehiculo => {
                const listItem = document.createElement('li');
                listItem.textContent = `${vehiculo.marca} ${vehiculo.modelo}`;
                listaDisponibilidad.appendChild(listItem);
            });
        }
    }
}
