class EmpleadoHomePageView extends PageView {
    
    constructor() { super('empleado-home-page'); }
    
    async refresh(url){
        await super.refresh();
        await mensajes.refresh();
        }
        

}