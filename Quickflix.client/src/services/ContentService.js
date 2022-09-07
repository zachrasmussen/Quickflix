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


        async createContent(content) {

                const res = await api.post('api/content', content)
                AppState.myContent = res.data
                console.log('Created Content', res.data)

        }




}





export const contentService = new ContentService()