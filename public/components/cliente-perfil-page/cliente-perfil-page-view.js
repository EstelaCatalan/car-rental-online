class ClientePerfilPageView extends PageView {
    constructor() {
        super('cliente-perfil-page');


    }
    get form() { return document.getElementById('perfilform'); }

    get clienteNombresInput() { return document.getElementById('clienteNombres'); }
    get clienteNombresInputValue() { return this.clienteNombresInput.value; }

    get clienteApellidosInput() { return document.getElementById('clienteApellidos'); }
    get clienteApellidosInputValue() { return this.clienteApellidosInput.value; }

    get clienteEmailInput() { return document.getElementById('clienteEmail'); }
    get clienteEmailInputValue() { return this.clienteEmailInput.value; }

    get clienteTelefonoInput() { return document.getElementById('clienteTelefono'); }
    get clienteTelefonoInputValue() { return this.clienteTelefonoInput.value; }

    get clienteDireccionInput() { return document.getElementById('clienteDireccion'); }
    get clienteDireccionInputValue() { return this.clienteDireccionInput.value; }

    get clientePasswordInput() { return document.getElementById('clientePassword'); }
    get clientePasswordInputValue() { return this.clientePasswordInput.value; }

    get clientePassword2Input() { return document.getElementById('clientePassword2'); }
    get clientePassword2InputValue() { return this.clientePassword2Input.value; }

    get clienteRolInput() { return document.getElementById('rol'); }
    get clienteRolInputValue() { return this.clienteRolInput.value; }

    cargarPerfil() {
        const usuario = this.model.perfil();
        const dniElement = document.getElementById('usuarioDNI');
        if (dniElement && usuario.dni) {
            dniElement.textContent = usuario.dni;
        }
    }
    async refresh(url){
        await super.refresh();
        await mensajes.refresh();
        }
        

}


