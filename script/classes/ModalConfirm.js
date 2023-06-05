import Modal from './Modal.js';

export default class ModalConfirm extends Modal {
  constructor (fn, title, text) {
    super(fn);
    this.title = title;
    this.text = text;

    this.titleElement = document.createElement('h3');
    this.textElement = document.createElement('p');

    this.titleElement.innerText = title;
    this.textElement.innerText = text;

    this.contentWrapper.append(this.titleElement);
    this.contentWrapper.append(this.textElement);
  }
}