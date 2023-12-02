class NotFoundPageView {
    constructor() { super('not-found-page'); }

    mostrarUrlNoEncontrada(url) {
        
        const urlElement = document.getElementById('url-not-found');
        if (urlElement) {
            urlElement.textContent = url;
        }
    }
}