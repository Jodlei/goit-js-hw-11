import axios from 'axios';

const KEY = '30808898-c0dc862c32689843f849354cf';
const BASE_URL = 'https://pixabay.com/api/';

const image_type = 'photo';
const orientation = 'horizontal';
const per_page = 40;
const safesearch = 'true';

export class PixabayFetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  set query(userQuery) {
    this.searchQuery = userQuery;
  }

  get query() {
    return this.searchQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async fetchImage() {
    const URL = `${BASE_URL}?key=${KEY}&page=${this.page}&per_page=${per_page}&q=${this.searchQuery}&image_type =${image_type}&orientation=${orientation}&safesearch=${safesearch}`;

    const resp = await axios.get(URL);

    this.incrementPage();

    return resp.data;
  }
}
