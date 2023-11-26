class ClienteReservarPageView extends PageView {
    constructor() {
        super('cliente-reservar-page');
    }

    get formularioReserva() {
        return document.getElementById('formularioReserva');
    }

    get reservaInicioInput() {
        return document.getElementById('reservaInicio');
    }
    get reservaInicioInputValue() {
        return this.reservaInicioInput.value;
    }

    get reservaFinInput() {
        return document.getElementById('reservaFin');
    }
    get reservaFinInputValue() {
        return this.reservaFinInput.value;
    }

    bindReservarButton(callback) {
        const reservarButton = this.formularioReserva.querySelector('button');
        reservarButton.addEventListener('click', callback);
    }

}
