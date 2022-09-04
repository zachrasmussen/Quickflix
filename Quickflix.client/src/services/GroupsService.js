import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class GroupsService {
    async createGroup(newGroup) {
        const res = await api.post('api/groups', newGroup)
        logger.log('creating group from service', res.data) 
    }
}

export const groupsService = new GroupsService()