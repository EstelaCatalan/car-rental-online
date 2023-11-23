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
                console.log('Intentando obtener usuario...');
                const user = await this.model.clienteByEmail(email);
                if (!user) {
                    console.log('Usuario no encontrado. Por favor, regístrese.');
                    throw new Error('Usuario no registrado. Por favor, regístrese.');
                } else {
                    this.model.signin(this.usuarioEmail, this.usuarioContraseña, this.usuarioRol);

                    if (this.usuarioRol = "Empleado") {
                        event.target.href = '/car-rental-online/empleado-home-page';

                    }
                    if (this.usuarioRol = "Cliente") {
                        event.target.href = '/car-rental-online/cliente-home-page';

                    }
                    event.target.href = '/car-rental-online/cliente-home-page';
                }
            } catch (err) {
                console.log('Error en el bloque catch:', err.message);
                console.error('Error en el bloque catch:', err.message);
                mensajes.agregarError(err.message);
                this.view.displayErrorMessage(err.message);
            }
        }

    }
    async refresh(url) {
        await super.refresh(url);
    }


}