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
                await Router.route(event);
            } catch (err) {
                console.error(err.message)
                //mensajes.agregarError(err.message);
            }
            
        }
        
    }
    async refresh(url){
        
        await super.refresh(url);
        

    }

}