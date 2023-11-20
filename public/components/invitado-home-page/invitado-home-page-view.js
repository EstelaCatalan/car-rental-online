class InvitadoHomePageView extends PageView {
    url;
    constructor() { super('invitado-home-page'); }
    async refresh(url) { await super.refresh(url); }
    get urlParagraph() {
        return document.getElementById('url');
    }
    async refresh(url) {
        await super.refresh(url);
        this.urlParagraph.innerHTML = this.url;
    }

}

