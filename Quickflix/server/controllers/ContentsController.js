import { Auth0Provider } from "@bcwdev/auth0provider";
import { contentService } from "../services/ContentsService";
import BaseController from "../utils/BaseController";

export class ContentsController extends BaseController {
    constructor() {
        super('api/content')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .get('/:id', this.getContentByAccountId)
    }
    
    async create (req, res, next) {
      try {
        req.body.accountId = req.userInfo.id 
        let newContent=  await contentService.create(req.body)//body on request coming into server
        return res.send(newContent)
      } catch (error) {
        next(error)
      }
    }
    async getContentByAccountId(req, res, next) {
      try {
        const content = await contentService.getByContentByAccountId(req.params.id)
        return res.send(content)
      } catch (error) {
        next(error)
        
      }
    }
}