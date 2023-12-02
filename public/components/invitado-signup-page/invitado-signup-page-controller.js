class InvitadoSignupPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new InvitadoSignupPageView();
    }
    get clienteDni() { return this.view.clienteDniInputValue; }
    get clienteNombres() { return this.view.clienteNombresInputValue; }
    get clienteApellidos() { return this.view.clienteApellidosInputValue; }
    get clienteEmail() { return this.view.clienteEmailInputValue; }
    get clienteTelefono() { return this.view.clienteTelefonoInputValue; }
    get clienteDireccion() { return this.view.clienteDireccionInputValue; }
    get clientePassword() { return this.view.clientePasswordInputValue; }
    get clientePassword2() { return this.view.clientePassword2InputValue; }
    get clienteRol() { return this.view.clienteRolInputValue; }

    async registrar(event) {
        event.preventDefault();
        this.view.form.reportValidity();
        let valid = this.view.form.checkValidity();
        try {
            if (valid) {
                event.target.href = "/car-rental-online/invitado-home-page";
                if (this.clientePassword == this.clientePassword2) {
                    const cliente = {
                        dni: this.clienteDni,
                        nombres: this.clienteNombres,
                        apellidos: this.clienteApellidos,
                        direccion: this.clienteDireccion,
                        email: this.clienteEmail,
                        password: this.clientePassword,
                        telefono: this.clienteTelefono,
                        rol: this.clienteRol


                    };
                    if (this.clienteRol == "Cliente") {


                        this.model.agregarCliente(cliente);

                    }
                    if (this.clienteRol == "Empleado") {
                        this.model.agregarEmpleado(cliente);

                    }
                }
            }


            

        } catch (e) {
            console.error(e);
            await mensajes.agregarError(e.message ? e.message : e);
        }finally{
            router.route(event);
        }


    }






}