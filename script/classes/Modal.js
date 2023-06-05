export default class Modal {
  constructor(fn) {
    this.fn = fn;
    this.modalWindow = document.createElement('div');
    this.background = document.createElement('div');
    this.modalContainer = document.createElement('div');
    this.closeButton = document.createElement('button');
    this.contentWrapper = document.createElement('div');
    this.buttonWrapper = document.createElement('div');
    this.buttonOk = document.createElement('button');
    this.buttonCancel = document.createElement('button');
    this.errorMessage = document.createElement('div');
  }

  createElements () {

    this.modalWindow.classList.add('modal');
    this.background.classList.add('modal__background');
    this.modalContainer.classList.add('modal__container');
    this.closeButton.classList.add('modal__close');
    this.contentWrapper.classList.add('modal__content-wrapper');
    this.buttonWrapper.classList.add('modal__button-wrapper');
    this.errorMessage.classList.add('modal__error');
    this.closeButton.innerHTML = '✖';

    this.buttonOk.innerHTML = 'OK';
    this.buttonOk.classList.add('modal__btn-ok');
    this.buttonOk.addEventListener('click', async () => {
      if (this.fn instanceof Function) {
        if (await this.fn()) this.closeWindow();
      };
    });

    this.buttonCancel.innerHTML = 'Cancel';
    this.buttonCancel.classList.add('modal__btn-cancel');
    this.buttonCancel.addEventListener('click', () => this.closeWindow());

    this.closeButton.addEventListener('click', () => this.closeWindow());
    this.background.addEventListener('click', () => this.closeWindow());

    this.modalContainer.append(this.closeButton);
    this.modalContainer.append(this.contentWrapper);
    this.contentWrapper.append(this.errorMessage);
    this.modalContainer.append(this.buttonWrapper);
    this.modalWindow.append(this.background);
    this.modalWindow.append(this.modalContainer);
    this.buttonWrapper.append(this.buttonOk);
    this.buttonWrapper.append(this.buttonCancel);
  }

  closeWindow () {
    this.modalWindow.remove();
  }

  render () {
    this.createElements();
    return this.modalWindow
  }
}