import { groupsService } from "../services/GroupsService";
import BaseController from "../utils/BaseController";



export class GroupsController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .post('', this.create)
      .get('/:id', this.getGroupById)
  }
  async getGroupById(req, res, next) {
    try {
      const group = await groupsService.getGroupById(req.params.id)
      return res.send(group)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const group = await groupsService.create(req.body)
      return res.send(group)
    } catch (error) {
      next(error)
    }
  }


}


