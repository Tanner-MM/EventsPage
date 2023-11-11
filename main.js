let data = null;

        async function fetchData() {
            try {
                const response = await fetch('https://script.googleusercontent.com/a/macros/methodmarketing.com/echo?user_content_key=6HXWWJMciygxYF-gdhC6ItO8PfPOIFGrMFifRqMEcMzYAFtVm_aaRyUxn9uj1EKmuucYSmf6v0wb4-Cn2dV6SC9RwcubFlM8OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAPY1aIDTUiUKsVyX9HkCx40Mkx709kY07Vfjz3uJKLFhEM6Xk8Uff7wDCYUGXK_p-_zDvXhzhCbSjW2wnMTYAtExg1Odw2HUHzGUKIZ4t1vjosPMwUW2ZBvgqoqzdX47oW2BVbTg3D9w&lib=MLq2BwXEAebxoa2Vf8AOXOVeIjcchuUYc');
                data = await response.json();
            } catch (error) {
                console.error(error);
            }
        };

        // async function fetchData() {
        //     fetch('https://script.googleusercontent.com/a/macros/methodmarketing.com/echo?user_content_key=6HXWWJMciygxYF-gdhC6ItO8PfPOIFGrMFifRqMEcMzYAFtVm_aaRyUxn9uj1EKmuucYSmf6v0wb4-Cn2dV6SC9RwcubFlM8OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAPY1aIDTUiUKsVyX9HkCx40Mkx709kY07Vfjz3uJKLFhEM6Xk8Uff7wDCYUGXK_p-_zDvXhzhCbSjW2wnMTYAtExg1Odw2HUHzGUKIZ4t1vjosPMwUW2ZBvgqoqzdX47oW2BVbTg3D9w&lib=MLq2BwXEAebxoa2Vf8AOXOVeIjcchuUYc')
        //         .then(response => data = await response.json())
        //         .then(json => data = json)
        //         .catch(error => {
        //             console.error(error);
        //         });
        // }


        function addEventCards() {
            const gridWrapper = document.getElementById('event-container-grid');

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
                let event = this._data;
                let days = this.formatDate(event);

                const contentString =
                    `
                <div style="--area:image" class="event-image-container" title="View Enlarged Image">
                    <a data-fancybox="gallery" href="${event.image}" data-caption="${event.event} - ${event.track}">
                        <img class="event-image" src="${event.image}" alt="Image Not Available">
                        <svg class="svg-size" version="1.0" xmlns="http://www.w3.org/2000/svg" width="272.000000pt" height="263.000000pt" viewBox="0 0 272.000000 263.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,263.000000) scale(0.100000,-0.100000)" fill="#4d4d4d" stroke="none"><path d="M50 1555 l0 -1005 1310 0 1310 0 0 1005 0 1005 -1310 0 -1310 0 0 -1005z m2515 0 l0 -890 -1205 0 -1205 0 -3 880 c-1 484 0 886 3 893 3 10 250 12 1207 10 l1203 -3 0 -890z" /><path d="M824 2076 c-17 -8 -43 -26 -56 -41 -99 -107 -24 -278 121 -277 92 1 157 59 167 148 14 124 -117 220 -232 170z" /><path d="M1667 1717 c-53 -78 -132 -196 -178 -262 -45 -66 -144 -213 -222 -328 -77 -114 -143 -210 -148 -212 -4 -3 -71 72 -147 167 -336 418 -373 463 -380 466 -6 2 -159 -155 -315 -324 l-46 -50 -1 -223 c-1 -123 1 -225 3 -227 5 -6 2248 -6 2254 -1 2 3 5 28 7 56 3 61 18 36 -323 516 -114 160 -249 350 -300 423 -51 72 -96 134 -101 137 -4 2 -50 -60 -103 -138z" /></g></svg>
                        <i class="fa-solid fa-maximize image-enlarge-icon"></i>
                    </a>
                </div>
                <div style="--area:date; background-color: #3b75a3; color:#d3e0ea;" class="center-content">${days}</div>
                <div style="--area:learn;" class="center-content">
                    <a href="${event.url}" style="color: var(--sponsor-color);" target="_blank">Learn More</a>
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
            `

                this.innerHTML = contentString;
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
            document.cookie = "name=value; SameSite=Strict";

            await fetchData();
            addEventCards();

            const allImages = document.querySelectorAll('.event-image');
            allImages.forEach(img => {
                img.addEventListener('error', function () {
                    this.style.display = 'none'; // Hide the img

                    const svgElement = this.nextElementSibling;
                    if (svgElement && svgElement.tagName === 'svg') {
                        svgElement.style.display = 'block';
                    }
                });
            });
        };

        main();