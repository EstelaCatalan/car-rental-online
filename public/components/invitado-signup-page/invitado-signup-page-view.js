class InvitadoSignupPageView extends PageView {

    constructor() { super('invitado-signup-page'); }

    get form() { return document.getElementById('signupform'); }
    
    get clienteDniInput() { return document.getElementById('clienteDni'); }
    get clienteDniInputValue() { return this.clienteDniInput.value; }

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

    get clienteRolInput() { return document.getElementById('clienteRol'); }
    get clienteRolInputValue() { return this.clienteRolInput.value; }




}