import '../sass/style.scss';
import SearchBar from './models/SearchBar';
import * as searchBarView from './views/searchBarView';
import {
  elements,
  renderLoader,
  clearLoader,
  setAlert,
  clearAlert
} from './views/base';

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
    searchBarView.clearResults();
    renderLoader(elements.searchResultList);
    // show results display
    elements.sectionSearchResult.style.display = 'block';

    try {
      // Search for events
      await state.search.getResults();
      clearLoader();
      searchBarView.renderResults(state.search.results.events);
      console.log(state);
    } catch (err) {
      //clear loader
      clearLoader();
      //hide results container
      elements.sectionSearchResult.style.display = 'none';
      //set error alert to user
      setAlert(
        elements.searchForm,
        'There are no results with this search... Please try a different search!',
        'danger'
      );
      setTimeout(() => {
        clearAlert();
      }, 1500);
    }
  }
};

// event listener for submit form
elements.searchForm.addEventListener('submit', searchControl);
