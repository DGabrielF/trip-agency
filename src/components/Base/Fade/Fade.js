export class Fade {
  create() {
    this.fade = document.createElement("div");
    this.fade.classList.add("fade");
    this.fade.classList.add("hide");
    this.fade.style.zIndex = -1;
    this.fade.addEventListener("click", () => this.close())

    return this.fade;
  }

  update(closeFunction, zIndex) {
    this.closeFunction = closeFunction;
    this.fade.style.zIndex = zIndex;
  }

  open() {
    if (this.fade.classList.contains("hide")) {
      this.fade.classList.remove("hide");
    }
  }
  
  close() {
     if (!this.fade.classList.contains("hide")) {
      this.fade.classList.add("hide");
      this.fade.style.zIndex = -10;
      if (typeof this.closeFunction === "function") {
        this.closeFunction();
      }
    }
  }
}