import VisitCard from '../../classes/VisitCard.js'

const filterStatus = document.getElementById('filter__status');
const filterPriority = document.getElementById('filter__priority');
const filterDescription = document.querySelector('.description__input');
const filterButton = document.querySelector('.filter__button');
const filterCheckbox = document.getElementById('filter__status')

filterButton.addEventListener('click', () => {
    document.querySelector('.cardsArea').innerHTML = null

    console.log(filterStatus.value);
    console.log(filterPriority.value);
    console.log(filterDescription.value);
    showMatchedCards()

})


async function showMatchedCards() {
    const cards = await storage.getCards()
    let card = await new VisitCard(cards);   
    if(cards.length<0){
        document.querySelector('.cardsArea').innerText = "No items have been added"
    }

    console.log(filterCheckbox.value);
   
     let filteredCards = cards.filter(function (card){
        return (
            (filterPriority.value === card.urgency || filterPriority.value === 'all') &&
             (filterDescription.value === card.description || filterDescription.value === '')&&
            (  filterCheckbox.value === card.status || filterCheckbox.value === 'all'  )
             );
     })
     console.log(filteredCards);
     filteredCards.forEach(element => {
        let card = new VisitCard(element);
    card.render();
    });
}

    

showMatchedCards()

export default {showMatchedCards}