class ClientePerfilPageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new ClientePerfilPageView();
        this.view.mostrarPerfil(usuario);
    }
    get clienteNombres() { return this.view.clienteNombresInputValue; }
    get clienteApellidos() { return this.view.clienteApellidosInputValue; }
    get clienteEmail() { return this.view.clienteEmailInputValue; }
    get clienteTelefono() { return this.view.clienteTelefonoInputValue; }
    get clienteDireccion() { return this.view.clienteDireccionInputValue; }
    get clientePassword() { return this.view.clientePasswordInputValue; }
    get clientePassword2() { return this.view.clientePassword2InputValue; }
   

    async guardar(event) {
        event.preventDefault();
        this.view.form.reportValidity();
        let valid = this.view.form.checkValidity();
        if (valid) {
            const cliente = {
                nombres: this.view.clienteNombresInputValue,
                apellidos: this.view.clienteApellidosInputValue,
                direccion: this.view.clienteDireccionInputValue,
                email: this.view.clienteEmailInputValue,
                password: this.view.clientePasswordInputValue,
                telefono: this.view.clienteTelefonoInputValue
            };
            try {
                await this.model.setPerfil(cliente);
                event.target.href = '/car-rental-online/invitado-home-page';
                await mensajes.agregarSuccces('Perfil modificado');
                
            } catch (e) {
                console.error(e.message);
                await mensajes.agregarError(e.message?e.message:e);
            }finally{
                await Router.route(event);
            }
        }
    }

    async signout(event) {
        event.preventDefault();
        if (this.model.usuario) {
            try {
                await this.model.signout();
                event.target.href = '/car-rental-online/invitado-home-page';
                await mensajes.agregarSuccces('El cliente ha salido satisfactoriamente ');
            } catch (e) {
                console.error(e);
                await mensajes.agregarError(e.message?e.message:e);
            }finally{
                await Router.route(event);
            }
        }
    }

    async refresh(url) {
        await super.refresh(url);
        let dni = this.model.usuario.dni; 
        if (dni) this.view.usuario = dni; 
        mensajes.agregarInfo('dni cargado');
    }
}
