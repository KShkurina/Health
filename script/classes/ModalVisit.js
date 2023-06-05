import Modal from './Modal.js';
import VisitDentist from './VisitDentist.js';
import VisitTherapist from './VisitTherapist.js';
import VisitCardiologist from './VisitCardiologist.js';
import locale from '../functions/locale.js';

export default class ModalVisit extends Modal {
  constructor(handler) {
    super();
    this.fn = async () => {
      console.log(this.getInputsValues())
      if (this.getInputsValues()) {
        await handler(this.getInputsValues());
        return true;
      }
    };
    this.selectionList = document.createElement('div');
    this.doctorContainer = document.createElement('div');
  }

  createElements() {
    super.createElements();
    this.selectionList.innerHTML = `
      <h3 class="doctors__title">${locale['Choose a doctor']}</h3>
      <select class="doctors__list">
        <option selected  disabled>${locale['Choose a doctor']}</option>
        <option name="dentist" value="Dentist">${locale['Dentist']}</option>
        <option name="cardiologist" value="Cardiologist">${locale['Cardiologist']}</option>
        <option name="therapist" value="Therapist">${locale['Therapist']}</option>
      </select>
    `;

    this.selectionList.classList.add('doctors');
    this.doctorContainer.classList.add('doctor-box');
    this.modalContainer.prepend(this.doctorContainer);
    this.modalContainer.prepend(this.selectionList);
    this.select = this.modalContainer.querySelector('.doctors__list');
    this.select.addEventListener('change', this.showForm.bind(this));
  }

  clearDoctorContainer() {
    this.doctorContainer.innerHTML = '';
  }

  showForm() {
    const selectedDoctor = this.select.options[this.select.selectedIndex].value;
    this.clearDoctorContainer();
    if (selectedDoctor === 'Dentist') {
      const dentist = new VisitDentist().render();
      this.doctorContainer.append(dentist);
    } else if (selectedDoctor === 'Cardiologist') {
      const cardiologist = new VisitCardiologist().render();
      this.doctorContainer.append(cardiologist);
    } else if (selectedDoctor === 'Therapist') {
      const therapist = new VisitTherapist().render();
      this.doctorContainer.append(therapist);
    }
  }

  getInputsValues() {
    const urgencySelector = this.doctorContainer.querySelector('select');
    if (!urgencySelector) return;
    
    const values = { 
      status: false,
      urgency: urgencySelector.value,
      doctor: this.select.value
    };
    
    const inputs = this.doctorContainer.querySelectorAll('input');

    let isValid = true;
    inputs.forEach(e => {
      const {name, value, required} = e;
      if (!value.trim() && required) {
        isValid = false
      } else {
        if (value) values[name] = value;
      }
    });

    if (isValid) {
      this.closeWindow();
      return values;
    }

    this.errorMessage.innerText = 'Неправильный ввод';
  }
}