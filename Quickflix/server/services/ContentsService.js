import {dbContext} from "../db/DBContext.js"
import {logger} from "../utils/Logger.js"
import {Forbidden} from "../utils/Errors.js"

class ContentsService {
    async getContentByCreatorId(id) {
        const res = await dbContext.Content.findById(id).populate('creator', 'name picture')//Do we want to populate creator name and picture?
        return res
    }
    async create (newContent){
        const content = await dbContext.Content.create(newContent)
        return content  
    }
    async archive(contentId, UserId) {       //TODO Hard delete
      }
      
    
}

export const  contentService = new ContentsService()