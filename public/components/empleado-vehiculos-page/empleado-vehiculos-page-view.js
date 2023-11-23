class EmpleadoVehiculosPageView {
    constructor(controller) {
        this.controller = controller;
    }

    // Método para la lista de vehículos
    renderVehicles(vehicles) {
        const tableBody = document.getElementById('vehicle-table-body');

        // Limpiamos el contenido actual de la tabla
        tableBody.innerHTML = '';

        vehicles.forEach(vehicle => {
            const row = document.createElement('tr');
            row.style.color = this.getColorForEstado(vehicle.estado);

            const matriculaCell = document.createElement('td');
            const matriculaLink = document.createElement('a');
            matriculaLink.textContent = vehicle.matricula;
            matriculaLink.href = '#';
            matriculaLink.addEventListener('click', () => this.handleMatriculaClick(vehicle._id));
            matriculaCell.appendChild(matriculaLink);


            const marcaCell = document.createElement('td');
            marcaCell.textContent = vehicle.marca;
            row.appendChild(marcaCell);

            const modeloCell = document.createElement('td');
            modeloCell.textContent = vehicle.modelo;
            row.appendChild(modeloCell);

            const etiquetaCell = document.createElement('td');
            etiquetaCell.textContent = vehicle.etiqueta;
            row.appendChild(etiquetaCell);

            const tipoCell = document.createElement('td');
            tipoCell.textContent = vehicle.tipo;
            row.appendChild(tipoCell);

            const disponibleCell = document.createElement('td');
            disponibleCell.textContent = vehicle.disponible ? 'Sí' : 'No';
            row.appendChild(disponibleCell);

            const eliminadoCell = document.createElement('td');
            eliminadoCell.textContent = vehicle.eliminado ? 'Sí' : 'No';
            row.appendChild(eliminadoCell);

            const costoDiaCell = document.createElement('td');
            costoDiaCell.textContent = vehicle.costoDia;
            row.appendChild(costoDiaCell);

            const descripcionCell = document.createElement('td');
            descripcionCell.textContent = vehicle.descripcion;
            row.appendChild(descripcionCell);

            tableBody.appendChild(row);

        });
    }

    // Método para manejar el clic en la matrícula y notificar al controlador
    handleMatriculaClick(vehicleId) {
        this.controller.handleMatriculaClick(vehicleId);
    }

    // Método para asignar colores según el estado del vehículo
    getColorForEstado(estado) {
        switch (estado) {
            case 'eliminado':
                return 'red';
            case 'entregado':
                return 'blue';
            case 'disponible':
                return 'green';
            default:
                return 'black';
        }
    }
}

// Exporta la clase para poder utilizarla desde otros archivos
export default EmpleadoVehiculosPageView;
