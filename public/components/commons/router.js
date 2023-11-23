class Router {
  routers;
  controllers;

  constructor() {
    this.routers = [];
    this.controllers = [];
    this.init();
  }
  init() {
    window.addEventListener('popstate', () => {
      this.handleLocation();
    });
  }
  addRouter(router, controller) {
    this.routers.push(router);
    this.controllers.push(controller);
  }
  removeRouter(router) {
    let index = this.routers.indexOf(router);
    this.routers.splice(index, 1);
    this.controllers.splice(index, 1);
  }

get controller() {
 
  return null; }

  async route(event) {
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    this.handleLocation();
  }


  get localLocation() {
    let url = window.location.pathname;
    return url.concat(window.location.search.length > 1 ? window.location.search : '');
  }

  get controller() {
    
    let url = this.localLocation;
    let index = this.routers.findIndex((router) => router.test(url));
    
    if (index < 0) {
      console.error(`${url} not found`);
      url = '/not-found?url=' + encodeURIComponent(url);
      window.history.replaceState({}, '', url);
      index = 0;
    }
    console.log(this.controllers[index]);
    return this.controllers[index];
  }


  async handleLocation() {
    console.log('Refreshing controller', this.localLocation);
    await this.controller.refresh(this.localLocation);
  }

}

