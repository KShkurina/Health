import Visit from './Visit.js';

export default class VisitDentist extends Visit {
    constructor() {
        super();
        this.inputDate = document.createElement('input');
        this.inputAdditionalComments = document.createElement('input');        
    }
    
    createElements() { 
        super.createElements();
        this.inputDate.setAttribute('name', 'data');
        this.inputDate.classList.add('doctor__input');       
        this.inputDate.required = true;
        this.inputDate.placeholder = 'Дата последнего визита';
        this.inputDate.name = 'lastVisit';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputDate);

        this.inputAdditionalComments.classList.add('doctor__input'); 
        this.inputAdditionalComments.placeholder = 'Комментарии';
        this.inputAdditionalComments.name = 'comments';
        this.doctorWrapper.insertAdjacentElement('beforeend', this.inputAdditionalComments);
    }    
}