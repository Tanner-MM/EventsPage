class EventCard extends HTMLElement {
    constructor() {
        super(); // Always call super first in the constructor
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="event-card">
          <h2>Event Title</h2>
          <p>Event description...</p>
          <!-- Add more structure as needed -->
        </div>
      `;
    }
}
customElements.define('event-card', EventCard);


// This function could be triggered when data is fetched or when you need to add cards
function addEventCards(numberOfCards) {
    const gridWrapper = document.querySelector('.grid');
  
    for (let i = 0; i < numberOfCards; i++) {
      const newCard = document.createElement('event-card'); // Creates a new instance of EventCard
      newCard.classList.add('item');
      gridWrapper.appendChild(newCard); // Appends the new EventCard to the grid wrapper
    }
  }
  
  // Example usage: Add 10 event cards
  addEventCards(13);
  