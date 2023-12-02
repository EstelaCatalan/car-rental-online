class ClienteHomePageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new ClienteHomePageView();
    }
    async signout(event) {
        event.preventDefault;
        if (this.model.usuario) {
            try {
                this.model.signout();
                event.target.href = '/car-rental-online/invitado-home-page';
                await mensajes.agregarSuccces('Ha salido de la cuenta')
            } catch (e) {
                console.error(e)
                await mensajes.agregarError(e.message ? e.message : e);
            } finally {
                await Router.route(event);
            }

        }

    }
   

}