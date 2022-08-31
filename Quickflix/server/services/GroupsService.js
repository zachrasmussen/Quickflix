import { dbContext } from "../db/DbContext"


class GroupsService {

async create(body){
  const group = await dbContext.Groups.create(body)
  // @ts-ignore
  await group.populate('creator', 'name picture')
  return group
}

}

export const groupsService = new GroupsService()