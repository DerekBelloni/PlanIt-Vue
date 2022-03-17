import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
    async getTasks(projectId) {
        const res = await api.get('api/projects/', projectId, '/tasks')
        logger.log('tasks for project', res.data)
        AppState.tasks = res.data
    }

}






export const tasksService = new TasksService()