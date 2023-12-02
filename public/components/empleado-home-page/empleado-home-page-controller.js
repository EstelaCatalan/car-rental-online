class EmpleadoHomePageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new EmpleadoHomePageView();
    }
    async signout(event) {
        event.preventDefault;
        if (this.model.usuario) {
            try {
                this.model.signout();
                event.target.href = '/car-rental-online/invitado-home-page';
                await mensajes.agregarSuccces('El empleado ha salido satisfactoriamente')

                
            } catch (e) {
                console.error(e);
                await mensajes.agregarError(e.message?e.message:e);

                
            }finally{
                await Router.route(event);
            }

        }

    }

}