class InvitadoHomePageView extends PageView {
    
    constructor() { super('invitado-home-page'); }
    
    async refresh(url){
        await super.refresh();
        await mensajes.refresh();
        }
        

}

