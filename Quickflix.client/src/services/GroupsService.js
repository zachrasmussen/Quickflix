import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class GroupsService {
    async createGroup(newGroup) {
        const res = await api.post('api/groups', newGroup)
        logger.log('creating group from service', res.data) 
        AppState.groups.push(res.data)
    }   
    
    async getGroupById(id) {
        const res = await api.get('api/groups/'+id)
        logger.log("Getting group by ID", res.data)
        AppState.groups
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