import { sendNewCardReq, sendGetAllCardsReq, sendDeleteCardReq, sendChangeCardReq } from "./api.js";
import '../functions/weak-cache.js';
import ModalConfirm from "../classes/ModalConfirm.js";
import ModalLogin from "../classes/ModalLogin.js";
import VisitCard from "../classes/VisitCard.js";
import ModalEdit from "../classes/ModalEdit.js";
import ModalVisit from "../classes/ModalVisit.js";


const loginBlock = document.querySelector('.header__login-wrapper');
const loginButton = loginBlock.querySelector('.header__login');

const visitBlock = document.querySelector('.header__visit-wrapper');
const vistiButton = visitBlock.querySelector('.header__addCard');
const logoutButton = visitBlock.querySelector('.header__logout');

const cardBox = document.querySelector('.cards-box');
const noItemsMessage = document.querySelector('.no-items');

const filterStatus = document.querySelector('.filter__status-value');
const filterPriority = document.querySelector('.filter__priority-value');
const filterDescription = document.querySelector('.description__input');

const app = {
  _token: null,
  cards: [],
  elements: {
    loginBlock,
    visitBlock,
    cardBox,
    noItemsMessage
  },

  set token(tkn) {
    if (!tkn) tkn = null;
    this._token = tkn;
    if (tkn === null) {
      loginBlock.classList.remove('invisible');
      visitBlock.classList.add('invisible');
      localStorage.removeItem('token');
      this.cards = [];
    } else {
      loginBlock.classList.add('invisible');
      visitBlock.classList.remove('invisible');
      localStorage.setItem('token', tkn);
    }
    this.getCards();
  },
  get token() {
    return this._token;
  },

  async getCards() {
    if (this.token) {
      const response = await sendGetAllCardsReq();

      if (response) {
        this.cards = response;
      } else {
        this.cards = [];
      }
    }

    this.renderCards();
  },

  filterCards() {
    this.filtered = [];
    
    let fillteredArr = this.cards.filter(({status}) => {
      if (filterStatus.value === '*') return true
      if (filterStatus.value === '1') return status;
      if (filterStatus.value === '0') return !status;
    })

    fillteredArr = fillteredArr.filter(({urgency}) => urgency.includes(filterPriority.value));
    
    fillteredArr = fillteredArr.filter(e => {
      let match = false;
      for (const [prop, val] of Object.entries(e)) {
        if (prop === 'id' || prop === 'status') continue;

        if (String(val).toLowerCase().includes(filterDescription.value.trim().toLowerCase())) match = true;
      }
      return match;
    })
    
    return fillteredArr;
  },

  renderCards() {
    cardBox.innerHTML = '';
    const cards = this.filterCards();
    cards.forEach(body => {
      const card = new VisitCard(body, this.showEdit.bind(this), this.removeCard.bind(this), this.editCard.bind(this));
      cardBox.append(card.render());
    })
    cards.length === 0 ? cardBox.append(noItemsMessage) : noItemsMessage.remove();
  },

  async removeCard(id) {
    const result = await sendDeleteCardReq(id);
    if (result) {
      this.cards = this.cards.filter(e => e.id !== id);
      this.renderCards();
      return result;
    }
  },

  async showEdit (body) {
    const modalEdit = new ModalEdit(this.editCard.bind(this), body);
    document.body.append(modalEdit.render());
  },

  async editCard(id, body) {
    const result = await sendChangeCardReq(id, body);
    if (result) this.renderCards();
    return result;
  }
}

filterStatus.addEventListener('change', () => app.renderCards());
filterPriority.addEventListener('change', () => app.renderCards());
filterDescription.addEventListener('change', () => app.renderCards());

vistiButton.addEventListener('click', () => {
  const modalVisit = new ModalVisit(async (body) => {
    const result = await sendNewCardReq(body);
    console.log(body);
    if (result) {
      app.cards.push(result);
      app.renderCards();
    }
  })
  document.body.append(modalVisit.render());
  vistiButton.blur();
});

logoutButton.addEventListener('click', () => {
  const modalConfirmExit = new ModalConfirm(() => {
    app.token = null;
    return true;
  }, 'Подтверждение выхода', 'Вы действительно хотите выйти?');
  document.body.append(modalConfirmExit.render());
  logoutButton.blur();
});

loginButton.addEventListener('click', () => {
  const modalLogin = new ModalLogin((token) => {
    app.token = token;
    return true;
  });
  document.body.append(modalLogin.render());
  loginButton.blur();
});

export default app;