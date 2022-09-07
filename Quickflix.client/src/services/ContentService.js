import { AppState } from "../AppState.js"
import { Content } from "../models/Content.js"
import { logger } from "../utils/Logger.js"
import { api, ottApi } from "./AxiosService.js"


class ContentService {
        async getContent() {
                const res = await ottApi.get('')
                logger.log('Getting movies', res.data)
                AppState.contents = res.data.results.map(c => new Content(c))
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

        async updateLangaugeFilter(language) {
                AppState.filters.language.push(language)
                console.log('filtered language in the service', AppState.filters.language)
        }

        async runFilter() {
                const res = await ottApi.get('/?genre=' + AppState.filters.genre.join(",") && '/?langauge=' + AppState.filters.language.join(","))
                AppState.contents = res.data.results
        }




}





export const contentService = new ContentService()