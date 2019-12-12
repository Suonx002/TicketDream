import { elements } from './base';

//get input from form
export const getInput = () => {
  return {
    searchInput: elements.searchInput.value,
    cityInput: elements.cityInput.value
  };
};

//clear input
export const clearInput = () => {
  elements.searchInput.value = '';
  elements.cityInput.value = '';
};

// render a single data
const renderResult = event => {
  const markup = `
    <li class="search-item my-1 bg-primary-light">
        <a href="#${event.id}" class="light-text">
        <span class="title text-center">${event.name}</span>
        <span class="location text-center"
            >${event._embedded.venues[0].name} - ${event._embedded.venues[0].city.name} ${event._embedded.venues[0].state.stateCode}</span
        >
        </a>
    </li>
    `;

  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = events => {
  //   console.log(events);
  events.forEach(event => renderResult(event));
};
