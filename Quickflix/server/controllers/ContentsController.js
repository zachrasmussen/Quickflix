import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class ContentsController extends BaseController {
    constructor() {
        super('api/content')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
    }

async create (req, res, next) {
    try {
        req.body.accountId = req.userInfo.id 
      return res.send()
    } catch (error) {
      next(error)
    }
}
}