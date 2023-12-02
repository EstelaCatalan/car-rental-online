class ClienteHomePageView extends PageView {
    
    constructor() { super('cliente-home-page'); }
    
    async refresh(url){
        await super.refresh();
        await mensajes.refresh();
        }
        

}
