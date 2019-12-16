import { elements } from './base';

// clear event
export const clearEvent = () => {
  elements.rightContainer.innerHTML = '';
};

//Event profile
const eventContent = detail => {
  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const dayOfWeek = new Date(detail.dates.start.localDate);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const localDate = detail.dates.start.localDate.split('-');
  const currentDay = localDate[2];
  const currentMonth = month[localDate[1] - 1];
  const currentYear = localDate[0];

  const localTime = detail.dates.start.localTime.split(':');
  const hours = localTime[0];
  const minutes = localTime[1];
  const seconds = localTime[2];
  let time = `${hours > 12 ? hours - 12 : hours}:${minutes}:${seconds} ${
    hours >= 12 ? 'PM' : 'AM'
  }`;

  return `
  <!-- event content -->    
  <div class="event-content">
      <!-- event profile -->
      <div class="event-profile">
          <img
              src="${detail.images[8].url}"
              alt="event pic"
              class="round-img"
          />
          <a href="${
            detail.url
          }" class="btn btn-primary my-2" target="_blank">See Tickets</a>
      </div>
      <!-- event detail -->
      <div class="event-detail ">
          <h3 class="title mb-2 text-center">${detail.name}</h3>
          <div class="event-detail-content">
              <p class="text-center">${detail._embedded.venues[0].name} - ${
    detail._embedded.venues[0].city.name
  } ${detail._embedded.venues[0].state.stateCode}</p>
              <p class="text-center mt-1">
                  <span class="mx-1"> ${currentMonth} ${currentDay}, ${currentYear} </span>
                  <span class="mx-1"> ${
                    day[dayOfWeek.getDay() + 1]
                  }, ${time}</span>
              </p>
          </div>
          <!-- event info -->
          <div class="event-info">
              <h4 class="text-center my-2">Event Information</h4>
              <p class="description-info">
              ${detail.info ? detail.info : 'N/A'}
              </p>
          </div>
      </div>
  </div>
      `;
};

// artist lineup
const artistsProfile = artists => {
  let markup = '';
  artists.forEach(artist => {
    markup += `
            <div class="artist-item ">
                <img
                src="${artist.images[8].url}"
                alt="${artist.name}"
                class="round-img"
                />
                <p class="artist-name my-2">${artist.name}</p>
                <a href="${artist.url}" class="btn btn-primary mb-2" target="_blank">More</a>
            </div>
        `;
  });
  return markup;
};

const artistLineUp = artists => `
    <!-- artist lineup -->
        <div class="artist-lineup">
            <h4 class="text-center">Line Up</h4>
            <div class="artist-collections">
                  ${artistsProfile(artists)}
            </div>
        </div>
`;

//venue details
const venueDetail = venue => {
  if (venue.boxOfficeInfo) {
    return `
        <!-- Venue Details -->
        <div class="venue-detail">
            <h4 class="text-center">Venue Detail</h4>
            <div class="venue-collections">

                <div class="venue-item ">
                  <i class="far fa-building"></i> Box Office Hours
                  <span class="box-office my-1"> ${
                    venue.boxOfficeInfo.openHoursDetail
                      ? venue.boxOfficeInfo.openHoursDetail
                      : ''
                  }</span>
                </div>

                <div class="venue-item ">
                  <i class="fas fa-phone"></i> Phone Number
                  <span class="box-office my-1"> ${
                    venue.boxOfficeInfo.phoneNumberDetail
                      ? venue.boxOfficeInfo.phoneNumberDetail
                      : ''
                  } </span>
                </div>

                <div class="venue-item ">
                  <i class="fas fa-parking"></i> Parking
                  <span class="parking my-1">${
                    venue.parkingDetail ? venue.parkingDetail : ''
                  }</span>
                </div>

                <div class="venue-item ">
                  <i class="far fa-credit-card"></i> Payment Accepted
                  <span class="parking my-1">
                    ${
                      venue.boxOfficeInfo.acceptedPaymentDetail
                        ? venue.boxOfficeInfo.acceptedPaymentDetail
                        : ''
                    }
                  </span>
                </div>

                <div class="venue-item ">
                  <i class="fas fa-phone-volume"></i> Will Call
                  <span class="will-call my-1">
                    ${
                      venue.boxOfficeInfo.willCallDetail
                        ? venue.boxOfficeInfo.willCallDetail
                        : ''
                    }
                  </span>
                </div>

                <div class="venue-item ">
                  <i class="far fa-sticky-note"></i> General Rule
                  <span class="general-rule my-1">
                    ${
                      venue.generalInfo.generalRule
                        ? venue.generalInfo.generalRule
                        : ''
                    }
                  </span>
                </div>

            </div>
        </div>
`;
  } else {
    return '';
  }
};

export const renderDetail = detail => {
  const profile = eventContent(detail);
  const artist = artistLineUp(detail._embedded.attractions);
  const venue = venueDetail(detail._embedded.venues[0]);

  const markup = `
  ${profile}
  ${artist}
  ${venue}
 
  `;
  elements.rightContainer.insertAdjacentHTML('beforeend', markup);
};
