import '../sass/style.scss';
import SearchBar from './models/SearchBar';
import * as searchBarView from './views/searchBarView';
import { elements, renderLoader, clearLoader } from './views/base';

// state
const state = {};

/** SEARCH CONTROLLER **/
const searchControl = async e => {
  //prevent form
  e.preventDefault();

  //get search and city input from view
  const { searchInput, cityInput } = searchBarView.getInput();

  if (searchInput !== '' || cityInput !== '') {
    // create new search object and add to state
    state.search = new SearchBar(searchInput, cityInput);

    // prepare UI for results
    searchBarView.clearInput();
    renderLoader(elements.searchResultList);

    try {
      // Search for events
      await state.search.getResults();
      clearLoader();
      searchBarView.renderResults(state.search.results.events);
      console.log(state);
    } catch (err) {
      console.error(err);
    }
  }
};

// event listener for submit form
elements.searchForm.addEventListener('submit', searchControl);
