class View {
	parentId;
	viewId;
	constructor(parentId, viewId) {
		this.parentId = parentId;
		this.viewId = viewId;
	}
	async load() {
		if (!this.viewId) return '';
		let response = await fetch(`./components/${this.viewId}/${this.viewId}.html`);
		if (response.ok) return await response.text();
		else throw new Error(`Error ${response.status}: ${response.statusText}`);
	}
	get parent() { return document.getElementById(this.parentId); }
	set parentHTML(html) { this.parent.innerHTML = html; }
	async refresh() { this.parentHTML = await this.load(); }
}