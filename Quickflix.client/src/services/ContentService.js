import { AppState } from "../AppState.js"
import { Content } from "../models/Content.js"
import { logger } from "../utils/Logger.js"
import { api, ottApi } from "./AxiosService.js"



class ContentService {
        async getContent(page = 1) {
                logger.log(page)
                const res = await ottApi.get('advancedsearch', {
                        params: {
                                page: page,
                                start_year: 2010,
                                end_year: 2022,
                                min_imdb: 6,
                                max_imdb: 9.9,
                                language: 'english',
                                sort: 'latest,highestrated',
                                genre: 'action'
                        }
                })
                logger.log('Getting movies', res.data)
                AppState.page = res.data.page

                AppState.contents = res.data.results.map(c => new Content(c)).filter(c => c.imageurl)
        }

        async getContentByGroupId(groupId) {
                const res = await api.get(`api/groups/${groupId}/content`)
                logger.log('Getting content by groupID', res.data)
                AppState.groupContents = res.data
        }

        async createContent(content) {
                const res = await api.post('api/content', content)
                AppState.myContent = res.data
                console.log('Created Content', res.data)
        }

        async updateGenreFilter(genre) {
                AppState.filters.genre.push(genre)
                console.log('filtered genres in the service', AppState.filters.genre)
        }

        async updateTypeFilter(type) {
                AppState.filters.type.push(type)
                console.log('filtered type in the service', AppState.filters.type)
        }

        async runFilter() {
                const res = await ottApi.get('advancedsearch/', {
                        params: {
                                genre: AppState.filters.genre.join(","),
                                type: AppState.filters.type.join(",")
                        }
                })
                // const res = await ottApi.get('advancedsearch/?type=' + AppState.filters.type.join(","))

                AppState.contents = res.data.results.map(c => new Content(c)).filter(c => c.imageurl)
                console.log('filtered results', AppState.contents)
        }




}





export const contentService = new ContentService()