import { AppState } from "../AppState.js"
import { Content } from "../models/Content.js"
import { logger } from "../utils/Logger.js"
import { api, ottApi } from "./AxiosService.js"


class ContentService {
        async getContent(page = 1) {
                logger.log(page)
                const res = await ottApi.get('', {
                        params:{
                                page: page
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

        async updateProviderFilter(provider) {
                AppState.filters.provider.push(provider)
                console.log('filtered provider in the service', AppState.filters.provider)
        }

        async runFilter() {
                const res = await ottApi.get('/?genre=' + AppState.filters.genre.join(","))
                // const res = await ottApi.get('/?getPlatforms' + AppState.filters.provider.join(","))
                AppState.contents = res.data.results.map(c => new Content(c))
        }




}





export const contentService = new ContentService()