export default class Links {
  constructor() {
    this.modules = document.querySelectorAll(".module");
    this.links = document.querySelectorAll(".card");
  }
  init() {
   this.modules[0].style.display = 'none';
   this.page = new URL(window.location.href).searchParams.get("page");
   if (this.page) {
   this.modules[this.page - 1].style.display = 'block';
   }
  }
}
