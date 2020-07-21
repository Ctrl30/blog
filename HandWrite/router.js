
// history
class HistoryRouter {
  constructor() {
    this.routes = {};

    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    })
  }

  init(path) {
    history.replaceState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  route(path, fn) {
    this.routes[path] = fn || function() {};
  }

  go(path) {
    history.pushState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }
}

// hash
class HashRouter {
  constructor() {
    this.router = {};

    window.addEventListener('hashChange', e => {
      const tag = location.hash.slice(1);
      this.router[tag] && this.router[tag]();
    })
  }
  
  route(path, fn) {
    this.router[path] = fn;
  }
}

// test

const historyRouter = new HistoryRouter();
const changeColor = color => {
  document.body.style.background = color;
}

historyRouter.route('red', () => { changeColor('red') });

const hashRouter = new HashRouter();
const changeColor = color => {
  document.body.style.background = color;
}

hashRouter.route('red', () => { changeColor('red') });
