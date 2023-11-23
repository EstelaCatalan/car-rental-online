class InvitadoDisponibilidadPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new InvitadoDisponibilidadPageView();
    }

    obtenerDisponibilidad(event) {

        event.preventDefault();
        const formulario = event.target;
        const marca = formulario.marca.value;
        const modelo = formulario.modelo.value;


        const disponibilidad = this.model.disponibles(marca, modelo);
        this.view.mostrarDisponibilidad(disponibilidad);
    }
    async refresh(url) {

        await super.refresh(url);


    }
}
