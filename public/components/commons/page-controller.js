class PageController extends Controller {
	constructor(model) { super(model); }
	getParam(key) {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has(key)) return searchParams.get(key);
		else return undefined;
	}
	async refresh(url) { await this.view.refresh(url); }
}