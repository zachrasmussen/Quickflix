import { dbContext } from "../db/DbContext"
import { groupsService } from "./GroupsService"




class GroupMembersService {
    async becomeMember(newMember) {
        const group = await groupsService.getGroupById(newMember.groupId)
        const groupMember = await dbContext.GroupMembers.create(newMember)
        await groupMember.populate('group')
        await groupMember.populate('profile', 'name picture')
        await group.save()
        return groupMember
    }
}

export const groupMembersService = new GroupMembersService()