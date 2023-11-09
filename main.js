let data = null;
const starSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path class="star-icon" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>';
const flagSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path class="flag-icon" d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>';


async function parseCSV() {
    try {
        const url = "https://script.googleusercontent.com/a/macros/methodmarketing.com/echo?user_content_key=6HXWWJMciygxYF-gdhC6ItO8PfPOIFGrMFifRqMEcMzYAFtVm_aaRyUxn9uj1EKmuucYSmf6v0wb4-Cn2dV6SC9RwcubFlM8OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAPY1aIDTUiUKsVyX9HkCx40Mkx709kY07Vfjz3uJKLFhEM6Xk8Uff7wDCYUGXK_p-_zDvXhzhCbSjW2wnMTYAtExg1Odw2HUHzGUKIZ4t1vjosPMwUW2ZBvgqoqzdX47oW2BVbTg3D9w&lib=MLq2BwXEAebxoa2Vf8AOXOVeIjcchuUYc";
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        data = await response.json();
    } catch (error) {
        console.error(error);
    }
};

// This function could be triggered when data is fetched or when you need to add cards
function addEventCards() {
    const gridWrapper = document.getElementById('event-container-grid');

    let count = 0;

    for (let i = data.length - 1; i >= 0; i--) {
        const obj = data[i];
            if (count < 16) {
            const newCard = document.createElement('event-card');
            newCard.data = obj;
            newCard.classList.add('item');
            gridWrapper.appendChild(newCard);
            }
            count++;
    }
    
};

class EventCard extends HTMLElement {
    constructor() {
        super();
        this._data = {};
    };
    
    set data(obj) {
        this._data = obj;
        this.render();
    };

    get data() {
        return this._data;
    };

    render() {
        let event = this.data;
        // let days = this.formatDate();


        // TODO finish fixing text styling areas
        this.innerHTML = `
            <div  style="--area:image">
                <img class="event-image" src="${event.image}" alt="Image Not Available">
            </div>
            <div style="--area:date" class="center-content">${event.month} ${event.days}</div>
            <div style="--area:learn;" class="center-content">
                <a href="${event.url}" style="color: var(--sponsor-color)">Learn More</a>
            </div>
            <div style="--area:title;justify-content:start;" class="center-content">
                <h3>${event.event}</h3>
            </div>
            <div style="--area:location; justify-content:start;" class="center-content">
                ${flagSVG}
                <span class="location-text">${event.track} | ${event.city}, ${event.state}</span>
            </div>
            <div style="--area:sponsor; justify-content:start;" class="center-content">
                <br>${starSVG}
                <span class="sponsor-text">Sponsored by ${event.sponsor}</span>
            </div>
      `;
    };

    formatDate() {
        let days;
        if (typeof this.data.days === 'number') {
          days = String(this.data.days).padStart(2, '0');
        } else if (typeof this.data.days === 'string') {
          const dayArray = this.data.days.split(',').map(day => day.trim());
      
          if (dayArray.length === 1) {
            days = String(dayArray[0]).padStart(2, '0');
          } else {
            days = `(${dayArray[0].padStart(2, '0')}-${dayArray[dayArray.length - 1].padStart(2, '0')})`;
          }
        } else {
          days = '';
        }
        return days;
      }
      
};
customElements.define('event-card', EventCard);

async function main() {
    await parseCSV();
    addEventCards();
}

main();
