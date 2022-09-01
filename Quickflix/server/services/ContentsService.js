import {dbContext} from "../db/DBContext.js"

class ContentsService {
    async create (newContent){
        const content = await dbContext.Content.create(newContent)
        return content
    }
}

export const  contentService = new ContentsService()