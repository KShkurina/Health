import Visit from './Visit.js';

export default class VisitCardiologist extends Visit {
    constructor() {
        super();
        this.inputAge = document.createElement('input');
        this.inputPressure = document.createElement('input');
        this.inputBMI = document.createElement('input');
        this.inputDisease = document.createElement('input');
        this.inputAdditionalComments = document.createElement('input');
    } 
     
    createElements() {
        super.createElements();

        this.inputAge.setAttribute('name', 'age');
        this.inputPressure.setAttribute('name', 'bp');
        this.inputBMI.setAttribute('name', 'bmi');
        this.inputDisease.setAttribute('name', 'disease');
        this.inputAdditionalComments.setAttribute('name', 'comments');

        this.inputAge.classList.add('doctor__input')      
        this.inputAge.required = true;
        this.inputAge.placeholder = 'Возраст';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputAge);

        this.inputPressure.classList.add('doctor__input');
        this.inputPressure.required = true;
        this.inputPressure.placeholder = 'Кровяное давление';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputPressure);

        this.inputBMI.classList.add('doctor__input'); 
        this.inputBMI.required = true;
        this.inputBMI.placeholder = 'ИМТ'
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputBMI);

        this.inputDisease.classList.add('doctor__input'); 
        this.inputDisease.required = true;
        this.inputDisease.placeholder = 'Заболевания';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputDisease);

        this.inputAdditionalComments.classList.add('doctor__input'); 
        this.inputAdditionalComments.placeholder = 'Комментарии';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputAdditionalComments);
    }    
} 



















