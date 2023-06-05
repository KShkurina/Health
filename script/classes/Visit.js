import locale from "../functions/locale.js";

export default class Visit {
    constructor() {
        this.doctorWrapper = document.createElement('div');
        this.inputPurpose = document.createElement('input');
        this.inputShortDescription = document.createElement('input');
        this.inputName = document.createElement('input');
        this.urgencyField = document.createElement('div');        
        this.select = document.createElement('select');
        this.select.name = 'urgency';  
        this.selectOption = `
        <option value = "normal">${locale['normal']}</option>
        <option value = "high">${locale['high']}</option>
        <option value = "low">${locale['low']}</option>`;
    }
    
    createElements() {
        this.doctorWrapper.classList.add('doctor');

        this.inputPurpose.classList.add('doctor__input');
        this.inputPurpose.required = true;
        this.inputPurpose.placeholder = 'Цель';
        this.inputPurpose.name = 'title';
        this.doctorWrapper.insertAdjacentElement('afterbegin', this.inputPurpose);

        this.inputShortDescription.classList.add('doctor__input');
        this.inputShortDescription.required = true;
        this.inputShortDescription.placeholder = 'Описание';
        this.inputShortDescription.name = 'description';
        this.doctorWrapper.insertAdjacentElement('afterbegin', this.inputShortDescription);

        this.inputName.classList.add('doctor__input');
        this.inputName.required = true;
        this.inputName.placeholder = 'Имя';
        this.inputName.name = 'client';
        this.doctorWrapper.insertAdjacentElement('afterbegin', this.inputName);

        this.select.innerHTML = this.selectOption;
        this.select.classList.add('doctor__input');
        this.urgencyField.innerHTML= '<p>Срочность</p>';
        this.urgencyField.className = 'doctor__urgency';
        
        this.urgencyField.append(this.select);
        this.doctorWrapper.insertAdjacentElement('afterbegin', this.urgencyField);
    }

    render() {
        this.createElements();
        return this.doctorWrapper;
    }
}