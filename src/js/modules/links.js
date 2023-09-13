export default class Links {
  constructor() {
    this.modules = document.querySelectorAll(".module");
    this.links = document.querySelectorAll(".card");
  }
  init() {
    this.links.forEach((item) => {
      for (let i = 0; i < this.modules.length; i++) {
        item.location.hash = this.modules[i].id;
      }
    });
  }
}
