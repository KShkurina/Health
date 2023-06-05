import Modal from "./Modal.js";
import locale from "../functions/locale.js";
import { getTokenReq } from "../api/api.js";

export default class ModalLogin extends Modal {
  constructor(authFn) {
    super()
    this.emailContainer = document.createElement('div');
    this.passwordContainer = document.createElement('div');
    this.emailContainer.innerHTML = `<label>${locale['email']}: <input placeholder="waaagh@gmail.com"></label>`;
    this.passwordContainer.innerHTML = `<label>${locale['password']}: <input placeholder="123"></label>`;
    this.emailInput = this.emailContainer.querySelector('input');
    this.passwordInput = this.passwordContainer.querySelector('input');
    this.fn = async () => {
      const result = await this.authorize();
      if (result) {
        authFn(result);
        return true;
      }
    }
  }

  createElements() {
    super.createElements();
    this.contentWrapper.classList.add('login-form');
    this.contentWrapper.append(this.emailContainer);
    this.contentWrapper.append(this.passwordContainer);
    this.contentWrapper.append(this.errorMessage);
  }

  async authorize() {
    const { validate, errorMessage, emailInput: { value: email }, passwordInput: { value: password } } = this;
    if (!validate.apply(this)) {
      errorMessage.innerText = locale['loginMissingText'];
      return false;
    }

    const response = await getTokenReq(email, password);
    if (response) {
      return response;
    };

    errorMessage.innerText = locale['wrongEmailPassword']
  }

  validate() {
    const { emailInput: { value: email }, passwordInput: { value: password } } = this;
    if (email.trim() && password.trim()) return true;
    return false;
  }

  render() {
    return super.render();
  }

}