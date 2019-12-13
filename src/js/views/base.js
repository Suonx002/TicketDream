import spinner from '../../assets/Spinner-Preloader.gif';

export const elements = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-input'),
  cityInput: document.querySelector('.city-input'),
  searchResultList: document.querySelector('.search-results'),
  sectionSearchResult: document.querySelector('.section-search-results'),
  paginationButton: document.querySelector('.pagination-btn')
};

export const renderLoader = parent => {
  const loader = `
        <div class="loader">
            <img src="${spinner}" alt="preloader" class="spinner-img"/>
        </div>
    `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.parentElement.removeChild(loader);
};

export const setAlert = (parent, msg, type) => {
  const alert = `
    <div class="alert alert-${type}">${msg}</div>
  `;
  parent.insertAdjacentHTML('beforebegin', alert);
};

export const clearAlert = () => {
  const alert = document.querySelector('.alert');

  if (alert) alert.parentElement.removeChild(alert);
};
