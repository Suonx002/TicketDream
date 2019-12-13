import { elements } from './base';

// Limit title
export const limitEventTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((prev, cur) => {
      if (prev + cur.length <= limit) {
        newTitle.push(cur);
      }
      return prev + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')} ...`;
  }

  return title;
};

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
        <span class="title text-center">${limitEventTitle(event.name)}</span>
        <span class="location text-center"
            >${event._embedded.venues[0].name} - ${
    event._embedded.venues[0].city.name
  } ${event._embedded.venues[0].state.stateCode}</span
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

//clear results
export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
};
