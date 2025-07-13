export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.firstChild.textContent.trim(),
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job, avatar }) {
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
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }
}
