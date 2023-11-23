class InvitadoSigninPageView extends PageView {
    
    constructor() { super('invitado-signin-page'); }
 get form(){return document.getElementById('formularioIngresar');}
 get usuarioEmailInput() { return document.getElementById('email'); }
get usuarioEmailInputValue() { return this.usuarioEmailInput.value; }
get usuarioContraseñaInput() { return document.getElementById('Contraseña'); }
get usuarioContraseñaInputValue() { return this.usuarioContraseñaInput.value; }
get usuarioRolInput() { return document.getElementById('rol'); }
get usuarioRolInputValue() { return this.usuarioRolInput.value; }
async refresh(url) {await super.refresh(url);}


}