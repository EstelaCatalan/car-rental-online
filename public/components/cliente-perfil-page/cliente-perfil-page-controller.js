class ClientePerfilPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new ClientePerfilPageView();
    }

    get clienteNombres() { return this.view.clienteNombresInputValue; }
    get clienteApellidos() { return this.view.clienteApellidosInputValue; }
    get clienteEmail() { return this.view.clienteEmailInputValue; }
    get clienteTelefono() { return this.view.clienteTelefonoInputValue; }
    get clienteDireccion() { return this.view.clienteDireccionInputValue; }
    get clientePassword() { return this.view.clientePasswordInputValue; }
    get clientePassword2() { return this.view.clientePassword2InputValue; }

    async obtenerUsuarioYMostrarDNI(userId) {
        try {
            const userData = await this.model.clienteById(id)(userId); 
            const userDNI = userData.dni; 
            this.view.usuario = userDNI; 
        } catch (error) {
            console.error("Error al obtener la información del usuario:", error);
        }
    }
  
    async guardar(event) {
        event.preventDefault;
        this.view.form.reportValidity();
        let valid = this.view.form.checkValidity();
        if (valid) {
            const cliente = {

                nombres: this.clienteNombres,
                apellidos: this.clienteApellidos,
                direccion: this.clienteDireccion,
                email: this.clienteEmail,
                password: this.clientePassword,
                telefono: this.clienteTelefono

            };
            try {

                this.model.setPerfil(cliente)
                event.target.href = '/car-rental-online/invitado-home-page';
                await Router.route(event);
            } catch (err) {
                console.error(err.message)

            }
        }
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
        let dni = this.dni
        if (dni) this.view.usuarioDNI = dni;
    }


}