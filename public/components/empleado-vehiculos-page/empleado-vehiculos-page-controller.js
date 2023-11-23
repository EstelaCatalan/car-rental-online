class EmpleadoVehiculosPageController {
    constructor(view) {
        this.view = view;
        this.loadVehicles();
    }

    // Método para cargar datos ficticios de vehículos
    async loadVehicles() {
        const vehicles = [
            { _id: 1, matricula: 'AAA001', estado: 'eliminado', marca: 'Marca 1' },
            { _id: 2, matricula: 'AAA002', estado: 'entregado', marca: 'Marca 2' },
            { _id: 3, matricula: 'AAA003', estado: 'disponible', marca: 'Marca 3' },
            
        ];

        this.view.renderVehicles(vehicles);
    }

    handleMatriculaClick(vehicleId) {
        console.log(`Clic en matrícula. Navegar a empleado-vehiculo-page con vehiculoId: ${vehicleId}`);

        // Construir la URL de la página empleado-vehiculo-page con el vehicleId como parámetro
        const url = `empleado-vehiculo-page.html?vehiculoId=${vehicleId}`;

        // Navegar a la nueva URL
        window.location.href = url;
    }
    
}

// Exporta la clase para poder utilizarla desde otros archivos
export default EmpleadoVehiculosPageController;
