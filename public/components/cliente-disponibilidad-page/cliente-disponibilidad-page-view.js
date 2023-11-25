class ClienteDisponibilidadPageView extends PageView {

    constructor() { super('cliente-disponibilidad-page'); }

    mostrarDisponibilidad(disponibilidad) {
        const listaDisponibilidad = document.getElementById('listaDisponibilidad');

        listaDisponibilidad.innerHTML = '';

        if (disponibilidad.length === 0) {

            const nodisp = document.createElement('p');
            nodisp.textContent = 'No se encontraron vehículos disponibles';
            listaDisponibilidad.appendChild(nodisp);
        } else {

            disponibilidad.forEach(vehiculo => {
                const listItem = document.createElement('li');
                listItem.textContent = `${vehiculo.marca} ${vehiculo.modelo}`;
                listaDisponibilidad.appendChild(listItem);
            });
        }
    }

}
