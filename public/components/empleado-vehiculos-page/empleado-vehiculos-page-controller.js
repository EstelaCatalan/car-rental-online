class EmpleadoVehiculosPageController {
    constructor(view) {
        this.view = view;
        this.loadVehicles();
    }

    // M�todo para cargar datos ficticios de veh�culos
    async loadVehicles() {
        const vehicles = [
            { _id: 1, matricula: 'AAA001', estado: 'eliminado', marca: 'Marca 1' },
            { _id: 2, matricula: 'AAA002', estado: 'entregado', marca: 'Marca 2' },
            { _id: 3, matricula: 'AAA003', estado: 'disponible', marca: 'Marca 3' },
            
        ];

        this.view.renderVehicles(vehicles);
    }

    handleMatriculaClick(vehicleId) {
        console.log(`Clic en matr�cula. Navegar a empleado-vehiculo-page con vehiculoId: ${vehicleId}`);

        // Construir la URL de la p�gina empleado-vehiculo-page con el vehicleId como par�metro
        const url = `empleado-vehiculo-page.html?vehiculoId=${vehicleId}`;

        // Navegar a la nueva URL
        window.location.href = url;
    }
    
}

// Exporta la clase para poder utilizarla desde otros archivos
export default EmpleadoVehiculosPageController;
