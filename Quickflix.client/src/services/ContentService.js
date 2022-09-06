import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api, ottApi } from "./AxiosService.js"


class ContentService {
        async getContent() {
                const res = await ottApi.get('')
                logger.log('Getting movies', res.data)
                AppState.contents = res.data.results
        }


async createContent(myContent){
        const res = await api.post('api/content', myContent)
        console.log('Created Content', res.data)
        AppState.myContent.push(res.data.body)
        console.log("this my movie list", res.data)
}




}





export const contentService = new ContentService()