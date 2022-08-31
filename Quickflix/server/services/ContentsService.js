import {dbContext} from "../db/DBContext.js"

class ContentsService {
    async create (newContent){
        const content = await dbContext.Content.create(newContent)
    
    }
}

export const  contentService = new ContentsService()