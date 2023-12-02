class MensajesView extends View {

	_infos = [];
	_errors = [];
	_success = [];

	constructor() {
		super('estado');
	}

	get mensajesList() {
		return document.getElementById(this.parentId);
	}

	get infos() { return this._infos }
	get errors() { return this._errors }
	get success() { return this._success }

	set infos(infos) { this._infos = infos }
	set errors(errors) { this._errors = errors }
	set success(success) { this._success = success }


	async refresh() {
		if (!this.mensajesList) return;
		else
			if (this.infos.length == 0 && this.errors.length == 0 && this.success.length == 0) this.mensajesList.innerHTML = '&nbsp;';
			else {
				console.log('MensajesView refresh')
				let lista = ''
				let infoList = ''
				this.infos.forEach(info => {
					infoList = infoList.concat(`<li class="info">${info}</li>`);
				});
				lista = lista.concat(infoList);
				let succList = ''
				this.success.forEach(succ => {
					succList = succList.concat(`<li class="ok">${succ}</li>`);
				});
				lista = lista.concat(succList);

				let errorList = ''
				this.errors.forEach(err => {
					errorList = errorList.concat(`<li class="error">${err}</li>`);
				});
				lista = lista.concat('</li>')
				lista = lista.concat(errorList);

				this.mensajesList.innerHTML = lista;
				mensajes.clear();
			}
	}
}