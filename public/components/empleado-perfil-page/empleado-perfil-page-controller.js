class EmpleadoPerfilPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new EmpleadoPerfilPageView();
    }

    get clienteNombres() { return this.view.clienteNombresInputValue; }
    get clienteApellidos() { return this.view.clienteApellidosInputValue; }
    get clienteEmail() { return this.view.clienteEmailInputValue; }
    get clienteTelefono() { return this.view.clienteTelefonoInputValue; }
    get clienteDireccion() { return this.view.clienteDireccionInputValue; }
    get clientePassword() { return this.view.clientePasswordInputValue; }
    get clientePassword2() { return this.view.clientePassword2InputValue; }
    getUsuario(){this.model.perfil();}
    get dni(){ return this.dni; }
    async guardar(event){
        event.preventDefault;
        const cliente = {
            
            nombres: this.clienteNombres,
            apellidos: this.clienteApellidos,
            direccion: this.clienteDireccion,
            email: this.clienteEmail,
            password: this.clientePassword,
            telefono: this.clienteTelefono

        };
        try{

            this.model.setPerfil(cliente)
            event.target.href = '/car-rental-online/invitado-home-page';
            await Router.route(event);
        }catch (err) {
            console.error(err.message)

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