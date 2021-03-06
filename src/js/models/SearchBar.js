import axios from 'axios';

export default class SearchBar {
  constructor(query, city) {
    this.query = query;
    this.city = city;
    this.proxy = 'https://cors-anywhere.herokuapp.com/';
    this.size = '90';
    this.sort = 'date,asc';
  }

  async getResults() {
    const res = await axios.get(
      `${this.proxy}https://app.ticketmaster.com/discovery/v2/events.json`,
      {
        params: {
          keyword: this.query,
          city: this.city,
          apikey: process.env.API_KEY,
          size: this.size,
          sort: this.sort
        }
      }
    );
    // console.log(res);
    if (res.data._embedded) {
      this.results = res.data._embedded;
    }
  }
}
