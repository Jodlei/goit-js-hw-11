import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMurkup } from './js/createMarkup';
import { PixabayFetchApi } from './js/apiPixabay';

const pixabayFetchApi = new PixabayFetchApi();

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', doImageSearch);

function doImageSearch(e) {
  e.preventDefault();

  pixabayFetchApi.query = e.currentTarget.elements.searchQuery.value.trim();
  console.log(pixabayFetchApi.query);

  if (!pixabayFetchApi.query) {
    Notiflix.Notify.failure('Enter search word');
    return;
  }

  window.removeEventListener('scroll', onScroll);
  refs.gallery.innerHTML = '';

  pixabayFetchApi.resetPage();

  searchData();
}

function onScroll() {
  if (
    window.scrollY + window.innerHeight + 0.5 >=
    document.documentElement.scrollHeight
  ) {
    addImageScroll();
    return;
  }
}

async function searchData() {
  try {
    const data = await pixabayFetchApi.fetchImage();

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'We are sorry, but you have reached the end of search results.'
      );
    } else {
      createLists(data.hits);

      lightBox();

      checkAmountImages(data);

      window.addEventListener('scroll', onScroll);
    }
  } catch (error) {
    console.log(error);
  }
}

async function addImageScroll() {
  try {
    const data = await pixabayFetchApi.fetchImage();

    createLists(data.hits);

    checkAmountImages(data);

    lightBox();
  } catch (error) {
    console.log(error);
  }
}

function checkAmountImages(params) {
  let amountImage = refs.gallery.children.length;

  if (amountImage >= params.totalHits) {
    window.removeEventListener('scroll', onScroll);
  }
}

function createLists(params) {
  refs.gallery.insertAdjacentHTML('beforeend', createMurkup(params));
}

function lightBox() {
  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
