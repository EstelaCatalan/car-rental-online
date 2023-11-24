class EmpleadoPerfilPageView extends PageView {
    
    constructor() { super('empleado-perfil-page'); }
    
   set usuario(dni){
    return document.getElementById('usuarioDNI').innerHTML=nombre;
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




}
