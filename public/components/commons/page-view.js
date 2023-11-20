class PageView extends View {
	mensajesView;
	constructor(viewId) {
		super('contents', viewId);
		// this.mensajesView = new MensajesView();
	}
	get controller() { return router.controller; }
	async refresh(url) {
		try { await super.refresh(); }
		catch (err) {
			console.error(err.message);
			// mensajes.agregarError(err.message)
		}
		// finally { this.mensajesView.refresh(); }
	}
}