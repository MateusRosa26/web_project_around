export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.firstChild.textContent.trim(),
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    if (name) {
      const nameTextNode = document.createTextNode(name);
      this._nameElement.replaceChild(
        nameTextNode,
        this._nameElement.firstChild
      );
    }
    if (job) {
      this._jobElement.textContent = job;
    }
  }
}
