class InvitadoSigninPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new InvitadoSigninPageView();
    }
    get usuarioEmail() { return this.view.usuarioEmailInputValue; }
    get usuarioContraseña() { return this.view.usuarioContraseñaInputValue; }
    get usuarioRol() { return this.view.usuarioRolInputValue; }

    async ingresar(event) {

        event.preventDefault();
        this.view.form.reportValidity();
        let valid = this.view.form.checkValidity();
        if (valid) {
            try {
                this.model.signin(this.usuarioEmail, this.usuarioContraseña, this.usuarioRol);
                

                if (this.usuarioRol == "Empleado") {
                    event.target.href = '/car-rental-online/empleado-home-page';
                    router.route(event);

                }
                if (this.usuarioRol == "Cliente") {
                    event.target.href = '/car-rental-online/cliente-home-page';
                    router.route(event);

                }

            }
            catch (err) {
                console.log( err.message);
                //mensajes.agregarError(err.message);

            }
        }

    }
    async refresh(url) {
        await super.refresh(url);
    }


}