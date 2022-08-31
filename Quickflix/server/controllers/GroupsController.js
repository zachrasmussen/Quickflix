import { Auth0Provider } from "@bcwdev/auth0provider";
import { groupsService } from "../services/GroupsService";
import BaseController from "../utils/BaseController";



export class GroupsController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('/:id', this.getGroupById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.deleteGroup)
  }
  async deleteGroup(req, res, next) {
    try {
      const group = await groupsService.deleteGroup(req.params.id, req.userInfo.id)
      return res.send(group)
    } catch (error) {
      next(error)
    }
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
      req.body.creatorId = req.userInfo.id
      const group = await groupsService.create(req.body)
      return res.send(group)
    } catch (error) {
      next(error)
    }
  }


}


