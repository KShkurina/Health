import locale from '../functions/locale.js';
import Modal from './Modal.js';

class ModalEdit extends Modal {
  constructor(handler, body) {
    super();
    this.body = body;
    this.fn = async () => {
      const validBody = this.validate();
      if (validBody) {
        const result = await handler(this.body.id, validBody);
        if (result) this.closeWindow();
      }
    };
    for (const [prop, val] of Object.entries(body)) {
      if (['doctor', 'id', 'status', 'urgency'].includes(prop)) continue;
      this.contentWrapper.innerHTML += `<label>${locale[prop]}: <input name="${prop}" value="${val}"></label>`;
    }

    const urgencyLabel = document.createElement('label');
    urgencyLabel.innerText = `${locale['urgency']}: `;
    const urgencySelector = document.createElement('select');
    urgencySelector.name = 'urgency';
    urgencySelector.innerHTML = `        
      <option value = "normal">${locale['normal']}</option>
      <option value = "high">${locale['high']}</option>
      <option value = "low">${locale['low']}</option>)`;
    urgencySelector.value = body.urgency;
    urgencyLabel.append(urgencySelector);
    this.contentWrapper.append(urgencyLabel);

    this.contentWrapper.insertAdjacentHTML('beforeend', 
      `<label>${locale['Visit done']}: <input name="status" type="checkbox" class="card__status" ${this.body.status ? "checked" : ""}></label>`);
  }

  validate() {
    const inputs = this.contentWrapper.querySelectorAll('input');
    const result = {};

    let isValid = true;
    inputs.forEach(({name, value, type, checked}) => {
      if (value.trim() && type !== 'checkbox') {
        result[name] = value
      } else if (name && type === 'checkbox') {
        result[name] = checked;
      } else {
        isValid = false
      }
    });
    if (!isValid) {
      this.errorMessage.innerText = 'Неправильный ввод';
      return; 
    };

    for (const [prop, val] of Object.entries(result)) {
      this.body[prop] = val;
    }

    return this.body;
  }
}

export default ModalEdit;