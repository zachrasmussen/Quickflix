import { dbContext } from "../db/DbContext"


class GroupsService {

async create(newGroup){
  const group = await dbContext.Groups.create(newGroup)
  await group.populate('creator', 'name picture')
  return group
}

}

export const groupsService = new GroupsService()