import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class GroupsService {
    async createGroup(newGroup) {
        const res = await api.post('api/groups', newGroup)
        logger.log('creating group from service', res.data)
        AppState.groups.push(res.data)
    }
    // TODO leaving here for the night, error in the console says "Cannot read properties of undefined (reading 'picture')"
    async getGroupMembersByGroupId(groupId) {
        const res = await api.get(`api/groups/${groupId}/groupMembers`)
        logger.log('getting group members in the service', res.data)
        AppState.activeGroupMembers = res.data
    }

    async getGroupById(id) {
        const res = await api.get('api/groups/' + id)
        logger.log("Getting group by ID", res.data)
        AppState.activeGroup = res.data
    }

    async createGroupMember(newMember) {
        const res = await api.post(`api/groupMembers`, newMember)
        logger.log('creating new member from the service', res.data)
        AppState.activeGroupMembers.push(res.data)
    }
}


export const groupsService = new GroupsService()

// constructor() {
//     super('api/groups')
//     this.router
//       .get('/:id', this.getGroupById)
//       .use(Auth0Provider.getAuthorizedUserInfo)
//       .get('/:groupId/content', this.getContentByGroupId)
//       .post('', this.create)
//       .delete('/:id', this.deleteGroup)
//       .put('/:id', this.editGroup)
//       .get('/:groupId/groupMembers', this.getGroupMembersByGroupId)