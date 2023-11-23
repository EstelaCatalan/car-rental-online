class ClienteHomePageController extends PageController {
    constructor(model) {
        super(model);
        this.view = new ClienteHomePageView();
    }
    async signout(event) {
        
        event.preventDefault;
        if (this.usuario) {
            try {
                this.model.signout();
                event.target.href = '/car-rental-online/invitado-home-page';
            } catch (err) {
                console.error(err.message)
                mensajes.agregarError(err.message);
            }
            await Router.route(event);
        }
    }
    async refresh(url){
        
        await super.refresh(url);
        

    }

}