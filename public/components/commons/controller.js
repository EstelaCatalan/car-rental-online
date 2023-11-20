class Controller {
  model;
  view;
  constructor(model) { this.model = model; }
  async refresh() { await this.view.refresh(); }
}