import axios from 'axios';

export default class SearchDetail {
  constructor(id) {
    this.id = id;
    this.proxy = 'https://cors-anywhere.herokuapp.com/';
  }

  async getDetail() {
    try {
      const res = await axios(
        `${this.proxy}https://app.ticketmaster.com/discovery/v2/events.json`,
        {
          params: {
            id: this.id,
            apikey: process.env.API_KEY
          }
        }
      );
      this.detail = res.data._embedded.events[0];
    } catch (err) {
      console.error('Soemthing went wrong with the server...');
    }
  }
}
