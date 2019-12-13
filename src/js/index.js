import '../sass/style.scss';
import SearchBar from './models/SearchBar';
import SearchDetail from './models/SearchDetail';
import * as searchBarView from './views/searchBarView';
import * as searchDetailView from './views/searchDetailView';
import {
  elements,
  renderLoader,
  clearLoader,
  setAlert,
  clearAlert
} from './views/base';

// state
const state = {};

/*** 
SEARCH CONTROLLER 
***/
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
      // console.log(state);
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

// pagination button go to
elements.paginationButton.addEventListener('click', e => {
  // console.log(e.target.closest('.btn-pagination'));
  const btn = e.target.closest('.btn-pagination');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchBarView.clearResults();
    searchBarView.renderResults(state.search.results.events, goToPage);
  }
});

/*** 
SEARCH DETAIL CONTROLLER 
***/

const controlSearchDetail = async () => {
  const id = window.location.hash.replace('#', '');

  if (id) {
    elements.sectionSearchResult.style.display = 'block';

    //prepare for UI changes
    searchDetailView.clearEvent();
    renderLoader(elements.rightContainer);

    //get search detail for each event

    // highlight selected search item
    if (state.search) searchBarView.highLightSelected(`${id}`);

    // Create a new search detail object
    state.searchDetail = new SearchDetail(`${id}`);

    try {
      await state.searchDetail.getDetail();
      clearLoader();
      searchDetailView.renderDetail(state.searchDetail.detail);
    } catch (err) {
      //clear loader
      clearLoader();
      //hide results container
      elements.sectionSearchResult.style.display = 'none';
      //set error alert to user
      setAlert(
        elements.searchForm,
        'There are no results with this ID... Please try a different ID!',
        'danger'
      );
      setTimeout(() => {
        clearAlert();
      }, 1500);
      console.error(err);
    }
  }
  // console.log(state);
};

// listen for hash change and load
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlSearchDetail)
);
