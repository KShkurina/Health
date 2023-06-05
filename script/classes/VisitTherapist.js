import Visit from './Visit.js';

export default class VisitTherapist extends Visit {
    constructor() {
        super();
        this.inputAge = document.createElement('input');
        this.inputAdditionalComments = document.createElement('input');
    }
    
    createElements() {
        super.createElements();
        this.inputAge.setAttribute('name', 'age');
        this.inputAge.classList.add('doctor__input')     
        this.inputAge.required = true;
        this.inputAge.placeholder = 'Возраст';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputAge);

        this.inputAdditionalComments.classList.add('doctor__input'); 
        this.inputAdditionalComments.placeholder = 'Комментарии';
        this.inputAdditionalComments.name = 'comments';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputAdditionalComments);
    }    
}