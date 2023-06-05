import locale from '../functions/locale.js';
import ModalConfirm from './ModalConfirm.js';

export default class VisitCard {
  constructor(body, editFn, removeFn, switchStatusFn) {
    this.body = body;
    this.id = body.id;
    this.editFn = editFn;
    this.removeFn = removeFn;
    this.switchStatusFn = switchStatusFn;

    const expandStatus = window.weakCache?.isExpandWhenRedraw.get(this.body);
    this.isExpand = expandStatus ? true : false;

    this.excludeFields = ['name', 'doctor', 'id', 'status', 'urgency'];

    this.container = document.createElement('div');
    
    this.redraw()
  }

  redraw() {
    this.container.className = 'card';
    this.container.innerHTML = `
      <div class="card__info">
        <div class="card__box-change-btn">
            <button class="card__change-btn card-edit"><img src="./img/pencil.png" alt="edit"></button>
            <button class="card__change-btn card-remove">✖</button>
        </div>
        <label>${locale['Visit done']}: <input type="checkbox" class="card__status" ${this.body.status ? "checked" : ""}></label>
        <p>${this.body.client}</p>
        <p>${locale[this.body.doctor]}</p=>
        <div class="card__info-more ${!this.isExpand ? "invisible" : ""}">
        </div>
        <button class="card__show-btn card__show-btn-more">${this.isExpand ? locale['Show less'] : locale['Show more']}</button>
      </div>
    `
    this.moreContainer = this.container.querySelector('.card__info-more');
    this.moreContainer.innerHTML = `<p>${locale['urgency']} : ${locale[this.body.urgency]}</p>`
    for (const [prop, val] of Object.entries(this.body)) {
      if (!this.excludeFields.includes(prop)) {
        this.moreContainer.innerHTML += `<p>${locale[prop]}: ${val}</p>`;
      }
    }

    this.container.querySelector('.card-edit').addEventListener('click', () => {
      this.editFn(this.body);
    });

    this.container.querySelector('.card-remove').addEventListener('click', async () => {
      const modalConfirmDelete = new ModalConfirm (this.removeSelf.bind(this), 'Подтверждение', 'Вы действительно хотите удалить карточку?');
      document.body.append(modalConfirmDelete.render());
    });

    this.container.querySelector('.card__status').addEventListener('change', async (evt) => {
      this.body.status = evt.target.checked;
      const result = await this.switchStatusFn(this.body.id, this.body);
      if (result) evt.target.checked = this.body.status;
    })

    this.container.querySelector('.card__show-btn').addEventListener('click', this.showMore.bind(this));
  }

  showMore(evt) {
    if (!this.isExpand) {
      this.isExpand = true;
      this.moreContainer.classList.remove('invisible');
      evt.currentTarget.innerText = locale['Show less'];
    } else {
      this.isExpand = false;
      this.moreContainer.classList.add('invisible');
      evt.currentTarget.innerText = locale['Show more'];
    }
    if (window.weakCache?.isExpandWhenRedraw) window?.weakCache.isExpandWhenRedraw.set(this.body, this.isExpand);
  }

  render() {
    return this.container;
  }

  async removeSelf() {
    const result = await this.removeFn(this.body.id);

    if (result) {
      this.vanish();
      return true;
    };
  }

  vanish() {
    this.container.remove();
  }
}