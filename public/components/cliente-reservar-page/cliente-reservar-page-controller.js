class ClienteReservarPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new ClienteReservarPageView(this.model);
    }

    agregarLogicaReserva() {
        var fechaActual = new Date().toISOString().substring(0, 16);

        document.getElementById("formularioReserva").elements["reservaFecha"].value = fechaActual;
        document.getElementById("reservaInicio").value = fechaActual;
        document.getElementById("reservaFin").value = fechaActual;

        var botonReservar = document.querySelector("#formularioReserva button");

        botonReservar.addEventListener("click", async (event) => {
            event.preventDefault();

            var inicioReserva = document.getElementById("reservaInicio").value;
            var finReserva = document.getElementById("reservaFin").value;

            try {

                const nuevaReserva = new Reserva();
                nuevaReserva.inicio = new Date(inicioReserva);
                nuevaReserva.fin = new Date(finReserva);
              
                    await this.model.reservar(nuevaReserva);

                window.location.href = "cliente-reservas-page";
            } catch (error) {

                console.error("Error al realizar la reserva:", error.message);
            }
        });

    }


    async refresh(url) {
        await super.refresh(url);
        this.view.agregarLogicaReserva();
    }

    async signout(event) {
        event.preventDefault();
        if (this.model.usuario) {
            try {
                this.model.signout();
                event.target.href = '/car-rental-online/invitado-home-page';
                await Router.route(event);
            } catch (err) {
                console.error(err.message);
            }
        }
    }
}
