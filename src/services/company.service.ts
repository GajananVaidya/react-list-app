const api_url = 'https://jsonplaceholder.typicode.com/';

class CompanyDataService {
  getAll() {
    return fetch(api_url + 'users');
  }
}

export default new CompanyDataService();