import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const ottApi = Axios.create({
  baseURL: 'https://ott-details.p.rapidapi.com/advancedsearch',
  params: {
    start_year: '1970',
    end_year: '2020',
    min_imdb: '6',
    max_imdb: '10',
    // genre: 'comedy',
    language: 'english',
    type: 'movie',
    sort: 'latest',
    page: '',
  },
  headers: {
    'X-RapidAPI-Key': '6f085c5252msh0103404eeb5c985p1bd3e1jsndb9b1d4a5d8e',
    'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
  }
});
