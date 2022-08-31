import {dbContext} from "../db/DBContext.js"

class ContentsService {
    async getByContentByAccountId(id) {
        const content = await dbContext.Content.findById(id)//Do we want to populate creator name and picture?
        return content
    }
    async create (newContent){
        const content = await dbContext.Content.create(newContent)
        return content  
    }
}

export const  contentService = new ContentsService()