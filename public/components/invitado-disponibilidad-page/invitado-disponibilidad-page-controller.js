class InvitadoDisponibilidadPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new InvitadoDisponibilidadPageView();
    }

    obtenerDispo(event){
        try {

            event.preventDefault();
            const formulario = event.target;
            const marca = formulario.marca.value;
            const modelo = formulario.modelo.value;

            const vehiculosDisponibles = this.model.disponibles(marca, modelo, null, null, null, new Date('0000-00-00T10:00:00.000Z'), new Date('9999-12-12T10:00:00.000Z'));
            this.view.mostrarVehiculosDisponibles(vehiculosDisponibles);
        } catch (error) {
            console.error(error.message);

    }
}

    async refresh(url) {
        await super.refresh(url);
        }

    }


