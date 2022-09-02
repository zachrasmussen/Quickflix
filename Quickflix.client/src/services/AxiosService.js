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
    end_year: '2022',
    min_imdb: '6',
    max_imdb: '7.8',
    genre: '',
    language: 'english',
    type: 'movie',
    sort: 'latest',
    page: '1',
  },
  headers: {
    'X-RapidAPI-Key': 'bb14e12d6amsh33c5c7e9516a75cp110337jsnc21a8b9a2e2c',
    'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
  }
});

// export const ottApi = Axios.create({
//   baseURL: 'https://ott-details.p.rapidapi.com/getnew',
//   params: { region: 'US', page: '1' },
//   headers: {
//     'X-RapidAPI-Key': '8d7fde662cmshba23e9a52112375p19756ajsndc69e7d28c62',
//     'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
//   }
// });