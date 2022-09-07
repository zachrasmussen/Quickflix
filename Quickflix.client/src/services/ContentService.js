import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api, ottApi } from "./AxiosService.js"


class ContentService {
        async getContent() {
                const res = await ottApi.get('')
                logger.log('Getting movies', res.data)
                AppState.contents = res.data.results
        }

        async getContentByGroupId(groupId) {
                const res = await api.get(`api/groups/${groupId}/content`)
                logger.log('Getting content by groupID', res.data)
                AppState.groupContents = res.data
        }


        async createContent(myContent){
                AppState.myContent = AppState.contents
                const res = await api.post('api/content', myContent)
                console.log('Created Content', res.data)
                // AppState.myContent = res.send([body])
                // console.log("this my movie list", res.data)
        }

        async updateGenreFilter(genre) {
                AppState.filters.genre.push(genre)
                console.log('filtered genres in the service', AppState.filters.genre)
                
        }

        async runFilter(){
             const res = await ottApi.get('/?genre=' + AppState.filters.genre.join(","))
             AppState.contents = res.data.results
        }
      



}





export const contentService = new ContentService()