const INFOS = 'INFOS';
const ERRORS = 'ERRORS';
const SUCCESS = 'SUCCESS'

class MensajesController extends Controller {

	constructor(model) {
		super(model);
		this.view = new MensajesView();
		// this.clear();
	}

	async clear() {
		console.log('Clear', this.model);
		this.model.clear();
	}

	get infos() {
		let infosStr = this.model.getItem(INFOS);
		if (!infosStr) {
			this.infos = [];
			infosStr = this.model.getItem(INFOS);
		}
		return JSON.parse(infosStr);
	}

	set infos(infos) {
		if (!infos) this.model.removeItem(INFOS);
		else this.model.setItem(INFOS, JSON.stringify(infos));
	}

	get errors() {
		let errsStr = this.model.getItem(ERRORS);
		if (!errsStr) {
			this.errors = [];
			errsStr = this.model.getItem(ERRORS);
		}
		return JSON.parse(errsStr);
	}

	set errors(errs) {
		if (!errs) this.model.removeItem(ERRORS);
		else this.model.setItem(ERRORS, JSON.stringify(errs));
	}

	get success() {
		let str = this.model.getItem(SUCCESS);
		if (!str) {
			this.success = [];
			str = this.model.getItem(SUCCESS);
		}
		return JSON.parse(str);
	}

	set success(succs) {
		if (!succs) this.model.removeItem(SUCCESS);
		else this.model.setItem(SUCCESS, JSON.stringify(succs));
	}

	async agregarInfo(info) {
		let infos = this.infos;
		infos.push(info);
		this.infos = infos;
	}

	async agregarError(err) {
		let errs = this.errors;
		errs.push(err);
		this.errors = errs;
	}

	async agregarSuccces(succ) {
		let succs = this.success;
		succs.push(succ);
		this.success = succs;
	}

	async refresh() {
		this.view.infos = this.infos;
		this.view.errors = this.errors;
		this.view.success = this.success;
		await super.refresh();
	}

}