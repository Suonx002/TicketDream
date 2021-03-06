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

// Pagination
const createButton = (page, type) => `

    <button class="btn btn-light btn-pagination" data-goto=${
      type === 'left' ? page - 1 : page + 1
    }>
      <span>Page ${type === 'left' ? page - 1 : page + 1}</span>
    </button>

`;

const renderButtons = (page, numResults, resultPerPage) => {
  const pages = Math.ceil(numResults / resultPerPage);

  let button;
  if (page === 1 && pages > 1) {
    //button go to next page
    button = `
    <div></div> 
    ${createButton(page, 'right')}
    `;
  } else if (page < pages) {
    //both buttons
    button = `
   ${createButton(page, 'left')} 
   ${createButton(page, 'right')} 
    `;
  } else if (page === pages && pages > 1) {
    //button go back
    button = `
    
    ${createButton(page, 'left')}
     <div></div> 
    `;
  }

  elements.paginationButton.insertAdjacentHTML('afterbegin', button);
};

// render a single data
const renderResult = event => {
  const markup = `
    <li class="search-item my-1 bg-primary-light">
        <a href="#${event.id}" class="light-text search-item-link">
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

export const renderResults = (events, page = 1, resultPerPage = 7) => {
  //   console.log(events);
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage;
  events.slice(start, end).forEach(event => renderResult(event));

  //render pagination buttons
  if (events.length > 9) {
    renderButtons(page, events.length, resultPerPage);
  }
};

//clear results
export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.paginationButton.innerHTML = '';
};

// highlight selected
export const highLightSelected = id => {
  const resultArray = Array.from(
    document.querySelectorAll('.search-item-link')
  );
  resultArray.forEach(el => {
    el.classList.remove('search-item-link-active');
  });

  document
    .querySelector(`.search-item-link[href*="${id}"]`)
    .classList.add('search-item-link-active');
};
