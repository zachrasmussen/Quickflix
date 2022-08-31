import BaseController from "../utils/BaseController";

export class ContentsController extends BaseController {
    constructor() {
        super('api/content')
        this.router
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