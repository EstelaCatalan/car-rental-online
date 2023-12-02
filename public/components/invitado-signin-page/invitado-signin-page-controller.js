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
                    

                }
                if (this.usuarioRol == "Cliente") {
                    event.target.href = '/car-rental-online/cliente-home-page';
                    

                }

            }
            catch (e) {
                console.error(e);
                await mensajes.agregarError(e.message?e.message:e);


            }finally{
                router.route(event);
            }
        }

    }
   


}