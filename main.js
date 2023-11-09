let data = null;

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

    // Data source is in order from oldest to newest, so looping from back orders them from newest to oldest naturally.
    for (let i = data.length - 1; i >= 0; i--) {
        const obj = data[i];
            const newCard = document.createElement('event-card');
            newCard.data = obj;
            gridWrapper.appendChild(newCard);
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
        let days = this.formatDate(event);


        // TODO finish fixing text styling areas
        this.innerHTML = `
            <div style="--area:image" class="event-image-container" title="View Enlarged Image">
                <a data-fancybox="gallery" href="${event.image}" data-caption="${event.event} - ${event.track}">
                    <img class="event-image" src="${event.image}" alt="Image Not Available">
                    <i class="fa-solid fa-maximize image-enlarge-icon"></i>
                </a>
            </div>
            <div style="--area:date; background-color: #3b75a3; color:#d3e0ea;" class="center-content">${days}</div>
            <div style="--area:learn;" class="center-content">
                <a href="${event.url}" style="color: var(--sponsor-color)" target="_blank">Learn More</a>
            </div>
            <div style="--area:title; justify-content:start;" class="center-content">
                <h3 class="event-content-title">${event.event}</h3>
            </div>
            <div style="--area:location; justify-content:start;" class="location-sponsor-area">
                <i class="fa-solid fa-flag flag-icon"></i>
                <span class="location-text">${event.track} | ${event.city}, ${event.state}</span>
            </div>
            <div style="--area:sponsor; justify-content:start; margin-left: -4px;" class="location-sponsor-area">
                <br><i class="fa-solid fa-star star-icon"></i>
                <span class="sponsor-text">Sponsored by ${event.sponsor}</span>
            </div>
      `;
    };


    formatDate(event) {
        const monthAbbreviations = {
            'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun',
            'July': 'Jul', 'August': 'Aug', 'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
        };

        const months = Object.keys(monthAbbreviations);
        let formattedDate;
        
        if (typeof event.days === 'number') {
          formattedDate = `${monthAbbreviations[event.month]} ${String(event.days).padStart(2, '0')}`;
        } else if (typeof event.days === 'string') {
          const dayRanges = event.days.split(',').map(day => day.trim());
          const startDay = dayRanges[0];
          const endDay = dayRanges[dayRanges.length - 1];
      
          let startMonthAbbreviation = monthAbbreviations[event.month];
          let endMonthAbbreviation = startMonthAbbreviation;
          let endMonthName = event.month;
      
          if (parseInt(endDay, 10) < parseInt(startDay, 10)) {
            // Find the index of the current month
            const currentMonthIndex = months.indexOf(event.month);
            // Determine the index of the next month, wrapping around to 0 (January) if necessary
            const nextMonthIndex = (currentMonthIndex + 1) % 12;
            endMonthName = months[nextMonthIndex];
            endMonthAbbreviation = monthAbbreviations[endMonthName];
          }
      
          formattedDate = dayRanges.length === 1 ?
            `${startMonthAbbreviation} ${startDay.padStart(2, '0')}` :
            `${startMonthAbbreviation} ${startDay.padStart(2, '0')} - ${endMonthAbbreviation} ${endDay.padStart(2, '0')}`;
        } else {
          formattedDate = '';
        }
      
        return formattedDate;
      }
};

customElements.define('event-card', EventCard);

async function main() {
    await parseCSV();
    addEventCards();
};

main();
