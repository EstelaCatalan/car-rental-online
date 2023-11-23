class ClienteDisponibilidadPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new ClienteReservasPageView();
    }

    obtenerDisponibilidad(event) {

        event.preventDefault();
        const formulario = event.target;
        const marca = formulario.marca.value;
        const modelo = formulario.modelo.value;


        const disponibilidad = this.model.disponibles(marca, modelo);
        this.view.mostrarDisponibilidad(disponibilidad);
    }

    async signout(event) {
        event.preventDefault;
        if (this.model.usuario) {
            try {
                this.model.signout();
                event.target.href = '/car-rental-online/invitado-home-page';
                await Router.route(event);
            } catch (err) {
                console.error(err.message)
                //mensajes.agregarError(err.message);
            }

        }

    }
    async refresh(url) {

        await super.refresh(url);


    }
}
