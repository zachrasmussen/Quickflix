import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { request } from "express"
import { dbContext } from "../db/DbContext"


class GroupsService {

  async create(newGroup) {
    const group = await dbContext.Groups.create(newGroup)
    await group.populate('creator', 'name picture')
    return group
  }

  async getGroupById(id) {
    const group = await dbContext.Groups.findById(id).populate('creator', 'name picture')
    if (!group) {
      throw new BadRequest('no group by that id')
    }
    return group
  }


}

export const groupsService = new GroupsService()